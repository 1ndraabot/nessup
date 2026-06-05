<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TicketEvent extends Model
{
    protected $table = 'ticket_events';

    protected $fillable = [
        'price',
        'event_id',
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }
}