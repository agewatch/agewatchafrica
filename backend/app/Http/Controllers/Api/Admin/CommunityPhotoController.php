<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\CommunityPhoto;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CommunityPhotoController extends Controller
{
    public function index(Request $request)
    {
        $query = CommunityPhoto::with(['user', 'moderator'])
            ->orderBy('created_at', 'desc');

        $search = trim((string) $request->query('q', ''));
        if ($search !== '') {
            $query->where(function ($builder) use ($search) {
                $builder->where('title', 'like', "%{$search}%")
                    ->orWhere('caption', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($userQuery) use ($search) {
                        $userQuery->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    });
            });
        }

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        return response()->json(
            $query->paginate($this->perPage($request, 24))
        );
    }

    public function update(Request $request, CommunityPhoto $communityPhoto)
    {
        $data = $request->validate([
            'status' => ['required', Rule::in(['pending', 'approved', 'rejected'])],
            'rejection_reason' => ['nullable', 'string', 'max:500'],
        ]);

        $communityPhoto->status = $data['status'];
        $communityPhoto->rejection_reason = $data['status'] === 'rejected'
            ? ($data['rejection_reason'] ?? 'Not specified')
            : null;
        $communityPhoto->moderated_by = $request->user()->id;
        $communityPhoto->moderated_at = now();
        $communityPhoto->save();

        return response()->json($communityPhoto->load(['user', 'moderator']));
    }

    private function perPage(Request $request, int $default): int
    {
        $value = (int) $request->query('per_page', $default);
        $value = $value > 0 ? $value : $default;

        return min($value, 100);
    }
}
