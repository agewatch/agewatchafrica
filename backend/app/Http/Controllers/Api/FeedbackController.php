<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use App\Models\User;
use App\Notifications\AdminActionNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class FeedbackController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(
            Feedback::where('user_id', $request->user()->id)
                ->orderBy('created_at', 'desc')
                ->paginate(10)
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'category' => ['required', 'string', 'max:50'],
            'message' => ['required', 'string'],
        ]);

        $feedback = Feedback::create([
            'user_id' => $request->user()->id,
            'rating' => $data['rating'],
            'category' => $data['category'],
            'message' => $data['message'],
            'status' => 'new',
        ]);

        $admins = User::where('role', 'admin')->get();
        if ($admins->isNotEmpty()) {
            Notification::send($admins, new AdminActionNotification(
                'New feedback submitted',
                "{$data['category']} · Rating {$data['rating']}/5",
                [
                    'feedback_id' => $feedback->id,
                    'user_id' => $feedback->user_id,
                    'status' => $feedback->status,
                ]
            ));
        }

        return response()->json($feedback, 201);
    }
}
