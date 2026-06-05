<?php

namespace App\Http\Controllers;

use App\Models\EventSubmission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index(){
        $pendingEvents = EventSubmission::where(
            'status',
            'pending'
        )->latest()->get();

        return inertia::render(
            'admin/DashboardAdmin',
            [
                'pendingEvents' => $pendingEvents,
                'pendingCount' => $pendingEvents->count()
            ]
        );
    }

    public function approve($id){
        EventSubmission::findOrFail($id)
            -> update([
                'status' => 'approve'
            ]);
        
        return back();
    }

    public function decline($id){
        EventSubmission::findOrFail($id)
            -> update([
                'status' => 'decline'
            ]);
        
        return back();
    }


}
