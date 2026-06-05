<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminDashboardController;
use Inertia\Inertia;

Route::inertia('/', 'Welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'Dashboard')->name('dashboard');
});

// Login/Register User
Route::get('/register', function () {
    return Inertia::render('auth/Register');
})->name('register');
Route::post('/register', [AuthController::class, 'register']);

// Login/Register Admin
Route::get('/admin/register', [AdminAuthController::class, 'showRegister']);
Route::post('/admin/register', [AdminAuthController::class, 'register']);
Route::get('/admin/login', [AdminAuthController::class, 'showLogin']);
Route::post('/admin/login', [AdminAuthController::class, 'login']);
Route::post('/admin/logout', [AdminAuthController::class, 'logout']);


// Dashboard Admin
Route::get(
    '/admin/dashboard',
    [AdminDashboardController::class, 'index']
)->middleware('auth:admin');
Route::patch(
    '/admin/event-submission/{id}/approve', 
    [AdminDashboardController::class, 'approve']
);
Route::patch(
    '/admin/event-submission/{id}/decline', 
    [AdminDashboardController::class, 'decline']
);


// Event
Route::get('/event', [EventController::class, 'index']
)->name('event.index');



require __DIR__.'/settings.php';
