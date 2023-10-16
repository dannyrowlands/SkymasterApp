<?php

namespace App\Http\Controllers;

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
        $jumpers = Jumper::all();

        return inertia('Jumper/List', [
            'jumpers' => $jumpers,
        ]);
    }
}
