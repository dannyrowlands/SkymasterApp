<?php

namespace App\Http\Controllers;

use App\Models\Jumper;
use App\Models\Pool;
use Inertia\Inertia;
use Inertia\Response;

class ManifestController extends Controller
{
    private $pool;

    public function view () : Response
    {
        try{
            return inertia('Manifest/View', [
                'manifests' => $this->getManifestsData(),
                'pool' => $this->getPoolData(),
                'jumpers' => $this->getJumpers(),
            ]);
        } catch(\Exception $e) {
            dd($e->getMessage());
        }
    }

    /**
     * @return \stdClass
     */
    private function getPoolData(): \stdClass
    {
        $this->pool = Pool::firstOrCreate(
            ['type' => 'std'],
            ['date' => today()]
        );
//            $jumperlist = [1,2,3,4,5,6,7,8,9,10];
//            $pool->id_list = json_encode($jumperlist);  Uncomment these lines to recreate for today
//            $pool->save();

        $pool_response_object = new \stdClass();
        $pool_response_object->id = $this->pool->id;
        $pool_response_object->data = [];
        foreach (json_decode($this->pool->id_list) as $id) {
            $jumper = Jumper::with(
                'Individual',
                'Individual.Medical'
            )->findOrFail($id);
            $pool_response_object->data[] = $jumper;
        }
        return $pool_response_object;
    }

    private function getJumpers()
    {
        return Jumper::with(
            'Individual',
            'Individual.Medical'
        )
            ->whereNotIn('id', json_decode($this->pool->id_list))
            ->get();
    }

    private function getManifestsData()
    {
        return [];
    }
}
