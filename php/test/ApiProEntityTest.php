<?php
declare(strict_types=1);

// ApiPro entity test

require_once __DIR__ . '/../natalchart_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ApiProEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = NatalchartSDK::test(null, null);
        $ent = $testsdk->ApiPro(null);
        $this->assertNotNull($ent);
    }

    public function test_validate(): void
    {
        $cfg = NatalchartConfig::shared_config();
        if (!isset($cfg["feature"]["validate"])) {
            $this->markTestSkipped('feature not present in this SDK: validate');
        }
        $client = NatalchartSDK::test(null, ["feature" => ["validate" => ["active" => true]]]);
        $err = null;
        try {
            $client->ApiPro(null)->create(["activity" => 1, "birth" => 'x', "personA" => 'x', "personB" => 'x', "year" => 1], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = api_pro_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "api_pro." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"]) && getenv('VOXGIG_GETONLY_GUARD') === "TRUE") {
            fwrite(STDOUT, 'LIVE STEP {"id":"api_pro.create.0","state":"excluded","attempted":false,"reason":"GET-only live run: needs POST /v1/locations/rank"}' . "\n");
            $this->markTestSkipped('Live coverage incomplete: api_pro.create.0 excluded (GET-only live run: needs POST /v1/locations/rank)');
        }

        $client = $setup["client"];

        // CREATE
        $api_pro_ref01_ent = $client->ApiPro(null);
        $api_pro_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.api_pro"), "api_pro_ref01"));

        $api_pro_ref01_data_result = $api_pro_ref01_ent->create($api_pro_ref01_data, null);
        $api_pro_ref01_data = Helpers::to_map(is_object($api_pro_ref01_data_result) && method_exists($api_pro_ref01_data_result, 'data_get') ? $api_pro_ref01_data_result->data_get() : $api_pro_ref01_data_result);
        $this->assertNotNull($api_pro_ref01_data);

    }
}

function api_pro_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/api_pro/ApiProTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = NatalchartSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["api_pro01", "api_pro02", "api_pro03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("NATALCHART_TEST_API_PRO_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "NATALCHART_TEST_API_PRO_ENTID" => $idmap,
        "NATALCHART_TEST_LIVE" => "FALSE",
        "NATALCHART_TEST_EXPLAIN" => "FALSE",
        "NATALCHART_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["NATALCHART_TEST_API_PRO_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["NATALCHART_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
                "apikey" => $env["NATALCHART_APIKEY"],
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new NatalchartSDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["NATALCHART_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["NATALCHART_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
