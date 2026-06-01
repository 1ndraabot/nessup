<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function index(): Response
    {
        $events = Event::with('organizer')
        ->latest()
        ->get()
        ->map(function ($event){
            return [
                'id' => $event->id,
                'name' => $event->name,
                'description' => $event->description,
                'open_event' => $event->open_event,
                'close_event' => $event->close_event,
                'organizer' => [
                    'id' => $event->organizer?->id,
                    'name' => $event->organizer?->name,
                    'email' => $event->organizer?->email,
                ],

                'created_at' => $event->created_at,

            ];
        });

        return Inertia::render(
            'event/Index',
            [
                'events'=>$events
            ]
        );
    }
}
