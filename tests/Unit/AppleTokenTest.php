<?php

namespace Tests\Unit;

use App\Services\AppleToken;
use Lcobucci\JWT\Configuration;
use Lcobucci\JWT\Token;
use Tests\TestCase;

class AppleTokenTest extends TestCase
{
    /** @test */
    public function it_is_permitted_for_apple()
    {
        $token = app(Configuration::class)
            ->parser()
            ->parse(app(AppleToken::class)->generate());

        $this->assertTrue($token->isPermittedFor('https://appleid.apple.com'));
    }
}
