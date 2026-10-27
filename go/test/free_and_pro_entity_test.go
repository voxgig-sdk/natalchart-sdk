package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/natalchart-sdk/go"
	"github.com/voxgig-sdk/natalchart-sdk/go/core"

	vs "github.com/voxgig-sdk/natalchart-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const free_and_proEntityLiveStrict = true


func TestFreeAndProEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.FreeAndPro(nil)
		if ent == nil {
			t.Fatal("expected non-nil FreeAndProEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.FreeAndPro(nil).Load(map[string]any{"date": 1}, nil)
		if sdkerr, ok := err.(*core.NatalchartError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := free_and_proBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "free_and_pro." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"free_and_pro.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /v1/chart/angles\"}")
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		freeAndProRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.free_and_pro")))
		var freeAndProRef01Data map[string]any
		if len(freeAndProRef01DataRaw) > 0 {
			freeAndProRef01Data = core.ToMapAny(freeAndProRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = freeAndProRef01Data

		// LOAD
		freeAndProRef01Ent := client.FreeAndPro(nil)
		freeAndProRef01MatchDt0 := map[string]any{}
		freeAndProRef01DataDt0Loaded, err := freeAndProRef01Ent.Load(freeAndProRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if freeAndProRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

		return
		}

		client := setup.client
		_ = client

		// CREATE
		freeAndProRef01Ent := client.FreeAndPro(nil)
		freeAndProRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "free_and_pro"}), "free_and_pro_ref01"))

		freeAndProRef01DataResult, err := freeAndProRef01Ent.Create(freeAndProRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		freeAndProRef01Data = core.ToMapAny(entityData(freeAndProRef01DataResult))
		if freeAndProRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// LOAD
		freeAndProRef01MatchDt0 := map[string]any{}
		freeAndProRef01DataDt0Loaded, err := freeAndProRef01Ent.Load(freeAndProRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if freeAndProRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func free_and_proBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "free_and_pro", "FreeAndProTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read free_and_pro test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse free_and_pro test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"free_and_pro01", "free_and_pro02", "free_and_pro03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("NATALCHART_TEST_FREE_AND_PRO_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"NATALCHART_TEST_FREE_AND_PRO_ENTID": idmap,
		"NATALCHART_TEST_LIVE":      "FALSE",
		"NATALCHART_TEST_EXPLAIN":   "FALSE",
		"NATALCHART_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["NATALCHART_TEST_FREE_AND_PRO_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["NATALCHART_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["NATALCHART_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewNatalchartSDK(core.ToMapAny(mergedOpts))
	}

	live := env["NATALCHART_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["NATALCHART_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
