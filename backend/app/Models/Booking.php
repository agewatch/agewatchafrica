<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'trip_id',
        'user_id',
        'status',
        'payment_status',
        'payment_method',
        'base_price',
        'discount_percent',
        'discount_amount',
        'total_amount',
        'amount_paid',
        'currency',
        'notes',
        'booked_at',
        'payment_provider',
        'payment_reference',
        'paid_at',
    ];

    protected $casts = [
        'amount_paid' => 'decimal:2',
        'base_price' => 'decimal:2',
        'discount_percent' => 'decimal:2',
        'discount_amount' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'booked_at' => 'datetime',
        'paid_at' => 'datetime',
    ];

    public function trip()
    {
        return $this->belongsTo(Trip::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
