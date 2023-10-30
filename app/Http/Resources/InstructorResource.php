<?php

namespace App\Http\Resources;

use App\Models\Instructor;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InstructorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request) : array
    {
        try {
            $instructor = Instructor::with('Jumper', 'Jumper.Person')->findOrFail($this->resource->id);
            $array = [];
            $array['id'] =  $this->resource->id;
            $array['person_id'] = $this->jumper->person->id;
            $array['jumper_id'] = $this->jumper->id;
            $array['first_name'] = $instructor->jumper->person->first_name;
            $array['last_name'] = $instructor->jumper->person->last_name;
            $array['full_name'] = ucfirst(strtolower($instructor->jumper->person->first_name)).' '.ucfirst(strtolower($instructor->jumper->person->last_name));
            $array['dob'] = $instructor->jumper->person->dob;
            $array['weight'] = $instructor->jumper->person->weight;
            $array['email'] = $instructor->jumper->person->email;
            $array['tel_no'] = $instructor->jumper->person->tel_no;
            $array['last_updated'] = $instructor->jumper->person->updated_at;
            return $array;
        } catch(ModelNotFoundException $e) {
            dd('Not found',get_class_methods($e));
        }
    }
}
