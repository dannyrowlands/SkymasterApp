<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class DailySysAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'skymaster:daily-sys-admin';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Runs required routines overnight.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            DB::table('jumpers')
                ->update(['ready_status' => 0]);
            $this->info('Successfully reset all jumper ready statuses.');
        } catch (\Exception $e) {
            dd('Jumper Reset routine failed', $e->getMessage());
        }
    }
}
