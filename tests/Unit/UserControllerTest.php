<?php
namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Inertia\Testing\AssertableInertia as Assert;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;
    public function test_can_view_user()
    {
        $this->seed();

        $response = $this->get('/user/1')->assertInertia(fn (Assert $page) => $page
            ->has('user')
        );

    }
}
