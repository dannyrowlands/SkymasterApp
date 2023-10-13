<?php
namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Booking;
use Carbon\Carbon;

class DiaryController extends Controller
{
    const TANDEM = 'TANDEM';
    const AFF = 'AFF';
    const RAPS = 'RAPS';
    const TZ = 'Europe/London';

    public function showRAPS()
    {
        return inertia('Diary/Calender', [
            'bookings' => Booking::
                where(['booking_type' => self::RAPS])
                ->whereDate('booking_timestamp', '>=', Carbon::now(self::TZ))
                ->get(),
            'type' => self::RAPS
        ]);
    }

    public function showAFF()
    {
        return inertia('Diary/Calender', [
            'bookings' => Booking::
                where(['booking_type' => self::AFF])
                ->whereDate('booking_timestamp', '>=', Carbon::now(self::TZ))
                ->get(),
            'type' => self::AFF
        ]);
    }

    public function showTANDEM()
    {
        return inertia('Diary/Calender', [
            'bookings' => Booking::
            where(['booking_type' => self::TANDEM])
                ->whereDate('booking_timestamp', '>=', Carbon::now(self::TZ))
                ->get(),
            'type' => self::TANDEM
        ]);
    }

    public function addBooking() : array
    {
        return [];
    }

}
