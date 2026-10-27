<?php
declare(strict_types=1);

// Natalchart SDK utility: result_headers

class NatalchartResultHeaders
{
    public static function call(NatalchartContext $ctx): ?NatalchartResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
