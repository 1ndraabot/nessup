<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventSubmission;
use App\Models\TicketEvent;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ModerasiEventController extends Controller
{
    public function index()
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

                            // sementara karena belum ada kolom universitas
                            'organizer_university' => '-',

                            'category' => ucfirst($e->kategori),

                            'price' => $e->price_ticket,

                            'format' => ucfirst($e->tipe),

                            'description' => $e->description,

                            'event_date' => $e->open_event,

                            'event_time' =>
                                $e->open_event
                                    ? $e->open_event->format('H:i')
                                    : '',

                            // sementara karena belum ada kolom lokasi
                            'location' =>
                                $e->tipe === 'offline'
                                    ? 'Offline Event'
                                    : null,

                            'poster_url' => $e->banner
                                ? asset('storage/' . $e->banner)
                                : null,

                            'status' =>
                                $statusMap[$e->status] ?? 'menunggu',

                            'submitted_at' => $e->created_at,
                        ];
                    }),
            ]
        );
    }

    public function show($id)
    {
        $event = EventSubmission::findOrFail($id);

        return response()->json($event);
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
                'organizer_id' => 1,
                'banner' => $submission->banner,
            ]);

            TicketEvent::create([
                'event_id' => $event->id,
                'price' => $submission->price_ticket,
            ]);

            $submission->update([
                'status' => 'approve',
            ]);
        });

        return back();
    }

    public function decline($id)
    {
        EventSubmission::findOrFail($id)
            ->update([
                'status' => 'decline',
            ]);

        return back();
    }
}