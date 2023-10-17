<?php
namespace App\Http\Controllers;

use App\Models\Jumper;
use App\Models\People;
use App\Models\User;
use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Response;

class DiaryController extends Controller
{
    /**
     * @param $type
     * @return Response
     */
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

    /**
     * @param Request $request
     * @param $type
     * @return Booking
     */
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
                'booking_timestamp' => $request->start,
                'dob' => $request->dob,
            ],
        );

        if($request->type !== 'TANDEM')
        {
            $person_id = People::updateOrCreate(
                ['first_name' => $request->first_name, 'last_name' => $request->last_name, 'dob' => $request->dob],
                [
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'email' => $request->email,
                    'weight' => $request->weight,
                    'tel_no' => $request->tel_no,
                    'booking_type' => $request->type,
                    'booking_timestamp' => $request->start,
                    'dob' => $request->dob,
                    'notes' => $request->notes ? $request->notes : '',
                ],
            )->id;

            Jumper::updateOrCreate(
                ['person_id' =>  $person_id],
                [
                    'person_id' => $person_id,
                ],
            );
        }

        return $booking;
    }

    /**
     * @param $id
     * @return void
     */
    public function delete($id) : void
    {
        $booking = Booking::find($id);
        $booking->delete();
    }
}
