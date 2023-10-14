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
                ->whereDate('booking_timestamp', '>=', Carbon::now(env('APP_TZ', date_default_timezone_get())))
                ->get(),
            'type' => $type
        ]);
    }

    public function addBooking(Request $request, $type)
    {
        /*
         * $type = AFF, TANDEM, RAPS
         *
         * $request Content
        {
            "start": "2023-10-19T01:40:51.000Z",
            "end": "2023-10-19T01:40:51.000Z",
            "title": "Prof. Ova Trp Jr.",
            "id": 59,
            "index": 2
        }
        */
        return $request;
    }

}
