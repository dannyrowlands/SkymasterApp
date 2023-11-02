<?php

namespace App\Http\Controllers;

use App\Models\Jumper;
use App\Models\Pool;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;

class ManifestController extends Controller
{
    private $pool = null;

    public function view () : Response
    {
        return inertia('Manifest/View', [
            'manifests' => $this->getManifestsData(),
            'pool' => $this->getPoolData(),
            'jumpers' => $this->getJumpers(),
            'type' => 'std'
        ]);

    }

    public function getJumperList()
    {
        return $this->getJumpers();
    }

    /**
     * @return array
     */
    private function getPoolData(): array
    {
        try{
            $this->getPool();
            $pool_response_array = [];
            if((!is_null($this->pool))) {
//                $this->pool->id_list = json_encode([1,2,3,4,5,6,7,8,9,10]);
//                $this->pool->save();
//                dd($this->pool->id_list);
                foreach (json_decode($this->pool->id_list, true) as $id) {
                    $jumper = Jumper::join('individuals', 'individuals.id', '=', 'jumpers.individual_id')->findOrFail($id);
                    $pool_response_array[] = $jumper;
                }
            }
            return $pool_response_array;
        } catch(\Exception $e) {
            dd($e->getMessage());
        }
    }

    private function getJumpers()
    {
        try{
            $this->getPool();
            if((!is_null($this->pool))) {
                $data = Jumper::whereNotIn('jumpers.id', json_decode($this->pool->id_list, true))
                    ->join('individuals', 'individuals.id', '=', 'jumpers.individual_id')
                    ->orderBy('individuals.last_name', 'ASC')->orderBy('individuals.first_name', 'ASC')
                    ->get();
                return $data;
            }
            return Jumper::join('individuals', 'individuals.id', '=', 'jumpers.individual_id')
                ->orderBy('individuals.last_name', 'ASC')->orderBy('individuals.first_name', 'ASC')
                ->get();
        } catch(\Exception $e) {
            dd($e->getMessage());
        }
    }

    private function getManifestsData()
    {
        return [];
    }

    /**
     * @return void
     */
    private function getPool(): void
    {
        $this->pool = Pool::where(
            [
                'type' => 'std',
                'date' => today(),
                'dropzone_id' => Auth::user()->dropzone_id
            ]
        )->first();
    }
}
