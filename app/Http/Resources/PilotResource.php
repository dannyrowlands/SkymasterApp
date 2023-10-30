<?php

namespace App\Http\Resources;

use App\Models\Pilot;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PilotResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request) : array
    {
        try {
            $pilot = Pilot::with('Person')->findOrFail($this->resource->id);

            $array = [];
            $array['id'] =  $this->resource->id;
            $array['person_id'] = $pilot->person->id;
            $array['first_name'] = $pilot->person->first_name;
            $array['last_name'] = $pilot->person->last_name;
            $array['full_name'] = ucfirst(strtolower($pilot->person->first_name)).' '.ucfirst(strtolower($pilot->person->last_name));
            $array['dob'] = $pilot->person->dob;
            $array['weight'] = $pilot->person->weight;
            $array['email'] = $pilot->person->email;
            $array['tel_no'] = $pilot->person->tel_no;
            $array['last_updated'] = $pilot->person->updated_at;
            return $array;
        } catch(ModelNotFoundException $e) {
            dd('Not found',get_class_methods($e));
        }
    }
}
