<?php

namespace App\Http\Resources;

use App\Models\Jumper;
use Illuminate\Database\Eloquent\ModelNotFoundException;
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
        try {
            $jumper = Jumper::with('Person')->findOrFail($this->resource->id);
            $array = [];
            $array['id'] =  $this->resource->id;
            $array['person_id'] = $this->person->id;
            $array['first_name'] = $jumper->person->first_name;
            $array['last_name'] = $jumper->person->last_name;
            $array['full_name'] = ucfirst(strtolower($jumper->person->first_name)).' '.ucfirst(strtolower($jumper->person->last_name));
            $array['dob'] = $jumper->person->dob;
            $array['weight'] = $jumper->person->weight;
            $array['email'] = $jumper->person->email;
            $array['tel_no'] = $jumper->person->tel_no;
            $array['last_updated'] = $jumper->person->updated_at;
            return $array;
        } catch(ModelNotFoundException $e) {
            dd('Not found',get_class_methods($e));
        }
    }
}
