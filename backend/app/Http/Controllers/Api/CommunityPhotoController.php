<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CommunityPhoto;
use App\Models\User;
use App\Notifications\AdminActionNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;

class CommunityPhotoController extends Controller
{
    public function publicIndex()
    {
        return response()->json(
            CommunityPhoto::where('status', 'approved')
                ->orderBy('created_at', 'desc')
                ->paginate(24)
        );
    }

    public function index(Request $request)
    {
        return response()->json(
            CommunityPhoto::where('user_id', $request->user()->id)
                ->orderBy('created_at', 'desc')
                ->paginate(12)
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'image_url' => ['required_without:image', 'nullable', 'url', 'max:500'],
            'image' => ['required_without:image_url', 'nullable', 'image', 'max:5120'],
            'title' => ['nullable', 'string', 'max:120'],
            'caption' => ['nullable', 'string', 'max:1000'],
        ]);

        $imageUrl = $data['image_url'] ?? null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('community-photos', 'public');
            $imageUrl = Storage::disk('public')->url($path);
        }

        $photo = CommunityPhoto::create([
            'user_id' => $request->user()->id,
            'image_url' => $imageUrl,
            'title' => $data['title'] ?? null,
            'caption' => $data['caption'] ?? null,
            'status' => 'pending',
        ]);

        $admins = User::where('role', 'admin')->get();
        if ($admins->isNotEmpty()) {
            Notification::send($admins, new AdminActionNotification(
                'New community photo submitted',
                'A user uploaded a new community photo that requires review.',
                [
                    'photo_id' => $photo->id,
                    'user_id' => $photo->user_id,
                    'image_url' => $photo->image_url,
                ]
            ));
        }

        return response()->json($photo, 201);
    }
}
