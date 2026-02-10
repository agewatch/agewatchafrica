<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->user()->notifications()->latest();

        if ($request->query('status') === 'unread') {
            $query->whereNull('read_at');
        }

        return response()->json(
            $query->paginate($this->perPage($request, 20))
        );
    }

    public function unreadCount(Request $request)
    {
        $count = $request->user()->unreadNotifications()->count();

        return response()->json(['unread' => $count]);
    }

    public function markRead(Request $request, string $notification)
    {
        $model = $request->user()->notifications()->where('id', $notification)->first();

        if (!$model) {
            return response()->json(['message' => 'Notification not found.'], 404);
        }

        $model->markAsRead();

        return response()->json(['message' => 'Notification marked as read']);
    }

    public function markAllRead(Request $request)
    {
        $request->user()->unreadNotifications()->update(['read_at' => now()]);

        return response()->json(['message' => 'Notifications marked as read']);
    }

    private function perPage(Request $request, int $default): int
    {
        $value = (int) $request->query('per_page', $default);
        $value = $value > 0 ? $value : $default;

        return min($value, 100);
    }
}
