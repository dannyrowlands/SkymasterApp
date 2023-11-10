<?php

namespace Database\Factories;

use App\Models\Dropzone;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ManifestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $array = ['airborne', 'landed', 'held', 'waiting'];
        return [
            'order' => rand(0,10),
            'status' => $array[array_rand($array, 1)],
            'date' => today(),
            'id_list' => [1,2,3,4,5,6,7,8,9,10],
            'dropzone_id' => Dropzone::all()->random()->id,
        ];
    }
}
