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
            $jumper = Jumper::with('Individual')->findOrFail($this->resource->id);
            $array = [];
            $array['id'] =  $this->resource->id;
            $array['person_id'] = $this->individual->id;
            $array['first_name'] = $jumper->individual->first_name;
            $array['last_name'] = $jumper->individual->last_name;
            $array['full_name'] = ucfirst(strtolower($jumper->individual->first_name)).' '.ucfirst(strtolower($jumper->individual->last_name));
            $array['dob'] = $jumper->individual->dob;
            $array['weight'] = $jumper->individual->weight;
            $array['email'] = $jumper->individual->email;
            $array['tel_no'] = $jumper->individual->tel_no;
            $array['last_updated'] = $jumper->individual->updated_at;
            return $array;
        } catch(ModelNotFoundException $e) {
            dd('Not found',get_class_methods($e));
        }
    }
}
