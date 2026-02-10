<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $query = Booking::with(['trip', 'user'])
            ->orderBy('created_at', 'desc');

        $search = trim((string) $request->query('q', ''));
        if ($search !== '') {
            $query->where(function ($builder) use ($search) {
                $builder->whereHas('user', function ($userQuery) use ($search) {
                    $userQuery->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                })->orWhereHas('trip', function ($tripQuery) use ($search) {
                    $tripQuery->where('title', 'like', "%{$search}%")
                        ->orWhere('destination_city', 'like', "%{$search}%")
                        ->orWhere('destination_country', 'like', "%{$search}%");
                });
            });
        }

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        if ($paymentStatus = $request->query('payment_status')) {
            $query->where('payment_status', $paymentStatus);
        }

        if ($request->has('discounted')) {
            $discounted = filter_var(
                $request->query('discounted'),
                FILTER_VALIDATE_BOOLEAN,
                FILTER_NULL_ON_FAILURE
            );

            if ($discounted === true) {
                $query->where('discount_amount', '>', 0);
            } elseif ($discounted === false) {
                $query->where('discount_amount', '<=', 0);
            }
        }

        return response()->json(
            $query->paginate($this->perPage($request, 20))
        );
    }

    public function show(Booking $booking)
    {
        return response()->json(
            $booking->load(['trip', 'user'])
        );
    }

    public function update(Request $request, Booking $booking)
    {
        $data = $request->validate([
            'status' => ['required', Rule::in(['pending', 'approved', 'cancelled'])],
            'payment_status' => ['required', Rule::in(['unpaid', 'paid', 'refunded'])],
            'payment_method' => ['nullable', 'string', 'max:50'],
            'amount_paid' => ['required', 'numeric', 'min:0'],
            'currency' => ['required', 'string', 'size:3'],
            'notes' => ['nullable', 'string'],
            'booked_at' => ['nullable', 'date'],
            'payment_provider' => ['nullable', 'string', 'max:50'],
            'payment_reference' => ['nullable', 'string', 'max:100'],
            'paid_at' => ['nullable', 'date'],
        ]);

        if ($data['payment_status'] === 'paid' && empty($data['paid_at'])) {
            $data['paid_at'] = now();
        }

        if (in_array($data['payment_status'], ['unpaid', 'refunded'], true)) {
            $data['paid_at'] = null;
        }

        $booking->update($data);

        return response()->json($booking->load(['trip', 'user']));
    }

    private function perPage(Request $request, int $default): int
    {
        $value = (int) $request->query('per_page', $default);
        $value = $value > 0 ? $value : $default;

        return min($value, 100);
    }
}
