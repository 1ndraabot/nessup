<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Inertia\Inertia;
use Inertia\Response;

class ExploreController extends Controller
{
    public function index(Request $request)
    {
        $events = Event::with('ticket')
            ->filter($request->only([
                'search',
                'category',
                'type',
                'start_date',
                'end_date',
            ]))
            ->latest()
            ->paginate(12)
            ->through(function ($event) {
                return [
                    'id' => $event->id,
                    'name' => $event->name,
                    'kategori' => $event->kategori,
                    'tipe' => $event->tipe,
                    'organization_maker' => $event->organization_maker,
                    'price' => $event->ticket?->price ?? 0,
                    'banner' => $event->banner
                    ? asset('storage/' . $event->banner)
                    : null,
                ];
            })
            ->withQueryString();

        return Inertia::render('Explore', [
            'events' => $events,
            'filters' => [
                'search' => $request->search,
                'category' => $request->category,
                'type' => $request->type,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ],
        ]);
    }

    public function show(Event $event)
    {
        $event->load([
            'organizer',
            'ticket'
        ]);

        $ticket = $event->ticket;

        return Inertia::render('DetailEvent', [
            'event' => [
                'id' => $event->id,

                'title' => $event->name,

                'tags' => [
                    [
                        'label' => ucfirst($event->kategori),
                        'color' => 'default'
                    ],
                    [
                        'label' => $ticket && $ticket->price == 0
                            ? 'Gratis'
                            : 'Berbayar',
                        'color' => 'success'
                    ],
                    [
                        'label' => ucfirst($event->tipe),
                        'color' => 'outline'
                    ]
                ],

                'date' => $event->open_event->translatedFormat('l, d F Y'),

                'time' =>
                    $event->open_event->format('H:i')
                    .' - '.
                    $event->close_event->format('H:i'),

                'platform' =>
                    $event->tipe === 'online'
                        ? 'Online'
                        : 'Offline',

                'organizer' =>
                    $event->organization_maker,

                'quota_remaining' => 0,
                'quota_total' => 0,

                'registration_deadline' =>
                    $event->open_event->subDay()
                        ->translatedFormat('d F Y H:i'),

                'cover_url' =>
                    $event->banner
                        ? asset('storage/'.$event->banner)
                        : null,

                'description' =>
                    $event->description,

                'speakers' => [],

                'location' =>
                    $event->tipe === 'offline'
                        ? 'Lokasi akan diumumkan'
                        : 'Zoom / Google Meet',

                'contact' =>
                    $event->organizer?->email,
            ]
        ]);
    }
}
