<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EventSubmission extends Model
{
    protected $fillable = [
        'name',
        'description',
        'kategori',
        'organization_maker',
        'tipe',
        'open_event',
        'close_event',
        'price_ticket',
        'banner',
        'status',
        'user_id',
    ];

    protected $casts = [
        'open_event' => 'datetime',
        'close_event' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}