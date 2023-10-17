<?php

namespace Database\Factories;

use App\Models\People;
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
            'person_id' => People::factory()->create()->id,
            'created_at' => now()
        ];
    }
}
