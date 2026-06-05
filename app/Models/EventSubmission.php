<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventSubmission extends Model
{
    protected $fillable = [
        'name',
        'description',
        'open_event',
        'close_event',
        'price_ticket',
        'status',
    ];
}
