<?php

use App\Http\Controllers\ProfileController;
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

/* Dairy */
Route::get(
    '/diary/RAPS',
    [DiaryController::class, 'showRAPS']
)->middleware(['auth', 'verified'])->name('diary.calender.raps');

Route::get(
    '/diary/AFF',
    [DiaryController::class, 'showAFF']
)->middleware(['auth', 'verified'])->name('diary.calender.aff');

Route::get(
    '/diary/TANDEM',
    [DiaryController::class, 'showTANDEM']
)->middleware(['auth', 'verified'])->name('diary.calender.tandem');

Route::post(
    '/diary/add-booking/{type}',
    [DiaryController::class, 'addBooking']
)->middleware(['auth', 'verified'])->name('diary.calender.add');

/* User */
Route::get(
    '/user/{user}',
    [UserController::class, 'show']
)->name('user.show')->middleware(['auth', 'verified']);

require __DIR__.'/auth.php';
