<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\EventSubmissionController;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\ExploreController;
use App\Http\Controllers\ModerasiEventController;
use App\Http\Controllers\EventRegistrationController;
use App\Http\Controllers\EventBookmarkController;
use Inertia\Inertia;

Route::inertia('/', 'Welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get(
        '/dashboard',
        [EventController::class, 'index']
    )->name('dashboard');
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


Route::middleware('auth:admin')->group(function () {

    // Dashboard Admin
    Route::get(
        '/admin/dashboard',
        [AdminDashboardController::class, 'index']
    );

    // Moderasi Event
    Route::get(
        '/admin/moderasi-event',
        [AdminDashboardController::class, 'moderasi']
    );

    Route::get(
        '/admin/event-submission/{id}',
        [ModerasiEventController::class, 'show']
    );

    Route::patch(
        '/admin/event-submission/{id}/approve',
        [ModerasiEventController::class, 'approve']
    );

    Route::patch(
        '/admin/event-submission/{id}/decline',
        [ModerasiEventController::class, 'decline']
    );

    // Semua Event
    Route::get(
        '/admin/events',
        [EventController::class, 'allEvents']
    )->name('admin.events');

    Route::delete(
        '/admin/events/{event}',
        [EventController::class, 'destroy']
    )->name('admin.events.destroy');
});

// Dashboard User   
Route::get('/events', [EventController::class, 'index'])
    ->name('events.index');
    
// Explore Page
Route::get('/explore', [ExploreController::class, 'index'])
    ->name('explore.index');

Route::get('/explore/{event}', [ExploreController::class, 'show'])
    ->name('explore.show');

// Post Event
Route::middleware(['auth', 'verified'])->group(function () {

    Route::get(
        '/post-event',
        [EventSubmissionController::class, 'create']
    )->name('event.create');

    Route::post(
        '/post-event',
        [EventSubmissionController::class, 'store']
    )->name('event.store');

});

// Form Pendaftaran User
Route::get(
    '/event/{event}/daftar',
    [EventRegistrationController::class, 'create']
)->name('event.register');
Route::post(
    '/event/{event}/daftar',
    [EventRegistrationController::class, 'store']
)->name('event.daftar');

// Event Bookmark
Route::middleware('auth')->group(function () {

    Route::get(
        '/event-saya',
        [EventBookmarkController::class, 'index']
    )->name('bookmarks.index');

    Route::post(
        '/bookmarks',
        [EventBookmarkController::class, 'store']
    )->name('bookmarks.store');

    Route::delete(
        '/bookmarks/{bookmark}',
        [EventBookmarkController::class, 'destroy']
    )->name('bookmarks.destroy');
});

//test
Route::get('/debug-app', function () {
    return [
        'app_key' => !empty(config('app.key')),
        'session_driver' => config('session.driver'),
    ];
});

Route::get('/debug-user', function () {

    try {

        $pdo = DB::connection()->getPdo();

        return [
            'connected' => true,
            'database' => DB::connection()->getDatabaseName(),
        ];

    } catch (\Throwable $e) {

        return response()->json([
            'connected' => false,
            'error' => $e->getMessage(),
            'class' => get_class($e),
        ]);
    }
});

Route::get('/db-config', function () {
    return [
        'host' => env('DB_HOST'),
        'port' => env('DB_PORT'),
        'database' => env('DB_DATABASE'),
        'username' => env('DB_USERNAME'),
    ];
});

Route::get('/health', function () {
    return response()->json([
        'ok' => true
    ]);
});


require __DIR__.'/settings.php';
