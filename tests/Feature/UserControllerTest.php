<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic test example.
     */
    public function test_the_application_returns_a_successful_and_correct_response(): void
    {
        User::factory()->create(['id' => 1, 'name'=>'Danny Rowlands', 'email'=>'dannyxrowlands@gmail.com']);

        $response = $this->get('/user/1');
        $response->assertStatus(200)
            ->assertInertia(
                fn (Assert $page) =>
                    $page
                        ->component('User/Show')
                        ->has('user', 6)
                        ->has('user.id')
                        ->has('user.name')
                        ->has('user.email')
                        ->has('user.email_verified_at')
                        ->has('user.created_at')
                        ->has('user.updated_at')
                        ->where('user.id', 1)
                        ->where('user.name', 'Danny Rowlands')
                        ->where('user.email', 'dannyxrowlands@gmail.com')
            );
    }
}
