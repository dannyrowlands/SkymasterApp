<?php

namespace App\Http\Controllers;

use App\Models\Jumper;
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
        $pilots = Pilot::all();

        return inertia('Pilot/List', [
            'pilots' => $pilots,
        ]);
    }
}
