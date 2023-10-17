<?php

namespace App\Http\Resources;

use App\Models\Jumper;
use App\Models\People;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JumperResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request) : array
    {
        $jumper = Jumper::with('Person')->findOrFail($this->resource->id);
        $array = [];
        $array['id'] =  $this->resource->id;
        $array['first_name'] = $jumper->person->first_name;
        $array['last_name'] = $jumper->person->last_name;
        $array['full_name'] = ucfirst(strtolower($jumper->person->first_name)).' '.ucfirst(strtolower($jumper->person->last_name));
        $array['dob'] = $jumper->person->dob;
        $array['weight'] = $jumper->person->weight;
        $array['email'] = $jumper->person->email;
        $array['last_updated'] = $jumper->person->updated_at;
        return $array;
    }
}
