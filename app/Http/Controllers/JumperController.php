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
        try{
            $jumpers = JumperResource::collection(Jumper::paginate(env('TABLE_ROWS_TO_DISPLAY', 20)));
        } catch(\Exception $e) {
            dd($e->getMessage());
        }

        return inertia('Admin/Jumpers', [
            'list' => $jumpers,
        ]);
    }

}
