<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Trip;
use Illuminate\Http\Request;

class TripController extends Controller
{
    public function publicIndex(Request $request)
    {
        $query = Trip::with('media')
            ->where('status', 'published');

        $scope = (string) $request->query('scope', 'upcoming');
        if ($scope === 'upcoming') {
            $query->whereDate('start_date', '>=', now()->toDateString())
                ->orderBy('start_date', 'asc');
        } elseif ($scope === 'latest') {
            $query->orderBy('created_at', 'desc');
        } else {
            $query->orderBy('start_date', 'asc');
        }

        $limit = (int) $request->query('limit', 3);
        $limit = $limit > 0 ? min($limit, 12) : 3;

        return response()->json([
            'data' => $query->take($limit)->get(),
        ]);
    }

    public function index(Request $request)
    {
        $query = Trip::with('media')
            ->where('status', 'published')
            ->orderBy('start_date', 'asc');

        $search = trim((string) $request->query('q', ''));
        if ($search !== '') {
            $query->where(function ($builder) use ($search) {
                $builder->where('title', 'like', "%{$search}%")
                    ->orWhere('destination_city', 'like', "%{$search}%")
                    ->orWhere('destination_country', 'like', "%{$search}%");
            });
        }

        return response()->json($query->paginate($this->perPage($request, 12)));
    }

    public function show(Trip $trip)
    {
        if ($trip->status !== 'published') {
            return response()->json(['message' => 'Trip not available.'], 404);
        }

        return response()->json($trip->load('media'));
    }

    private function perPage(Request $request, int $default): int
    {
        $value = (int) $request->query('per_page', $default);
        $value = $value > 0 ? $value : $default;

        return min($value, 100);
    }
}
