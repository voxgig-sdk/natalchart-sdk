# FreeAndPro entity test

import json
import os
import time

import pytest

from natalchart_sdk.utility.voxgig_struct import voxgig_struct as vs
from natalchart_sdk import NatalchartSDK
from natalchart_sdk.core import helpers
from natalchart_sdk.config import shared_config
from natalchart_sdk.feature.base_feature import NatalchartBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestFreeAndProEntity:

    def test_should_create_instance(self):
        testsdk = NatalchartSDK.test(None, None)
        ent = testsdk.FreeAndPro(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = NatalchartSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.FreeAndPro(None).load({"date": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _free_and_pro_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "free_and_pro." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"] and os.environ.get("VOXGIG_GETONLY_GUARD") == "TRUE":
            print("LIVE STEP {\"id\":\"free_and_pro.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /v1/chart/angles\"}")
            return self._run_get_only_flow(setup)

        client = setup["client"]

        # CREATE
        free_and_pro_ref01_ent = client.FreeAndPro(None)
        free_and_pro_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.free_and_pro"), "free_and_pro_ref01"))

        free_and_pro_ref01_data = helpers.to_map(runner.entity_data(free_and_pro_ref01_ent.create(free_and_pro_ref01_data, None)))
        assert free_and_pro_ref01_data is not None

        # LOAD
        free_and_pro_ref01_match_dt0 = {}
        free_and_pro_ref01_data_dt0_loaded = free_and_pro_ref01_ent.load(free_and_pro_ref01_match_dt0, None)
        assert free_and_pro_ref01_data_dt0_loaded is not None


    def _run_get_only_flow(self, setup):
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        free_and_pro_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.free_and_pro")))
        free_and_pro_ref01_data = None
        if len(free_and_pro_ref01_data_raw) > 0:
            free_and_pro_ref01_data = helpers.to_map(free_and_pro_ref01_data_raw[0][1])

        # LOAD
        free_and_pro_ref01_ent = client.FreeAndPro(None)
        free_and_pro_ref01_match_dt0 = {}
        free_and_pro_ref01_data_dt0_loaded = free_and_pro_ref01_ent.load(free_and_pro_ref01_match_dt0, None)
        assert free_and_pro_ref01_data_dt0_loaded is not None



def _free_and_pro_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/free_and_pro/FreeAndProTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = NatalchartSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["free_and_pro01", "free_and_pro02", "free_and_pro03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "NATALCHART_TEST_FREE_AND_PRO_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "NATALCHART_TEST_FREE_AND_PRO_ENTID": idmap,
        "NATALCHART_TEST_LIVE": "FALSE",
        "NATALCHART_TEST_EXPLAIN": "FALSE",
        "NATALCHART_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("NATALCHART_TEST_FREE_AND_PRO_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("NATALCHART_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("NATALCHART_APIKEY"),
            },
            extra or {},
        ])
        client = NatalchartSDK(helpers.to_map(merged_opts))

    _live = env.get("NATALCHART_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("NATALCHART_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
