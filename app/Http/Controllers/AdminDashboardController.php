<?php

namespace App\Http\Controllers;

use App\Models\EventSubmission;
use App\Models\Event;
use App\Models\User;
use App\Models\TicketEvent;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index(){
        $pendingEvents = EventSubmission::where(
            'status',
            'pending'
        )->latest()->get()->map(function($event){
            return [
                'id' => $event->id,
                'name' => $event->name,
                'description' => $event->description,
                'price_ticket' => $event->price_ticket,
                'status' => $event->status,
                'banner' => $event->banner,

                'open_event' => $event->open_event
                    ? $event->open_event->translatedFormat('d F Y H:i')
                    : null,

                'close_event' => $event->close_event
                    ? $event->close_event->translatedFormat('d F Y H:i')
                    : null,
            ];
        });

        return inertia::render(
            'admin/DashboardAdmin',
            [
                'pendingEvents' => $pendingEvents,
                'pendingCount' => $pendingEvents->count(),
                'activeEventCount' => Event::count(),
                'userCount' => User::count(), 
            ]
        );
    }

    public function approve($id)
    {
        $submission = EventSubmission::findOrFail($id);

        DB::transaction(function () use ($submission) {

            $event = Event::create([
                'name' => $submission->name,
                'description' => $submission->description,
                'kategori' => $submission->kategori,
                'organization_maker' => $submission->organization_maker,
                'tipe' => $submission->tipe,
                'open_event' => $submission->open_event,
                'close_event' => $submission->close_event,

                // sementara
                'organizer_id' => 1,

                'banner' => $submission->banner,
            ]);

            TicketEvent::create([
                'event_id' => $event->id,
                'price' => $submission->price_ticket,
            ]);

            $submission->update([
                'status' => 'approve'
            ]);
        });

        return back();
    }

    public function decline($id){
        EventSubmission::findOrFail($id)
            -> update([
                'status' => 'decline'
            ]);
        
        return back();
    }

    public function moderasi()
    {
        return Inertia::render(
            'admin/ModerasiEvent',
            [
                'events' => EventSubmission::latest()
                    ->get()
                    ->map(function ($e) {

                        $statusMap = [
                            'pending' => 'menunggu',
                            'approve' => 'disetujui',
                            'decline' => 'ditolak',
                        ];

                        return [
                            'id' => $e->id,
                            'name' => $e->name,
                            'organizer_name' => $e->organization_maker,
                            'organizer_university' => '-',
                            'category' => ucfirst($e->kategori),
                            'price' => $e->price_ticket,
                            'format' => ucfirst($e->tipe),
                            'description' => $e->description,
                            'event_date' => $e->open_event,
                            'event_time' => $e->open_event?->format('H:i'),
                            'location' => null,
                            'poster_url' => $e->banner
                                ? asset('storage/' . $e->banner)
                                : null,
                            'status' => $statusMap[$e->status] ?? 'menunggu',
                            'submitted_at' => $e->created_at,
                        ];
                    }),
            ]
        );
    }


}
