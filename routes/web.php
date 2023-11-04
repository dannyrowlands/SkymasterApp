<?php

use App\Http\Controllers\InstructorController;
use App\Http\Controllers\JumperController;
use App\Http\Controllers\ManifestController;
use App\Http\Controllers\PilotController;
use App\Http\Controllers\PoolController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UpdateController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DiaryController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Dashboard', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/* Manifest */
Route::get('/manifest/view', [ManifestController::class, 'view'])->middleware(['auth', 'verified'])->name('manifest.view');
Route::get('/manifest/jumpers', [ManifestController::class, 'getJumperList'])->middleware(['auth', 'verified'])->name('manifest.jumperlist');
Route::get('/manifest/pool', [ManifestController::class, 'getPoolList'])->middleware(['auth', 'verified'])->name('manifest.poollist');
Route::post('/manifest/set_details', [ManifestController::class, 'setManifestDetails'])->middleware(['auth', 'verified'])->name('manifest.jumperlist');
Route::post('/pool/add', [PoolController::class, 'add'])->middleware(['auth', 'verified'])->name('pool.add');
Route::post('/pool/remove', [PoolController::class, 'remove'])->middleware(['auth', 'verified'])->name('pool.remove');

/* Dairy */
Route::get(
    '/diary/{type}',
    [DiaryController::class, 'show']
)->middleware(['auth', 'verified'])->name('diary.calender');

Route::post(
    '/diary/booking/{type}',
    [DiaryController::class, 'booking']
)->middleware(['auth', 'verified'])->name('diary.calender.booking');

Route::delete(
    '/diary/booking/{booking}',
    [DiaryController::class, 'delete']
)->middleware(['auth', 'verified'])->name('diary.calender.delete');


/* Pilot */
Route::get(
    '/pilots',
    [PilotController::class, 'showList']
)->middleware(['auth', 'verified'])->name('pilots.showList');


/* Jumper */
Route::get(
    '/jumpers',
    [JumperController::class, 'showList']
)->middleware(['auth', 'verified'])->name('jumpers.showList');


/* Instructor */
Route::get(
    '/instructors',
    [InstructorController::class, 'showList']
)->middleware(['auth', 'verified'])->name('instructors.showList');


/* Table Edits */
Route::post(
    '/update/{model}/{id}',
    [UpdateController::class, 'update']
)->middleware(['auth', 'verified'])->name('table.update');

require __DIR__.'/auth.php';
