<?php

namespace App\Http\Resources;

use App\Models\Jumper;
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
            $instructor = Jumper::with('Person')->findOrFail($this->resource->id);
            $array = [];
            $array['id'] =  $this->resource->id;
            $array['first_name'] = $instructor->person->first_name;
            $array['last_name'] = $instructor->person->last_name;
            $array['full_name'] = ucfirst(strtolower($instructor->person->first_name)).' '.ucfirst(strtolower($instructor->person->last_name));
            $array['dob'] = $instructor->person->dob;
            $array['weight'] = $instructor->person->weight;
            $array['email'] = $instructor->person->email;
            $array['tel_no'] = $instructor->person->tel_no;
            $array['last_updated'] = $instructor->person->updated_at;
            return $array;
        } catch(ModelNotFoundException $e) {
            dd('Not found',get_class_methods($e));
        }
    }
}
