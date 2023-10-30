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
            $instructor = Instructor::with(
                'Jumper',
                'Jumper.Individual',
                'Jumper.Individual.Medical'
            )->findOrFail($this->resource->id);

            $array = [];
            $array['medical_id'] = null;
            $array['medical_expires'] = null;
            $array['id'] =  $this->resource->id;
            $array['jumper_id'] = $instructor->jumper->id;
            $array['individual_id'] = $instructor->jumper->individual->id;
            if($instructor->jumper->individual->medical) {
                $array['medical_id'] = $instructor->jumper->individual->medical->id;
                $array['medical_expires'] = $instructor->jumper->individual->medical->expires;
            }
            $array['first_name'] = $instructor->jumper->individual->first_name;
            $array['last_name'] = $instructor->jumper->individual->last_name;
            $array['full_name'] = ucfirst(strtolower($instructor->jumper->individual->first_name)).' '.ucfirst(strtolower($instructor->jumper->individual->last_name));
            $array['dob'] = $instructor->jumper->individual->dob;
            $array['weight'] = $instructor->jumper->individual->weight;
            $array['email'] = $instructor->jumper->individual->email;
            $array['tel_no'] = $instructor->jumper->individual->tel_no;
            $array['last_updated'] = $instructor->jumper->individual->updated_at;
            return $array;
        } catch(ModelNotFoundException $e) {
            dd('Not found',get_class_methods($e));
        }
    }
}
