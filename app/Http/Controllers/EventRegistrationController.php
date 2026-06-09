<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventRegistration;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventRegistrationController extends Controller
{
    public function create(Event $event)
    {
        return Inertia::render('PendaftaranEventUser', [
            'event' => [
                'id' => $event->id,
                'nama' => $event->name,
                'harga_tiket' => $event->ticket?->price ?? 0,
                'biaya_layanan' => 2000,
            ]
        ]);
    }

    public function store(Request $request, Event $event)
    {
        $validated = $request->validate([
            'nama_lengkap' => ['required', 'string', 'max:255'],
            'no_whatsapp' => ['required', 'string'],
            'email' => ['required', 'email'],
            'jurusan_prodi' => ['required', 'string'],
        ]);

        $registration = EventRegistration::create([
            'event_id' => $event->id,
            'user_id' => auth()->id(),

            'nama_lengkap' => $validated['nama_lengkap'],
            'no_whatsapp' => $validated['no_whatsapp'],
            'email' => $validated['email'],
            'jurusan_prodi' => $validated['jurusan_prodi'],

            'status' => 'pending',
        ]);

        $harga = $event->ticket?->price ?? 0;

        // Nomor admin WA (gunakan format internasional tanpa +)
        $adminWhatsapp = '6281215451864';

        $message =
            "Halo Admin NessUp,%0A%0A" .
            "Saya telah melakukan pendaftaran event.%0A%0A" .
            "📌 Event : {$event->name}%0A" .
            "👤 Nama : {$registration->nama_lengkap}%0A" .
            "📧 Email : {$registration->email}%0A" .
            "📱 WhatsApp : {$registration->no_whatsapp}%0A" .
            "🎓 Prodi : {$registration->jurusan_prodi}%0A" .
            "💰 Harga Tiket : Rp " . number_format($harga, 0, ',', '.') . "%0A%0A" .
            "Mohon informasi pembayaran lebih lanjut. Terima kasih.";

        $waUrl = "https://wa.me/{$adminWhatsapp}?text={$message}";
        return redirect()->back()->with([
            'wa_url' => $waUrl
        ]);
    }
}