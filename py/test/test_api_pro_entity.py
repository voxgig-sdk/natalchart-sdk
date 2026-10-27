# ApiPro entity test

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


class TestApiProEntity:

    def test_should_create_instance(self):
        testsdk = NatalchartSDK.test(None, None)
        ent = testsdk.ApiPro(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = NatalchartSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.ApiPro(None).create({"activity": 1, "birth": "x", "personA": "x", "personB": "x", "year": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _api_pro_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "api_pro." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"] and os.environ.get("VOXGIG_GETONLY_GUARD") == "TRUE":
            print("LIVE STEP {\"id\":\"api_pro.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /v1/locations/rank\"}")
            pytest.skip("Live coverage incomplete: api_pro.create.0 excluded (GET-only live run: needs POST /v1/locations/rank)")

        client = setup["client"]

        # CREATE
        api_pro_ref01_ent = client.ApiPro(None)
        api_pro_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.api_pro"), "api_pro_ref01"))

        api_pro_ref01_data = helpers.to_map(runner.entity_data(api_pro_ref01_ent.create(api_pro_ref01_data, None)))
        assert api_pro_ref01_data is not None



def _api_pro_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/api_pro/ApiProTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = NatalchartSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["api_pro01", "api_pro02", "api_pro03"],
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
        "NATALCHART_TEST_API_PRO_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "NATALCHART_TEST_API_PRO_ENTID": idmap,
        "NATALCHART_TEST_LIVE": "FALSE",
        "NATALCHART_TEST_EXPLAIN": "FALSE",
        "NATALCHART_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("NATALCHART_TEST_API_PRO_ENTID"))
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
