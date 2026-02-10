<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TripMedia extends Model
{
    protected $table = 'trip_media';

    protected $fillable = [
        'trip_id',
        'image_url',
        'is_cover',
        'sort_order',
    ];

    protected $casts = [
        'is_cover' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function trip()
    {
        return $this->belongsTo(Trip::class);
    }
}
