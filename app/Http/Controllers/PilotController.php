<?php

namespace App\Http\Controllers;

use App\Http\Resources\PilotResource;
use App\Models\Pilot;
use Illuminate\Http\Request;
use Inertia\Response;

class PilotController extends Controller
{
    /**
     * @param $type
     * @return Response
     */
    public function showList() : Response
    {
        try{
            $pilots = PilotResource::collection(
                Pilot::paginate(
                    env('TABLE_ROWS_TO_DISPLAY', 20)
                )
            );
        } catch(\Exception $e) {
            dd($e->getMessage());
        }
        return inertia('Admin/Pilots', [
            'list' => $pilots,
        ]);
    }
}
