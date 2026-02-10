<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SupportMessage;
use App\Models\User;
use App\Notifications\AdminActionNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class SupportMessageController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(
            SupportMessage::where('user_id', $request->user()->id)
                ->orderBy('created_at', 'desc')
                ->paginate(10)
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'subject' => ['required', 'string', 'max:120'],
            'message' => ['required', 'string'],
        ]);

        $message = SupportMessage::create([
            'user_id' => $request->user()->id,
            'subject' => $data['subject'],
            'message' => $data['message'],
            'status' => 'open',
        ]);

        $admins = User::where('role', 'admin')->get();
        if ($admins->isNotEmpty()) {
            Notification::send($admins, new AdminActionNotification(
                'New support message received',
                $data['subject'],
                [
                    'support_message_id' => $message->id,
                    'user_id' => $message->user_id,
                    'status' => $message->status,
                ]
            ));
        }

        return response()->json($message, 201);
    }
}
