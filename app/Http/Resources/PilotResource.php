<?php

namespace App\Http\Resources;

use App\Models\Jumper;
use App\Models\People;
use App\Models\Pilot;
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
        $pilot = Pilot::with('Person')->findOrFail($this->resource->id);
        $array = [];
        $array['id'] =  $this->resource->id;
        $array['first_name'] = $pilot->person->first_name;
        $array['last_name'] = $pilot->person->last_name;
        $array['full_name'] = ucfirst(strtolower($pilot->person->first_name)).' '.ucfirst(strtolower($pilot->person->last_name));
        $array['dob'] = $pilot->person->dob;
        $array['weight'] = $pilot->person->weight;
        $array['email'] = $pilot->person->email;
        $array['last_updated'] = $pilot->person->updated_at;
        return $array;
    }
}
