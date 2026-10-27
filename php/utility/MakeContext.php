<?php
declare(strict_types=1);

// Natalchart SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class NatalchartMakeContext
{
    public static function call(array $ctxmap, ?NatalchartContext $basectx): NatalchartContext
    {
        return new NatalchartContext($ctxmap, $basectx);
    }
}
