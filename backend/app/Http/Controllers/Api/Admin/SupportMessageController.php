<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\SupportMessage;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SupportMessageController extends Controller
{
    public function index(Request $request)
    {
        $query = SupportMessage::with('user')
            ->orderBy('created_at', 'desc');

        $search = trim((string) $request->query('q', ''));
        if ($search !== '') {
            $query->where(function ($builder) use ($search) {
                $builder->where('subject', 'like', "%{$search}%")
                    ->orWhere('message', 'like', "%{$search}%")
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
            $query->paginate($this->perPage($request, 20))
        );
    }

    public function update(Request $request, SupportMessage $supportMessage)
    {
        $data = $request->validate([
            'status' => ['required', Rule::in(['open', 'closed'])],
            'admin_reply' => ['nullable', 'string'],
        ]);

        $supportMessage->status = $data['status'];
        $supportMessage->admin_reply = $data['admin_reply'] ?? null;
        $supportMessage->replied_at = $data['admin_reply'] ? now() : null;
        $supportMessage->save();

        return response()->json($supportMessage->load('user'));
    }

    private function perPage(Request $request, int $default): int
    {
        $value = (int) $request->query('per_page', $default);
        $value = $value > 0 ? $value : $default;

        return min($value, 100);
    }
}
