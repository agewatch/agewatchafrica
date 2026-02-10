<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Trip extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'destination_city',
        'destination_country',
        'start_date',
        'end_date',
        'price',
        'capacity',
        'status',
        'description',
        'image_url',
        'itinerary',
        'accessibility_rating',
        'health_safety_notes',
        'senior_discount_percent',
        'included_items',
        'excluded_items',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'price' => 'decimal:2',
        'itinerary' => 'array',
        'included_items' => 'array',
        'excluded_items' => 'array',
        'senior_discount_percent' => 'decimal:2',
        'accessibility_rating' => 'integer',
        'capacity' => 'integer',
    ];

    public function media()
    {
        return $this->hasMany(TripMedia::class)->orderBy('sort_order')->orderBy('id');
    }
}
