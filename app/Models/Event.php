<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use App\Models\TicketEvent;

class Event extends Model
{
    protected $fillable = [
        'name',
        'description',
        'kategori',
        'organization_maker',
        'tipe',
        'open_event',
        'close_event',
        'organizer_id',
    ];

    public function organizer(): BelongsTo
    {
        return $this->belongsTo(
            User::class,
            'organizer_id'
        );
    }

    public function scopeSearch($query, ?string $search){
        if(!$search){
            return $query;
        }

        return $query->where('name', 'like', "%{$search}%");
    }

    public function ticket()
    {
        return $this->hasOne(TicketEvent::class, 'event_id');
    }
}
