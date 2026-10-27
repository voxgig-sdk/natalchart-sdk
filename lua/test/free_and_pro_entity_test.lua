-- FreeAndPro entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("natalchart_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

-- main.kit.test.live.strict is true (the default is true): a live
-- request that fails, or a live test missing an input it needs,
-- fails the test.
-- An account with no record for a test to read skips it either way.
local LIVE_STRICT = true


describe("FreeAndProEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:FreeAndPro(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:FreeAndPro(nil):load({ ["date"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = free_and_pro_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "free_and_pro." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"free_and_pro.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /v1/chart/angles\"}")
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local free_and_pro_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.free_and_pro")))
    local free_and_pro_ref01_data = nil
    if #free_and_pro_ref01_data_raw > 0 then
      free_and_pro_ref01_data = helpers.to_map(free_and_pro_ref01_data_raw[1][2])
    end

    -- LOAD
    local free_and_pro_ref01_ent = client:FreeAndPro(nil)
    local free_and_pro_ref01_match_dt0 = {}
    local free_and_pro_ref01_data_dt0_loaded, err = free_and_pro_ref01_ent:load(free_and_pro_ref01_match_dt0, nil)
    assert.is_nil(err)
    assert.is_not_nil(free_and_pro_ref01_data_dt0_loaded)

      return
    end

    local client = setup.client

    -- CREATE
    local free_and_pro_ref01_ent = client:FreeAndPro(nil)
    local free_and_pro_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.free_and_pro"), "free_and_pro_ref01"))

    local free_and_pro_ref01_data_result, err = free_and_pro_ref01_ent:create(free_and_pro_ref01_data, nil)
    assert.is_nil(err)
    free_and_pro_ref01_data = helpers.to_map(type(free_and_pro_ref01_data_result) == 'table' and free_and_pro_ref01_data_result.data_get and free_and_pro_ref01_data_result:data_get() or free_and_pro_ref01_data_result)
    assert.is_not_nil(free_and_pro_ref01_data)

    -- LOAD
    local free_and_pro_ref01_match_dt0 = {}
    local free_and_pro_ref01_data_dt0_loaded, err = free_and_pro_ref01_ent:load(free_and_pro_ref01_match_dt0, nil)
    assert.is_nil(err)
    assert.is_not_nil(free_and_pro_ref01_data_dt0_loaded)

  end)
end)

function free_and_pro_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/free_and_pro/FreeAndProTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read free_and_pro test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "free_and_pro01", "free_and_pro02", "free_and_pro03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("NATALCHART_TEST_FREE_AND_PRO_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["NATALCHART_TEST_FREE_AND_PRO_ENTID"] = idmap,
    ["NATALCHART_TEST_LIVE"] = "FALSE",
    ["NATALCHART_TEST_EXPLAIN"] = "FALSE",
    ["NATALCHART_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["NATALCHART_TEST_FREE_AND_PRO_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["NATALCHART_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
        apikey = env["NATALCHART_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["NATALCHART_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["NATALCHART_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
