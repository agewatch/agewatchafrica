<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::orderBy('created_at', 'desc');

        $search = trim((string) $request->query('q', ''));
        if ($search !== '') {
            $query->where(function ($builder) use ($search) {
                $builder->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($role = $request->query('role')) {
            $query->where('role', $role);
        }

        if ($request->has('verified')) {
            $verified = filter_var(
                $request->query('verified'),
                FILTER_VALIDATE_BOOLEAN,
                FILTER_NULL_ON_FAILURE
            );

            if ($verified !== null) {
                if ($verified) {
                    $query->whereNotNull('email_verified_at');
                } else {
                    $query->whereNull('email_verified_at');
                }
            }
        }

        return response()->json(
            $query->paginate($this->perPage($request, 20))
        );
    }

    public function show(User $user)
    {
        return response()->json($user);
    }

    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'role' => ['required', Rule::in(['user', 'admin'])],
            'verified' => ['required', 'boolean'],
        ]);

        $user->role = $data['role'];
        $user->email_verified_at = $data['verified'] ? now() : null;
        $user->save();

        return response()->json($user);
    }

    private function perPage(Request $request, int $default): int
    {
        $value = (int) $request->query('per_page', $default);
        $value = $value > 0 ? $value : $default;

        return min($value, 100);
    }
}
