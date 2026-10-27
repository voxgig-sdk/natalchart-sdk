"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('FreeAndProEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when NATALCHART_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('NATALCHART_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.NatalchartSDK.test();
        const ent = testsdk.FreeAndPro();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.NatalchartSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.FreeAndPro().load({ "date": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.NATALCHART_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'free_and_pro.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "birth": { "a": true, "h": "Birth", "n": "birth", "r": true, "t": "`$OBJECT`", "key$": "birth", "index$": 0 }, "date": { "a": true, "fo": "date", "h": "Date", "n": "date", "r": false, "sh": "The day to compute, today (UTC) by default.", "t": "`$STRING`", "key$": "date", "index$": 1 } }, "name": "free_and_pro", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["birth"], "co": { "id": "POST /v1/chart/angles", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v1/chart/angles", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "chart" }, { "lit": "angles" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["birth"], "co": { "id": "POST /v1/chart/aspects", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v1/chart/aspects", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "chart" }, { "lit": "aspects" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": ["birth"], "co": { "id": "POST /v1/chart/elements", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v1/chart/elements", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "chart" }, { "lit": "elements" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "bf": ["birth"], "co": { "id": "POST /v1/chart/fixed-stars", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v1/chart/fixed-stars", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "chart" }, { "lit": "fixed-stars" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }, { "a": true, "bf": ["birth"], "co": { "id": "POST /v1/chart/full", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v1/chart/full", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "chart" }, { "lit": "full" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 4 }, { "a": true, "bf": ["birth"], "co": { "id": "POST /v1/chart/houses", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v1/chart/houses", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "chart" }, { "lit": "houses" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 5 }, { "a": true, "bf": ["birth"], "co": { "id": "POST /v1/chart/planets", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v1/chart/planets", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "chart" }, { "lit": "planets" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 6 }, { "a": true, "bf": ["birth"], "co": { "id": "POST /v1/chart/short", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v1/chart/short", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "chart" }, { "lit": "short" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 7 }, { "a": true, "bf": ["birth", "date"], "co": { "id": "POST /v1/horoscope/daily", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v1/horoscope/daily", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "horoscope" }, { "lit": "daily" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 8 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v1/sky", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "date", "or": "date", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v1/sky", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "sky" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v1/usage", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/v1/usage", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "usage" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "free_and_pro", "name__orig": "free_and_pro", "Name": "FreeAndPro", "name_": "free_and_pro", "name-": "free-and-pro", "NAME": "FREE_AND_PRO", "index$": 1 }, { "active": true, "entity": "free_and_pro", "key$": "BasicFreeAndProFlow", "kind": "basic", "name": "BasicFreeAndProFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "free_and_pro_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "free_and_pro_ref01", "srcdatavar": "free_and_pro_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-free_and_pro_ref01" } }], "index$": 1 }] }, 'FreeAndPro', { "POST /v1/chart/angles": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["birth"], "properties": { "birth": { "type": "object", "required": ["date", "latitude", "longitude"], "properties": { "date": { "type": "string", "format": "date", "description": "Birth date, YYYY-MM-DD, 1800 to 2399.", "examples": ["1991-09-06"] }, "time": { "type": ["string", "null"], "description": "Local birth time, HH:mm, 24-hour. null when unknown: the chart is computed for noon and everything that depends on the time is withheld.", "examples": ["18:30"] }, "latitude": { "type": "number", "minimum": -90, "maximum": 90, "examples": [50.4501] }, "longitude": { "type": "number", "minimum": -180, "maximum": 180, "examples": [30.5234] }, "timezone": { "type": "string", "description": "IANA time zone. Leave it out to resolve it from the coordinates; historical daylight-saving rules are applied to the date.", "examples": ["Europe/Kyiv"] } }, "x-ref": "#/components/schemas/Birth", "key$": "birth" } }, "index$": 1 } } } }, "parameters": [] }, "POST /v1/chart/aspects": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["birth"], "properties": { "birth": { "type": "object", "required": ["date", "latitude", "longitude"], "properties": { "date": { "type": "string", "format": "date", "description": "Birth date, YYYY-MM-DD, 1800 to 2399.", "examples": ["1991-09-06"] }, "time": { "type": ["string", "null"], "description": "Local birth time, HH:mm, 24-hour. null when unknown: the chart is computed for noon and everything that depends on the time is withheld.", "examples": ["18:30"] }, "latitude": { "type": "number", "minimum": -90, "maximum": 90, "examples": [50.4501] }, "longitude": { "type": "number", "minimum": -180, "maximum": 180, "examples": [30.5234] }, "timezone": { "type": "string", "description": "IANA time zone. Leave it out to resolve it from the coordinates; historical daylight-saving rules are applied to the date.", "examples": ["Europe/Kyiv"] } }, "x-ref": "#/components/schemas/Birth", "key$": "birth" } }, "index$": 1 } } } }, "parameters": [] }, "POST /v1/chart/elements": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["birth"], "properties": { "birth": { "type": "object", "required": ["date", "latitude", "longitude"], "properties": { "date": { "type": "string", "format": "date", "description": "Birth date, YYYY-MM-DD, 1800 to 2399.", "examples": ["1991-09-06"] }, "time": { "type": ["string", "null"], "description": "Local birth time, HH:mm, 24-hour. null when unknown: the chart is computed for noon and everything that depends on the time is withheld.", "examples": ["18:30"] }, "latitude": { "type": "number", "minimum": -90, "maximum": 90, "examples": [50.4501] }, "longitude": { "type": "number", "minimum": -180, "maximum": 180, "examples": [30.5234] }, "timezone": { "type": "string", "description": "IANA time zone. Leave it out to resolve it from the coordinates; historical daylight-saving rules are applied to the date.", "examples": ["Europe/Kyiv"] } }, "x-ref": "#/components/schemas/Birth", "key$": "birth" } }, "index$": 1 } } } }, "parameters": [] }, "POST /v1/chart/fixed-stars": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["birth"], "properties": { "birth": { "type": "object", "required": ["date", "latitude", "longitude"], "properties": { "date": { "type": "string", "format": "date", "description": "Birth date, YYYY-MM-DD, 1800 to 2399.", "examples": ["1991-09-06"] }, "time": { "type": ["string", "null"], "description": "Local birth time, HH:mm, 24-hour. null when unknown: the chart is computed for noon and everything that depends on the time is withheld.", "examples": ["18:30"] }, "latitude": { "type": "number", "minimum": -90, "maximum": 90, "examples": [50.4501] }, "longitude": { "type": "number", "minimum": -180, "maximum": 180, "examples": [30.5234] }, "timezone": { "type": "string", "description": "IANA time zone. Leave it out to resolve it from the coordinates; historical daylight-saving rules are applied to the date.", "examples": ["Europe/Kyiv"] } }, "x-ref": "#/components/schemas/Birth", "key$": "birth" } }, "index$": 1 } } } }, "parameters": [] }, "POST /v1/chart/full": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["birth"], "properties": { "birth": { "type": "object", "required": ["date", "latitude", "longitude"], "properties": { "date": { "type": "string", "format": "date", "description": "Birth date, YYYY-MM-DD, 1800 to 2399.", "examples": ["1991-09-06"] }, "time": { "type": ["string", "null"], "description": "Local birth time, HH:mm, 24-hour. null when unknown: the chart is computed for noon and everything that depends on the time is withheld.", "examples": ["18:30"] }, "latitude": { "type": "number", "minimum": -90, "maximum": 90, "examples": [50.4501] }, "longitude": { "type": "number", "minimum": -180, "maximum": 180, "examples": [30.5234] }, "timezone": { "type": "string", "description": "IANA time zone. Leave it out to resolve it from the coordinates; historical daylight-saving rules are applied to the date.", "examples": ["Europe/Kyiv"] } }, "x-ref": "#/components/schemas/Birth", "key$": "birth" } }, "index$": 1 } } } }, "parameters": [] }, "POST /v1/chart/houses": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["birth"], "properties": { "birth": { "type": "object", "required": ["date", "latitude", "longitude"], "properties": { "date": { "type": "string", "format": "date", "description": "Birth date, YYYY-MM-DD, 1800 to 2399.", "examples": ["1991-09-06"] }, "time": { "type": ["string", "null"], "description": "Local birth time, HH:mm, 24-hour. null when unknown: the chart is computed for noon and everything that depends on the time is withheld.", "examples": ["18:30"] }, "latitude": { "type": "number", "minimum": -90, "maximum": 90, "examples": [50.4501] }, "longitude": { "type": "number", "minimum": -180, "maximum": 180, "examples": [30.5234] }, "timezone": { "type": "string", "description": "IANA time zone. Leave it out to resolve it from the coordinates; historical daylight-saving rules are applied to the date.", "examples": ["Europe/Kyiv"] } }, "x-ref": "#/components/schemas/Birth", "key$": "birth" } }, "index$": 1 } } } }, "parameters": [] }, "POST /v1/chart/planets": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["birth"], "properties": { "birth": { "type": "object", "required": ["date", "latitude", "longitude"], "properties": { "date": { "type": "string", "format": "date", "description": "Birth date, YYYY-MM-DD, 1800 to 2399.", "examples": ["1991-09-06"] }, "time": { "type": ["string", "null"], "description": "Local birth time, HH:mm, 24-hour. null when unknown: the chart is computed for noon and everything that depends on the time is withheld.", "examples": ["18:30"] }, "latitude": { "type": "number", "minimum": -90, "maximum": 90, "examples": [50.4501] }, "longitude": { "type": "number", "minimum": -180, "maximum": 180, "examples": [30.5234] }, "timezone": { "type": "string", "description": "IANA time zone. Leave it out to resolve it from the coordinates; historical daylight-saving rules are applied to the date.", "examples": ["Europe/Kyiv"] } }, "x-ref": "#/components/schemas/Birth", "key$": "birth" } }, "index$": 1 } } } }, "parameters": [] }, "POST /v1/chart/short": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["birth"], "properties": { "birth": { "type": "object", "required": ["date", "latitude", "longitude"], "properties": { "date": { "type": "string", "format": "date", "description": "Birth date, YYYY-MM-DD, 1800 to 2399.", "examples": ["1991-09-06"] }, "time": { "type": ["string", "null"], "description": "Local birth time, HH:mm, 24-hour. null when unknown: the chart is computed for noon and everything that depends on the time is withheld.", "examples": ["18:30"] }, "latitude": { "type": "number", "minimum": -90, "maximum": 90, "examples": [50.4501] }, "longitude": { "type": "number", "minimum": -180, "maximum": 180, "examples": [30.5234] }, "timezone": { "type": "string", "description": "IANA time zone. Leave it out to resolve it from the coordinates; historical daylight-saving rules are applied to the date.", "examples": ["Europe/Kyiv"] } }, "x-ref": "#/components/schemas/Birth", "key$": "birth" } }, "index$": 1 } } } }, "parameters": [] }, "POST /v1/horoscope/daily": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": [], "properties": { "birth": { "type": "object", "required": ["date", "latitude", "longitude"], "properties": { "date": { "type": "string", "format": "date", "description": "Birth date, YYYY-MM-DD, 1800 to 2399.", "examples": ["1991-09-06"] }, "time": { "type": ["string", "null"], "description": "Local birth time, HH:mm, 24-hour. null when unknown: the chart is computed for noon and everything that depends on the time is withheld.", "examples": ["18:30"] }, "latitude": { "type": "number", "minimum": -90, "maximum": 90, "examples": [50.4501] }, "longitude": { "type": "number", "minimum": -180, "maximum": 180, "examples": [30.5234] }, "timezone": { "type": "string", "description": "IANA time zone. Leave it out to resolve it from the coordinates; historical daylight-saving rules are applied to the date.", "examples": ["Europe/Kyiv"] } }, "x-ref": "#/components/schemas/Birth", "key$": "birth" }, "date": { "type": "string", "format": "date", "description": "The day to compute, today (UTC) by default.", "key$": "date" } }, "index$": 1 } } } }, "parameters": [] }, "GET /v1/sky": { "protocol": "http", "parameters": [{ "name": "date", "in": "query", "required": false, "schema": { "type": "string", "format": "date" }, "index$": 0 }] }, "GET /v1/usage": { "protocol": "http", "parameters": [] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "free_and_pro.create.0": "GET-only live run: needs POST /v1/chart/angles" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const free_and_pro_ref01_ent = client.FreeAndPro();
        let free_and_pro_ref01_data = setup.data.new.free_and_pro['free_and_pro_ref01'];
        free_and_pro_ref01_data = (await free_and_pro_ref01_ent.create(free_and_pro_ref01_data)).data();
        (0, node_assert_1.default)(null != free_and_pro_ref01_data);
        // LOAD
        const free_and_pro_ref01_match_dt0 = {};
        const free_and_pro_ref01_data_dt0 = (await free_and_pro_ref01_ent.load(free_and_pro_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != free_and_pro_ref01_data_dt0);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/free_and_pro/FreeAndProTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.NatalchartSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['free_and_pro01', 'free_and_pro02', 'free_and_pro03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'NATALCHART_TEST_FREE_AND_PRO_ENTID': idmap,
        'NATALCHART_TEST_LIVE': 'FALSE',
        'NATALCHART_TEST_EXPLAIN': 'FALSE',
        'NATALCHART_APIKEY': '',
    });
    idmap = env['NATALCHART_TEST_FREE_AND_PRO_ENTID'];
    const live = 'TRUE' === env.NATALCHART_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['NATALCHART_TEST_FREE_AND_PRO_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.NatalchartSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.NATALCHART_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.NATALCHART_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=FreeAndProEntity.test.js.map