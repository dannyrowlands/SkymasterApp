<?php

namespace Database\Factories;

use App\Models\Individual;
use App\Models\Jumper;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Jumper>
 */
class JumperFactory extends Factory
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
            'created_at' => now()
        ];
    }
}
