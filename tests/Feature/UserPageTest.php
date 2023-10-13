<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;

class UserPageTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_the_application_can_return_a_user(): void
    {
        User::factory()->create(['id' => 1]);

        $response = $this->get('/user/1');

        $response->assertStatus(200);
    }
}
