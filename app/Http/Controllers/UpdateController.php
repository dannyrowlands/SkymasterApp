<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;

class UpdateController extends Controller
{
    /**
     * @param $type
     * @return Response
     */
    public function update(Request $request, String $model, Int $id)
    {
        try{
            $edit_model = app('\\App\\Models\\'.ucfirst($model))::find($id);
            $field_data = $request->all();
            foreach($field_data as $key => $val)
            {
                $field = $key;
                $edit_model->$field = $val;
            }
            $edit_model->save();
        } catch(\Exception $e) {
            dd($e->getMessage());
        }

        return json_encode([
            'Model' => $edit_model,
        ]);
    }
}
