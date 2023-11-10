<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Booking;
use App\Models\Dropzone;
use App\Models\Individual;
use App\Models\Instructor;
use App\Models\Jumper;
use App\Models\Manifest;
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

        Dropzone::factory()->count(5)->create();

        Booking::factory()->count(100)->create();

        for ($x = 1; $x <= 15; $x++) {
            Jumper::factory()->create([
                'individual_id' => $x,
            ]);
        }

        Instructor::factory()->count(15)->create();

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

        for ($x = 1; $x <= 5; $x++) {
            Manifest::factory()->create([
                'order' => $x,
                'status' => 'waiting',
                'date' => today(),
                'id_list' => json_encode([1,2,3,4,5,6,7,8,9,10]),
                'dropzone_id' => 1,
            ]);
        }
    }
}
