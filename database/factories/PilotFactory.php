<?php

namespace Database\Factories;

use App\Models\Dropzone;
use App\Models\Individual;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pilot>
 */
class PilotFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'individual_id' => Individual::all()->random()->id,
            'dropzone_id' => Dropzone::all()->random()->id,
            'created_at' => now()
        ];
    }
}
