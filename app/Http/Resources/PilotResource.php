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
            $pilot = Pilot::with(
                'Individual',
                'Individual.Medical'
            )->findOrFail($this->resource->id);

            $array = [];
            $array['id'] =  $this->resource->id;
            $array['individual_id'] = $pilot->individual->id;
            if($pilot->individual->medical) {
                $array['medical_id'] = $pilot->individual->medical->id;
                $array['medical_expires'] = $pilot->individual->medical->expires;
            }
            $array['first_name'] = $pilot->individual->first_name;
            $array['last_name'] = $pilot->individual->last_name;
            $array['full_name'] = ucfirst(strtolower($pilot->individual->first_name)).' '.ucfirst(strtolower($pilot->individual->last_name));
            $array['dob'] = $pilot->individual->dob;
            $array['weight'] = $pilot->individual->weight;
            $array['email'] = $pilot->individual->email;
            $array['tel_no'] = $pilot->individual->tel_no;
            $array['last_updated'] = $pilot->individual->updated_at;
            return $array;
        } catch(ModelNotFoundException $e) {
            dd('Not found',get_class_methods($e));
        }
    }
}
