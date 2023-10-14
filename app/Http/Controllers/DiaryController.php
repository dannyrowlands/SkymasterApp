<?php
namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DiaryController extends Controller
{

    public function show($type)
    {
        return inertia('Diary/Calender', [
            'bookings' => Booking::
                where(['booking_type' => $type])
                ->whereDate('booking_timestamp', '>=', Carbon::now(env('APP_TZ', date_default_timezone_get()))->subMonths(6))
                ->get(),
            'type' => $type
        ]);
    }

    public function booking(Request $request, $type)
    {
        $booking = Booking::updateOrCreate(
            ['id' =>  $request->id],
            [
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'weight' => $request->weight,
                'tel_no' => $request->tel_no,
                'booking_type' => $request->type,
                'booking_timestamp' => $request->start
            ],
        );
        return $booking;
    }

}
