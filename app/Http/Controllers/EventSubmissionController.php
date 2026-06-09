<?php

namespace App\Http\Controllers;

use App\Models\EventSubmission;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EventSubmissionController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('PostEvent');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'namaEvent' => [
                'required',
                'string',
                'max:255'
            ],

            'deskripsi' => [
                'required',
                'string'
            ],

            'kategori' => [
                'required',
                'in:seminar,workshop,kompetisi,webinar'
            ],

            'organizer' => [
                'required',
                'string',
                'max:255'
            ],

            'tipeEvent' => [
                'required',
                'in:online,offline'
            ],

            'price' => [
                'required',
                'numeric',
                'min:0'
            ],

            'open_event' => [
                'required',
                'date'
            ],

            'close_event' => [
                'required',
                'date',
                'after:open_event'
            ],

            'banner' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png',
                'max:2048'
            ],
        ]);

        $bannerPath = null;

        if ($request->hasFile('banner')) {
            $bannerPath = $request
                ->file('banner')
                ->store('event-submissions', 'public');
        }

        EventSubmission::create([
            'name' => $validated['namaEvent'],
            'description' => $validated['deskripsi'],
            'kategori' => $validated['kategori'],
            'organization_maker' => $validated['organizer'],
            'tipe' => $validated['tipeEvent'],
            'open_event' => $validated['open_event'],
            'close_event' => $validated['close_event'],
            'price_ticket' => $validated['price'],
            'banner' => $bannerPath,
            'status' => 'pending',
        ]);

        return redirect()
            ->route('event.create')
            ->with('success', 'Event berhasil dikirim dan menunggu validasi admin.');
    }
}