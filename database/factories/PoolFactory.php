<?php

namespace Database\Factories;

use App\Models\Dropzone;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pool>
 */
class PoolFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'type' => 'std',
            'date' => today(),
            'id_list' => [1,2,3,4,5,6,7,8,9,10],
            'dropzone_id' => Dropzone::all()->random()->id,
        ];
    }
}
