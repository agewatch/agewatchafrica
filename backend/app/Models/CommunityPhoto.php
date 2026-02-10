<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CommunityPhoto extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'image_url',
        'caption',
        'status',
        'moderated_by',
        'moderated_at',
        'rejection_reason',
    ];

    protected $casts = [
        'moderated_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function moderator()
    {
        return $this->belongsTo(User::class, 'moderated_by');
    }
}
