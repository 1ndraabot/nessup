<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Event extends Model
{
    protected $fillable = [
        'name',
        'description',
        'open_event',
        'close_event',
        'organizer_id',
        'created_at',
        'updated_at',
    ];

    public function organizer(): BelongsTo
    {
        return $this->belongsTo(
            User::class,
            'organizer_id'
        );
    }
}
