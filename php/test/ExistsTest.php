<?php
declare(strict_types=1);

// Natalchart SDK exists test

require_once __DIR__ . '/../natalchart_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = NatalchartSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
