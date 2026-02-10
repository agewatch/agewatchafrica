<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class FeedbackController extends Controller
{
    public function index(Request $request)
    {
        $query = Feedback::with('user')
            ->orderBy('created_at', 'desc');

        $search = trim((string) $request->query('q', ''));
        if ($search !== '') {
            $query->where(function ($builder) use ($search) {
                $builder->where('message', 'like', "%{$search}%")
                    ->orWhere('category', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($userQuery) use ($search) {
                        $userQuery->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    });
            });
        }

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        if ($category = $request->query('category')) {
            $query->where('category', $category);
        }

        return response()->json(
            $query->paginate($this->perPage($request, 20))
        );
    }

    public function update(Request $request, Feedback $feedback)
    {
        $data = $request->validate([
            'status' => ['required', Rule::in(['new', 'reviewed'])],
            'admin_notes' => ['nullable', 'string'],
        ]);

        $feedback->update($data);

        return response()->json($feedback->load('user'));
    }

    private function perPage(Request $request, int $default): int
    {
        $value = (int) $request->query('per_page', $default);
        $value = $value > 0 ? $value : $default;

        return min($value, 100);
    }
}
