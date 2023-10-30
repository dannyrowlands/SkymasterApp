<?php

namespace App\Http\Controllers;

use App\Http\Resources\InstructorResource;
use App\Models\Instructor;
use App\Models\Jumper;
use Inertia\Response;

class InstructorController extends Controller
{
    /**
     * @param $type
     * @return Response
     */
    public function showList() : Response
    {
        try {
            $instructors = InstructorResource::collection(
                Instructor::
                    orderBy('type')
                    ->paginate(env('TABLE_ROWS_TO_DISPLAY', 20)
                    )
            );
        } catch(\Exception $e) {
            dd($e->getMessage());
        }

        return inertia('Admin/Instructors', [
            'list' => $instructors,
        ]);
    }

}
