<?php

namespace Database\Factories;

use App\Models\Dropzone;
use App\Models\Jumper;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class InstructorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['TANDEM','AFF','RAPS'];
        return [
            'jumper_id' => Jumper::all()->random()->id,
            'dropzone_id' => Dropzone::all()->random()->id,
            'type' => $types[array_rand($types, 1)],
        ];
    }
}
