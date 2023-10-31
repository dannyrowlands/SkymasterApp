<?php

namespace Database\Factories;

use App\Models\Jumper;
use App\Models\Kit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kit>
 */
class KitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'jumper_id' => Jumper::all()->random()->id,
            'indentifer' => 'Random Rig',
            'main' => 'Random Main',
            'main_size' => 135,
            'reserve' => 'Random Reserve',
            'reserve_size' => 150,
            'aad' => 'AAD Manufacturer Name',
            'aad_service_due' => '2024-01-01',
            'reserve_due' => '2024-01-01',
            'created_at' => now()
        ];
    }
}
