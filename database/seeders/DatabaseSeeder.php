<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Individual;
use App\Models\Instructor;
use App\Models\Jumper;
use App\Models\Medical;
use App\Models\Pilot;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Individual::factory()->count(20)->create();
        Jumper::factory()->count(15)->create();
        Instructor::factory()->count(5)->create();
        Pilot::factory()->count(2)->create();
        Medical::factory()->count(10)->create()
    }
}
