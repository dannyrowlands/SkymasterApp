<?php

namespace App\Http\Controllers;

use App\Models\Jumper;
use App\Models\ManifestDetails;
use App\Models\Pool;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;

class ManifestController extends Controller
{
    private $pool = null;

    public function view () : Response
    {
        return inertia('Manifest/View', [
            'manifests' => $this->getManifestsData(),
            'pool' => $this->getPoolItems(),
            'jumpers' => $this->getJumpers(),
            'type' => 'std'
        ]);

    }

    public function getPoolList()
    {
        return $this->getPoolItems();
    }

    public function getJumperList()
    {
        return $this->getJumpers();
    }

    public function setManifestDetails(Request $request)
    {
        $count = 0;
        foreach ($request->poolState as $jumper)
        {
            //dd($request->poolState);
            ManifestDetails::updateOrCreate(
                ['jumper_id' =>  $jumper['id']],
                [
                    'sequence' => $count,
                ]
            );
            $count++;
        }

    }

    private function getJumpers()
    {
        try{
            $this->getPool();
            if((!is_null($this->pool))) {
                $data = Jumper::whereNotIn('jumpers.id', json_decode($this->pool->id_list, true))
                ->with(
                    'Individual',
                    'Individual.Medical',
                    'ManifestDetails'
                )
                    //->orderBy('Individual.last_name', 'ASC')->orderBy('Individual.first_name', 'ASC')
                    ->get();
                return $data;
            }
            return Jumper::
                with(
                    'Individual',
                    'Individual.Medical',
                    'ManifestDetails'
                )
                //->orderBy('Individual.last_name', 'ASC')->orderBy('Individual.first_name', 'ASC')
                ->get();
        } catch(\Exception $e) {
            dd($e->getMessage());
        }
    }

    private function getPoolItems()
    {
        try{
            $this->getPool();
            $sortedData = [];
            if((!is_null($this->pool))) {
                $data = ManifestDetails::whereIn('jumper_id', json_decode($this->pool->id_list, true))
                    ->orderBy('sequence', 'ASC')
                    ->orderBy('group_identifier', 'ASC')
                    ->get();

                foreach($data as $item)
                {
                    $sortedData[] = Jumper::where('id', $item->jumper_id)
                    ->with(
                        'Individual',
                        'Individual.Medical',
                        'ManifestDetails'
                    )
                    ->first();
                }
            }
            return $sortedData;
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
