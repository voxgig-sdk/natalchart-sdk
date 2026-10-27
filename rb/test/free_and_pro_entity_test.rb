# FreeAndPro entity test

require "minitest/autorun"
require "json"
require_relative "../Natalchart_sdk"
require_relative "runner"

class FreeAndProEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = NatalchartSDK.test(nil, nil)
    ent = testsdk.FreeAndPro(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = NatalchartConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = NatalchartSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.FreeAndPro(nil).load({ "date" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = free_and_pro_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "free_and_pro." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"free_and_pro.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /v1/chart/angles\"}"
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    free_and_pro_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.free_and_pro")))
    free_and_pro_ref01_data = nil
    if free_and_pro_ref01_data_raw.length > 0
      free_and_pro_ref01_data = Helpers.to_map(free_and_pro_ref01_data_raw[0][1])
    end

    # LOAD
    free_and_pro_ref01_ent = client.FreeAndPro(nil)
    free_and_pro_ref01_match_dt0 = {}
    free_and_pro_ref01_data_dt0_loaded = free_and_pro_ref01_ent.load(free_and_pro_ref01_match_dt0, nil)
    assert !free_and_pro_ref01_data_dt0_loaded.nil?

      return
    end

    client = setup[:client]

    # CREATE
    free_and_pro_ref01_ent = client.FreeAndPro(nil)
    free_and_pro_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.free_and_pro"), "free_and_pro_ref01"))

    free_and_pro_ref01_data_result = free_and_pro_ref01_ent.create(free_and_pro_ref01_data, nil)
    free_and_pro_ref01_data = Helpers.to_map(free_and_pro_ref01_data_result.respond_to?(:data_get) ? free_and_pro_ref01_data_result.data_get : free_and_pro_ref01_data_result)
    assert !free_and_pro_ref01_data.nil?

    # LOAD
    free_and_pro_ref01_match_dt0 = {}
    free_and_pro_ref01_data_dt0_loaded = free_and_pro_ref01_ent.load(free_and_pro_ref01_match_dt0, nil)
    assert !free_and_pro_ref01_data_dt0_loaded.nil?

  end
end

def free_and_pro_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "free_and_pro", "FreeAndProTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = NatalchartSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["free_and_pro01", "free_and_pro02", "free_and_pro03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["NATALCHART_TEST_FREE_AND_PRO_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "NATALCHART_TEST_FREE_AND_PRO_ENTID" => idmap,
    "NATALCHART_TEST_LIVE" => "FALSE",
    "NATALCHART_TEST_EXPLAIN" => "FALSE",
    "NATALCHART_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["NATALCHART_TEST_FREE_AND_PRO_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["NATALCHART_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["NATALCHART_APIKEY"],
      },
      extra || {},
    ])
    client = NatalchartSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["NATALCHART_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["NATALCHART_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
