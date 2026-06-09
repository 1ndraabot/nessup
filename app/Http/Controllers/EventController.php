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
            ->search($request->search)
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
        
        // dd($events);

        return Inertia::render('Dashboard', [
            'events' => $events,
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }

    public function allEvents()
    {
        $events = Event::latest()->get()->map(function ($event) {

            $status = 'aktif';

            if ($event->close_event < now()) {
                $status = 'selesai';
            }

            return [
                'id' => $event->id,
                'name' => $event->name,
                'organizer' => $event->organization_maker,
                'category' => ucfirst($event->kategori),
                'format' => ucfirst($event->tipe),

                // sementara karena belum ada relasi participants
                'participant_count' => 0,

                'event_date' => $event->open_event,
                'status' => $status,
            ];
        });

        return Inertia::render(
            'admin/AllEvent',
            [
                'events' => $events
            ]
        );
    }

    public function destroy(Event $event)
    {
        if ($event->banner) {
            \Storage::disk('public')->delete($event->banner);
        }

        $event->delete();

        return back()->with(
            'success',
            'Event berhasil dihapus'
        );
    }
}
