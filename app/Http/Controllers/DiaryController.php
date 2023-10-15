<?php
namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Response;

class DiaryController extends Controller
{

    public function show($type) : Response
    {
        $bookings = Booking::
        where(['booking_type' => $type])
            ->whereDate('booking_timestamp', '>=', Carbon::now(env('APP_TZ', date_default_timezone_get()))->subMonths(6))
            ->get();

        if ($type === 'ALL') {
            $bookings = Booking::
            whereDate('booking_timestamp', '>=', Carbon::now(env('APP_TZ', date_default_timezone_get()))->subMonths(6))
                ->get();
        }

        return inertia('Diary/Calender', [
            'bookings' => $bookings,
            'type' => $type
        ]);
    }

    public function booking(Request $request, $type) : Booking
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

    public function delete($id) : void
    {
        $booking = Booking::find($id);
        $booking->delete();
    }
}
