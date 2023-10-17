<?php

namespace App\Http\Controllers;

use App\Http\Resources\JumperResource;
use App\Models\Jumper;
use Illuminate\Http\Request;
use Inertia\Response;

class JumperController extends Controller
{
    /**
     * @param $type
     * @return Response
     */
    public function showList() : Response
    {
        $jumpers = JumperResource::collection(Jumper::all());

        return inertia('Jumper/List', [
            'list' => $jumpers,
        ]);
    }

}
