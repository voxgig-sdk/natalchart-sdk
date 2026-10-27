

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { NatalchartSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ApiProEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NATALCHART_TEST_LIVE=TRUE.
  afterEach(liveDelay('NATALCHART_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NatalchartSDK.test()
    const ent = testsdk.ApiPro()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = NatalchartSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiPro().create({"activity":1,"birth":"x","personA":"x","personB":"x","year":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NATALCHART_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_pro.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"activity":{"a":true,"h":"Activity","n":"activity","r":false,"t":"`$STRING`","key$":"activity","index$":0},"birth":{"a":true,"h":"Birth","n":"birth","r":true,"t":"`$OBJECT`","key$":"birth","index$":1},"focus":{"a":true,"h":"Focus","n":"focus","r":false,"t":"`$ARRAY`","key$":"focus","index$":2},"from":{"a":true,"fo":"date","h":"From","n":"from","r":false,"t":"`$STRING`","key$":"from","index$":3},"limit":{"a":true,"h":"Limit","n":"limit","r":false,"t":"`$INTEGER`","key$":"limit","index$":4},"location":{"a":true,"h":"Location","n":"location","op":{"create":{"req":false,"type":"`$OBJECT`"}},"r":true,"t":"`$OBJECT`","key$":"location","index$":5},"personA":{"a":true,"h":"Person A","n":"personA","r":true,"t":"`$OBJECT`","key$":"personA","index$":6},"personB":{"a":true,"h":"Person B","n":"personB","r":true,"t":"`$OBJECT`","key$":"personB","index$":7},"region":{"a":true,"h":"Region","n":"region","r":false,"t":"`$STRING`","key$":"region","index$":8},"timezone":{"a":true,"h":"Timezone","n":"timezone","r":false,"sh":"IANA zone that sets where each day begins.","t":"`$STRING`","key$":"timezone","index$":9},"to":{"a":true,"fo":"date","h":"To","n":"to","r":false,"sh":"At most 62 days after from; 30 days by default.","t":"`$STRING`","key$":"to","index$":10},"year":{"a":true,"h":"Year","n":"year","r":true,"t":"`$INTEGER`","key$":"year","index$":11}},"name":"api_pro","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["birth","focus","limit","region"],"co":{"id":"POST /v1/locations/rank","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/locations/rank","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"locations"},{"lit":"rank"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["birth","location"],"co":{"id":"POST /v1/locations/score","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/locations/score","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"locations"},{"lit":"score"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":["birth","location","year"],"co":{"id":"POST /v1/solar-return","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/solar-return","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"solar-return"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"bf":["personA","personB"],"co":{"id":"POST /v1/synastry","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/synastry","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"synastry"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3},{"a":true,"bf":["activity","birth","from","timezone","to"],"co":{"id":"POST /v1/timing","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/timing","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"timing"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":4},{"a":true,"bf":["birth","from","to"],"co":{"id":"POST /v1/transits","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/transits","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"transits"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":5}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"api_pro","name__orig":"api_pro","Name":"ApiPro","name_":"api_pro","name-":"api-pro","NAME":"API_PRO","index$":0}, {"active":true,"entity":"api_pro","key$":"BasicApiProFlow","kind":"basic","name":"BasicApiProFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"api_pro_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'ApiPro', {"POST /v1/locations/rank":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["birth"],"properties":{"birth":{"type":"object","required":["date","latitude","longitude"],"properties":{"date":{"type":"string","format":"date","description":"Birth date, YYYY-MM-DD, 1800 to 2399.","examples":["1991-09-06"]},"time":{"type":["string","null"],"description":"Local birth time, HH:mm, 24-hour. null when unknown: the chart is computed for noon and everything that depends on the time is withheld.","examples":["18:30"]},"latitude":{"type":"number","minimum":-90,"maximum":90,"examples":[50.4501]},"longitude":{"type":"number","minimum":-180,"maximum":180,"examples":[30.5234]},"timezone":{"type":"string","description":"IANA time zone. Leave it out to resolve it from the coordinates; historical daylight-saving rules are applied to the date.","examples":["Europe/Kyiv"]}},"x-ref":"#/components/schemas/Birth","key$":"birth"},"focus":{"type":"array","items":{"type":"string","enum":["identity","love","body","money","home","mind"]},"key$":"focus"},"region":{"type":"string","enum":["Europe","North America","Latin America","Middle East & Africa","Asia","Oceania"],"key$":"region"},"limit":{"type":"integer","minimum":3,"maximum":12,"key$":"limit"}},"index$":1}}}},"parameters":[]},"POST /v1/locations/score":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["birth","location"],"properties":{"birth":{"type":"object","required":["date","latitude","longitude"],"properties":{"date":{"type":"string","format":"date","description":"Birth date, YYYY-MM-DD, 1800 to 2399.","examples":["1991-09-06"]},"time":{"type":["string","null"],"description":"Local birth time, HH:mm, 24-hour. null when unknown: the chart is computed for noon and everything that depends on the time is withheld.","examples":["18:30"]},"latitude":{"type":"number","minimum":-90,"maximum":90,"examples":[50.4501]},"longitude":{"type":"number","minimum":-180,"maximum":180,"examples":[30.5234]},"timezone":{"type":"string","description":"IANA time zone. Leave it out to resolve it from the coordinates; historical daylight-saving rules are applied to the date.","examples":["Europe/Kyiv"]}},"x-ref":"#/components/schemas/Birth","key$":"birth"},"location":{"type":"object","required":["latitude","longitude"],"properties":{"latitude":{"type":"number"},"longitude":{"type":"number"},"name":{"type":"string"}},"key$":"location"}},"index$":1}}}},"parameters":[]},"POST /v1/solar-return":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["birth","year"],"properties":{"birth":{"type":"object","required":["date","latitude","longitude"],"properties":{"date":{"type":"string","format":"date","description":"Birth date, YYYY-MM-DD, 1800 to 2399.","examples":["1991-09-06"]},"time":{"type":["string","null"],"description":"Local birth time, HH:mm, 24-hour. null when unknown: the chart is computed for noon and everything that depends on the time is withheld.","examples":["18:30"]},"latitude":{"type":"number","minimum":-90,"maximum":90,"examples":[50.4501]},"longitude":{"type":"number","minimum":-180,"maximum":180,"examples":[30.5234]},"timezone":{"type":"string","description":"IANA time zone. Leave it out to resolve it from the coordinates; historical daylight-saving rules are applied to the date.","examples":["Europe/Kyiv"]}},"x-ref":"#/components/schemas/Birth","key$":"birth"},"year":{"type":"integer","minimum":1900,"maximum":2100,"key$":"year"},"location":{"type":"object","properties":{"latitude":{"type":"number"},"longitude":{"type":"number"}},"key$":"location"}},"index$":1}}}},"parameters":[]},"POST /v1/synastry":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["personA","personB"],"properties":{"personA":{"type":"object","required":["date","latitude","longitude"],"properties":{"date":{"type":"string","format":"date","description":"Birth date, YYYY-MM-DD, 1800 to 2399.","examples":["1991-09-06"]},"time":{"type":["string","null"],"description":"Local birth time, HH:mm, 24-hour. null when unknown: the chart is computed for noon and everything that depends on the time is withheld.","examples":["18:30"]},"latitude":{"type":"number","minimum":-90,"maximum":90,"examples":[50.4501]},"longitude":{"type":"number","minimum":-180,"maximum":180,"examples":[30.5234]},"timezone":{"type":"string","description":"IANA time zone. Leave it out to resolve it from the coordinates; historical daylight-saving rules are applied to the date.","examples":["Europe/Kyiv"]}},"x-ref":"#/components/schemas/Birth","key$":"personA"},"personB":{"type":"object","required":["date","latitude","longitude"],"properties":{"date":{"type":"string","format":"date","description":"Birth date, YYYY-MM-DD, 1800 to 2399.","examples":["1991-09-06"]},"time":{"type":["string","null"],"description":"Local birth time, HH:mm, 24-hour. null when unknown: the chart is computed for noon and everything that depends on the time is withheld.","examples":["18:30"]},"latitude":{"type":"number","minimum":-90,"maximum":90,"examples":[50.4501]},"longitude":{"type":"number","minimum":-180,"maximum":180,"examples":[30.5234]},"timezone":{"type":"string","description":"IANA time zone. Leave it out to resolve it from the coordinates; historical daylight-saving rules are applied to the date.","examples":["Europe/Kyiv"]}},"x-ref":"#/components/schemas/Birth","key$":"personB"}},"index$":1}}}},"parameters":[]},"POST /v1/timing":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["birth"],"properties":{"birth":{"type":"object","required":["date","latitude","longitude"],"properties":{"date":{"type":"string","format":"date","description":"Birth date, YYYY-MM-DD, 1800 to 2399.","examples":["1991-09-06"]},"time":{"type":["string","null"],"description":"Local birth time, HH:mm, 24-hour. null when unknown: the chart is computed for noon and everything that depends on the time is withheld.","examples":["18:30"]},"latitude":{"type":"number","minimum":-90,"maximum":90,"examples":[50.4501]},"longitude":{"type":"number","minimum":-180,"maximum":180,"examples":[30.5234]},"timezone":{"type":"string","description":"IANA time zone. Leave it out to resolve it from the coordinates; historical daylight-saving rules are applied to the date.","examples":["Europe/Kyiv"]}},"x-ref":"#/components/schemas/Birth","key$":"birth"},"activity":{"type":"string","enum":["general","business","romance","health","creative","travel","home","clarity"],"key$":"activity"},"from":{"type":"string","format":"date","key$":"from"},"to":{"type":"string","format":"date","description":"At most 62 days after from; 30 days by default.","key$":"to"},"timezone":{"type":"string","description":"IANA zone that sets where each day begins. UTC by default.","key$":"timezone"}},"index$":1}}}},"parameters":[]},"POST /v1/transits":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["birth"],"properties":{"birth":{"type":"object","required":["date","latitude","longitude"],"properties":{"date":{"type":"string","format":"date","description":"Birth date, YYYY-MM-DD, 1800 to 2399.","examples":["1991-09-06"]},"time":{"type":["string","null"],"description":"Local birth time, HH:mm, 24-hour. null when unknown: the chart is computed for noon and everything that depends on the time is withheld.","examples":["18:30"]},"latitude":{"type":"number","minimum":-90,"maximum":90,"examples":[50.4501]},"longitude":{"type":"number","minimum":-180,"maximum":180,"examples":[30.5234]},"timezone":{"type":"string","description":"IANA time zone. Leave it out to resolve it from the coordinates; historical daylight-saving rules are applied to the date.","examples":["Europe/Kyiv"]}},"x-ref":"#/components/schemas/Birth","key$":"birth"},"from":{"type":"string","format":"date","key$":"from"},"to":{"type":"string","format":"date","description":"At most 92 days after from; 30 days by default.","key$":"to"}},"index$":1}}}},"parameters":[]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"api_pro.create.0":"GET-only live run: needs POST /v1/locations/rank"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const api_pro_ref01_ent = client.ApiPro()
    let api_pro_ref01_data = setup.data.new.api_pro['api_pro_ref01']

    api_pro_ref01_data = (await api_pro_ref01_ent.create(api_pro_ref01_data)).data()
    assert(null != api_pro_ref01_data)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/api_pro/ApiProTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = NatalchartSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['api_pro01','api_pro02','api_pro03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NATALCHART_TEST_API_PRO_ENTID': idmap,
    'NATALCHART_TEST_LIVE': 'FALSE',
    'NATALCHART_TEST_EXPLAIN': 'FALSE',
    'NATALCHART_APIKEY': '',
  })

  idmap = env['NATALCHART_TEST_API_PRO_ENTID']

  const live = 'TRUE' === env.NATALCHART_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NATALCHART_TEST_API_PRO_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new NatalchartSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
