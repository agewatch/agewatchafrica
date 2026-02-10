<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Trip;
use App\Models\User;
use App\Notifications\BookingCreated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(
            Booking::with(['trip'])
                ->where('user_id', $request->user()->id)
                ->orderBy('created_at', 'desc')
                ->paginate(10)
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'trip_id' => ['required', 'exists:trips,id'],
            'apply_senior_discount' => ['sometimes', 'boolean'],
            'notes' => ['nullable', 'string'],
            'payment_method' => ['nullable', 'string', 'max:50'],
            'currency' => ['nullable', 'string', 'size:3'],
        ]);

        $trip = Trip::findOrFail($data['trip_id']);

        if ($trip->status !== 'published') {
            return response()->json([
                'message' => 'Trip is not available for booking.',
            ], 422);
        }

        $basePrice = (float) $trip->price;
        $applyDiscount = (bool) ($data['apply_senior_discount'] ?? false);
        $discountPercent = $applyDiscount ? (float) $trip->senior_discount_percent : 0.0;
        $discountAmount = round($basePrice * ($discountPercent / 100), 2);
        $totalAmount = max($basePrice - $discountAmount, 0);

        $booking = Booking::create([
            'trip_id' => $trip->id,
            'user_id' => $request->user()->id,
            'status' => 'pending',
            'payment_status' => 'unpaid',
            'payment_method' => $data['payment_method'] ?? null,
            'base_price' => $basePrice,
            'discount_percent' => $discountPercent,
            'discount_amount' => $discountAmount,
            'total_amount' => $totalAmount,
            'amount_paid' => 0,
            'currency' => $data['currency'] ?? 'USD',
            'notes' => $data['notes'] ?? null,
            'booked_at' => now(),
        ]);

        $admins = User::where('role', 'admin')->get();
        if ($admins->isNotEmpty()) {
            Notification::send($admins, new BookingCreated($booking));
        }

        return response()->json($booking->load(['trip']), 201);
    }
}
