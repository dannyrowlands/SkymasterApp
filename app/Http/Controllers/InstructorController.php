<?php

namespace App\Http\Controllers;

use App\Http\Resources\InstructorResource;
use App\Http\Resources\JumperResource;
use App\Models\Jumper;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Collection;
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
            $instructors = InstructorResource::collection(Jumper::with('Person')->where('instructor_type', '!=', '')->paginate(env('TABLE_ROWS_TO_DISPLAY', 20)));
        } catch(\Exception $e) {
            dd($e->getMessage());
        }

        return inertia('Admin/Instructors', [
            'list' => $instructors,
        ]);
    }

}
