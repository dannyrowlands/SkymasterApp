<?php

namespace Database\Factories;

use App\Models\Dropzone;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
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
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'weight' => fake()->numberBetween(50, 100),
            'tel_no' => fake()->phoneNumber(),
            'booking_timestamp' => fake()->dateTimeBetween('+1 day', '+1 month'),
            'booking_type' => $types[array_rand($types, 1)],
            'dob' => fake()->date('Y-m-d'),
            'dropzone_id' => Dropzone::all()->random()->id,
            'created_at' => now()
        ];
    }
}
