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

        for ($x = 1; $x <= 15; $x++) {
            Jumper::factory()->create([
                'individual_id' => $x,
            ]);
        }

        Instructor::factory()->count(5)->create();

        for ($x = 1; $x <= 10; $x++) {
            Medical::factory()->create([
                'individual_id' => $x,
            ]);
        }

        for ($x = 1; $x <= 2; $x++) {
            Pilot::factory()->create([
                'individual_id' => $x,
            ]);
        }
    }
}
