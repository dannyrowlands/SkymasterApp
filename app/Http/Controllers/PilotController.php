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
        $pilots = PilotResource::collection(Pilot::paginate(env('TABLE_ROWS_TO_DISPLAY', 20)));

        return inertia('Pilot/List', [
            'list' => $pilots,
        ]);
    }
}
