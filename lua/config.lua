-- Natalchart SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Natalchart",
      slug = "natalchart",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["now"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://api.natalchart.ai",
      auth = {
        prefix = "Bearer",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["api_pro"] = {},
        ["free_and_pro"] = {},
      },
    },
    entity = {
      ["api_pro"] = {
        ["fields"] = {
          {
            ["name"] = "activity",
            ["title"] = "Activity",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "birth",
            ["title"] = "Birth",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "focus",
            ["title"] = "Focus",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "from",
            ["title"] = "From",
            ["type"] = "`$STRING`",
            ["format"] = "date",
          },
          {
            ["name"] = "limit",
            ["title"] = "Limit",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "location",
            ["title"] = "Location",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["op"] = {
              ["create"] = {
                ["type"] = "`$OBJECT`",
              },
            },
          },
          {
            ["name"] = "personA",
            ["title"] = "Person A",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "personB",
            ["title"] = "Person B",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "region",
            ["title"] = "Region",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "timezone",
            ["title"] = "Timezone",
            ["type"] = "`$STRING`",
            ["short"] = "IANA zone that sets where each day begins.",
          },
          {
            ["name"] = "to",
            ["title"] = "To",
            ["type"] = "`$STRING`",
            ["short"] = "At most 62 days after from; 30 days by default.",
            ["format"] = "date",
          },
          {
            ["name"] = "year",
            ["title"] = "Year",
            ["type"] = "`$INTEGER`",
            ["req"] = true,
          },
        },
        ["name"] = "api_pro",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/v1/locations/rank",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "locations",
                  },
                  {
                    ["lit"] = "rank",
                  },
                },
                ["parts"] = {
                  "v1",
                  "locations",
                  "rank",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/v1/locations/score",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "locations",
                  },
                  {
                    ["lit"] = "score",
                  },
                },
                ["parts"] = {
                  "v1",
                  "locations",
                  "score",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/v1/solar-return",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "solar-return",
                  },
                },
                ["parts"] = {
                  "v1",
                  "solar-return",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/v1/synastry",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "synastry",
                  },
                },
                ["parts"] = {
                  "v1",
                  "synastry",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/v1/timing",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "timing",
                  },
                },
                ["parts"] = {
                  "v1",
                  "timing",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/v1/transits",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "transits",
                  },
                },
                ["parts"] = {
                  "v1",
                  "transits",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["free_and_pro"] = {
        ["fields"] = {
          {
            ["name"] = "birth",
            ["title"] = "Birth",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "date",
            ["title"] = "Date",
            ["type"] = "`$STRING`",
            ["short"] = "The day to compute, today (UTC) by default.",
            ["format"] = "date",
          },
        },
        ["name"] = "free_and_pro",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/v1/chart/angles",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "chart",
                  },
                  {
                    ["lit"] = "angles",
                  },
                },
                ["parts"] = {
                  "v1",
                  "chart",
                  "angles",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/v1/chart/aspects",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "chart",
                  },
                  {
                    ["lit"] = "aspects",
                  },
                },
                ["parts"] = {
                  "v1",
                  "chart",
                  "aspects",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/v1/chart/elements",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "chart",
                  },
                  {
                    ["lit"] = "elements",
                  },
                },
                ["parts"] = {
                  "v1",
                  "chart",
                  "elements",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/v1/chart/fixed-stars",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "chart",
                  },
                  {
                    ["lit"] = "fixed-stars",
                  },
                },
                ["parts"] = {
                  "v1",
                  "chart",
                  "fixed-stars",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/v1/chart/full",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "chart",
                  },
                  {
                    ["lit"] = "full",
                  },
                },
                ["parts"] = {
                  "v1",
                  "chart",
                  "full",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/v1/chart/houses",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "chart",
                  },
                  {
                    ["lit"] = "houses",
                  },
                },
                ["parts"] = {
                  "v1",
                  "chart",
                  "houses",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/v1/chart/planets",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "chart",
                  },
                  {
                    ["lit"] = "planets",
                  },
                },
                ["parts"] = {
                  "v1",
                  "chart",
                  "planets",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/v1/chart/short",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "chart",
                  },
                  {
                    ["lit"] = "short",
                  },
                },
                ["parts"] = {
                  "v1",
                  "chart",
                  "short",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/v1/horoscope/daily",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "horoscope",
                  },
                  {
                    ["lit"] = "daily",
                  },
                },
                ["parts"] = {
                  "v1",
                  "horoscope",
                  "daily",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/sky",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "sky",
                  },
                },
                ["parts"] = {
                  "v1",
                  "sky",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "date",
                      ["orig"] = "date",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["field"] = true,
                    },
                  },
                },
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/usage",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "usage",
                  },
                },
                ["parts"] = {
                  "v1",
                  "usage",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
