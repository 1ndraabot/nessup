<?php

namespace App\Http\Controllers;

use App\Models\EventBookmark;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventBookmarkController extends Controller
{
    public function index(Request $request)
    {
        $bookmarks = EventBookmark::with([
            'event.organizer',
            'event.ticket'
        ])
        ->where('user_id', auth()->id())
        ->latest()
        ->get()
        ->map(function ($bookmark) {

            $event = $bookmark->event;

            return [
                'id' => $bookmark->id,

                'event' => [
                    'id' => $event->id,

                    'title' => $event->name,

                    'organizer' =>
                        $event->organizer?->name
                        ?? $event->organization_maker,

                    'date' =>
                        $event->open_event?->format('Y-m-d'),

                    'time' =>
                        $event->open_event?->format('H:i'),

                    'category' =>
                        ucfirst($event->kategori),

                    'price' =>
                        (int) ($event->ticket?->price ?? 0),

                    'mode' =>
                        ucfirst($event->tipe),

                    'is_past' =>
                        now()->greaterThan($event->close_event),

                    'poster_url' =>
                        $event->banner
                            ? asset('storage/' . $event->banner)
                            : null,
                ],
            ];
        });

        return Inertia::render(
            'BookmarkEvent',
            [
                'bookmarks' => $bookmarks,
            ]
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'event_id' => ['required', 'exists:events,id'],
        ]);

        EventBookmark::firstOrCreate([
            'user_id' => auth()->id(),
            'event_id' => $request->event_id,
        ]);

        return back();
    }

    public function destroy(EventBookmark $bookmark)
    {
        // Pastikan hanya pemilik bookmark yang bisa menghapus
        if ($bookmark->user_id !== auth()->id()) {
            abort(403);
        }

        $bookmark->delete();

        return back()->with(
            'success',
            'Bookmark berhasil dihapus.'
        );
    }
}