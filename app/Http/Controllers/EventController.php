<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $events = Event::with('ticket')
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })
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
                ];
            })
            ->withQueryString();

        return Inertia::render('Dashboard', [
            'events' => $events,
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }
}
