<?php

namespace App\Http\Controllers;

use App\Models\ManifestDetails;
use App\Models\Pool;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PoolController extends Controller
{
    private $pool;

    public function add(Request $request) : bool
    {
        try {
            $this->getOrCreatePool();
            $this->setUpManifestDetails($request);
            $list = [];
            if ($this->pool->id_list) {
                $list = json_decode($this->pool->id_list, true);
            }
            array_push($list, $request->id);
            $this->pool->id_list = json_encode($list);
            $this->pool->save();
            return $this->pool->id_list;
        } catch(\Exception $e) {
            dd($e->getMessage());
        }
    }

    public function remove(Request $request) : bool
    {
        try {
            $this->getOrCreatePool();
            $list = json_decode($this->pool->id_list, true);
            $new_array = [];
            foreach($list as $item) {
                if($item !== $request->id) {
                    $new_array[] = $item;
                }
            }
            $this->pool->id_list = json_encode($new_array);
            $this->pool->save();
            return $this->pool->id_list;
        } catch(\Exception $e) {
            dd($e->getMessage());
        }
    }

    /**
     * @return void
     */
    private function getOrCreatePool(): void
    {
        $this->pool = Pool::firstOrCreate(
            [
                'type' => 'std',
                'date' => today(),
                'dropzone_id' => Auth::user()->dropzone_id
            ],
            ['id_list' => json_encode([])]
        );
    }

    private function setUpManifestDetails(Request $request)
    {
        ManifestDetails::updateOrCreate(
            [
                'jumper_id' => $request->id,
            ],
            [
                'sequence' => $request->sequence,
                'group_identifier' => $request->group_identifier,
                'note' => $request->note,
            ]
        );
    }
}
