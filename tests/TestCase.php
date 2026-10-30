<?php

declare(strict_types=1);

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    private int $outputBufferLevel = 0;

    protected function setUp(): void
    {
        $this->outputBufferLevel = ob_get_level();

        parent::setUp();
    }

    protected function tearDown(): void
    {
        // Several controllers open a gzip output buffer in their constructors.
        while (ob_get_level() > $this->outputBufferLevel) {
            ob_end_clean();
        }

        parent::tearDown();
    }
}
