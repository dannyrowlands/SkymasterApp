<?php

namespace Database\Factories;

use App\Models\People;
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
        $types = ['TANDEM','AFF','RAPS', null];
        return [
            'person_id' => People::factory()->create()->id,
            'instructor_type' => $types[array_rand($types, 1)],
            'created_at' => now()
        ];
    }
}
