<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Trip;
use App\Models\TripMedia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class TripController extends Controller
{
    public function index(Request $request)
    {
        $query = Trip::with('media')->orderBy('start_date', 'desc');

        $search = trim((string) $request->query('q', ''));
        if ($search !== '') {
            $query->where(function ($builder) use ($search) {
                $builder->where('title', 'like', "%{$search}%")
                    ->orWhere('destination_city', 'like', "%{$search}%")
                    ->orWhere('destination_country', 'like', "%{$search}%");
            });
        }

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        return response()->json(
            $query->paginate($this->perPage($request, 20))
        );
    }

    public function store(Request $request)
    {
        $data = $this->validateTrip($request);
        $trip = Trip::create($data);
        $this->syncMedia($trip, $request);

        return response()->json($trip->load('media'), 201);
    }

    public function show(Trip $trip)
    {
        return response()->json($trip->load('media'));
    }

    public function update(Request $request, Trip $trip)
    {
        $data = $this->validateTrip($request, $trip->id);
        $trip->update($data);
        if ($request->has('album_images') || $request->has('image_url')) {
            $this->syncMedia($trip, $request);
        }

        return response()->json($trip->load('media'));
    }

    public function destroy(Trip $trip)
    {
        $trip->delete();

        return response()->json(['message' => 'Trip archived']);
    }

    private function validateTrip(Request $request, ?int $tripId = null): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'destination_city' => ['required', 'string', 'max:255'],
            'destination_country' => ['required', 'string', 'max:255'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'price' => ['required', 'numeric', 'min:0'],
            'capacity' => ['required', 'integer', 'min:1'],
            'status' => ['required', Rule::in(['draft', 'published', 'archived'])],
            'description' => ['required', 'string'],
            'image_url' => ['nullable', 'url'],
            'album_images' => ['nullable', 'array'],
            'album_images.*' => ['nullable', 'url'],
            'itinerary' => ['nullable', 'array'],
            'itinerary.*.day' => ['nullable', 'string', 'max:64'],
            'itinerary.*.title' => ['nullable', 'string', 'max:255'],
            'itinerary.*.details' => ['nullable', 'string'],
            'accessibility_rating' => ['nullable', 'integer', 'min:1', 'max:5'],
            'health_safety_notes' => ['nullable', 'string'],
            'senior_discount_percent' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'included_items' => ['nullable', 'array'],
            'included_items.*' => ['nullable', 'string', 'max:255'],
            'excluded_items' => ['nullable', 'array'],
            'excluded_items.*' => ['nullable', 'string', 'max:255'],
        ]);
    }

    private function perPage(Request $request, int $default): int
    {
        $value = (int) $request->query('per_page', $default);
        $value = $value > 0 ? $value : $default;

        return min($value, 100);
    }

    private function syncMedia(Trip $trip, Request $request): void
    {
        $albumImages = $request->input('album_images', []);
        if (!is_array($albumImages)) {
            $albumImages = [];
        }

        $coverUrl = $request->input('image_url');
        $urls = [];

        if ($coverUrl) {
            $urls[] = $coverUrl;
        }

        foreach ($albumImages as $url) {
            if ($url && !in_array($url, $urls, true)) {
                $urls[] = $url;
            }
        }

        $trip->media()->delete();

        foreach ($urls as $index => $url) {
            $trip->media()->create([
                'image_url' => $url,
                'is_cover' => $coverUrl ? $url === $coverUrl : $index === 0,
                'sort_order' => $index,
            ]);
        }
    }

    public function addMedia(Request $request, Trip $trip)
    {
        $data = $request->validate([
            'image' => ['required', 'file', 'image', 'max:5120'],
            'is_cover' => ['sometimes', 'boolean'],
        ]);

        $path = $request->file('image')->store("trips/{$trip->id}", 'public');
        $url = asset("storage/{$path}");

        $isCover = (bool) ($data['is_cover'] ?? false);

        if ($isCover) {
            $trip->media()->update(['is_cover' => false]);
            $trip->update(['image_url' => $url]);
        } elseif (!$trip->image_url) {
            $trip->update(['image_url' => $url]);
        }

        $media = $trip->media()->create([
            'image_url' => $url,
            'is_cover' => $isCover,
            'sort_order' => (int) ($trip->media()->max('sort_order') ?? 0) + 1,
        ]);

        return response()->json([
            'media' => $media,
            'trip' => $trip->load('media'),
        ], 201);
    }

    public function listMedia(Trip $trip)
    {
        return response()->json($trip->media()->get());
    }

    public function deleteMedia(Trip $trip, TripMedia $media)
    {
        if ($media->trip_id !== $trip->id) {
            return response()->json(['message' => 'Media not found.'], 404);
        }

        $this->deleteMediaFile($media->image_url);
        $wasCover = $media->is_cover;
        $media->delete();

        if ($wasCover) {
            $nextCover = $trip->media()->first();
            if ($nextCover) {
                $nextCover->update(['is_cover' => true]);
                $trip->update(['image_url' => $nextCover->image_url]);
            } else {
                $trip->update(['image_url' => null]);
            }
        }

        return response()->json(['message' => 'Media deleted']);
    }

    public function reorderMedia(Request $request, Trip $trip)
    {
        $data = $request->validate([
            'media_ids' => ['required', 'array'],
            'media_ids.*' => ['integer'],
        ]);

        $ids = $data['media_ids'];
        $media = $trip->media()->whereIn('id', $ids)->get()->keyBy('id');

        foreach ($ids as $index => $id) {
            if (isset($media[$id])) {
                $media[$id]->update(['sort_order' => $index]);
            }
        }

        return response()->json($trip->load('media'));
    }

    public function setCover(Trip $trip, TripMedia $media)
    {
        if ($media->trip_id !== $trip->id) {
            return response()->json(['message' => 'Media not found.'], 404);
        }

        $trip->media()->update(['is_cover' => false]);
        $media->update(['is_cover' => true]);
        $trip->update(['image_url' => $media->image_url]);

        return response()->json($trip->load('media'));
    }

    private function deleteMediaFile(string $url): void
    {
        $prefix = asset('storage') . '/';
        if (str_starts_with($url, $prefix)) {
            $path = str_replace($prefix, '', $url);
            if ($path !== '') {
                Storage::disk('public')->delete($path);
            }
        }
    }
}
