<?php

namespace Database\Factories;

use App\Models\Individual;
use App\Models\Medical;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Medical>
 */
class MedicalFactory extends Factory
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
            'type' => 'TEST',
            'issued_by' => 'Test Issuer',
            'expires' => fake()->dateTimeBetween('+1 day', '+12 months'),
            'created_at' => now()
        ];
    }
}
