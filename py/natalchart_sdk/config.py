# Natalchart SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Natalchart",
            "slug": "natalchart",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "now": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.natalchart.ai",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "api_pro": {},
                "free_and_pro": {},
            },
        },
        "entity": {
      "api_pro": {
        "fields": [
          {
            "name": "activity",
            "title": "Activity",
            "type": "`$STRING`",
          },
          {
            "name": "birth",
            "title": "Birth",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "focus",
            "title": "Focus",
            "type": "`$ARRAY`",
          },
          {
            "name": "from",
            "title": "From",
            "type": "`$STRING`",
            "format": "date",
          },
          {
            "name": "limit",
            "title": "Limit",
            "type": "`$INTEGER`",
          },
          {
            "name": "location",
            "title": "Location",
            "type": "`$OBJECT`",
            "req": True,
            "op": {
              "create": {
                "type": "`$OBJECT`",
              },
            },
          },
          {
            "name": "personA",
            "title": "Person A",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "personB",
            "title": "Person B",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "region",
            "title": "Region",
            "type": "`$STRING`",
          },
          {
            "name": "timezone",
            "title": "Timezone",
            "type": "`$STRING`",
            "short": "IANA zone that sets where each day begins.",
          },
          {
            "name": "to",
            "title": "To",
            "type": "`$STRING`",
            "short": "At most 62 days after from; 30 days by default.",
            "format": "date",
          },
          {
            "name": "year",
            "title": "Year",
            "type": "`$INTEGER`",
            "req": True,
          },
        ],
        "name": "api_pro",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/locations/rank",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "locations",
                  },
                  {
                    "lit": "rank",
                  },
                ],
                "parts": [
                  "v1",
                  "locations",
                  "rank",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/locations/score",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "locations",
                  },
                  {
                    "lit": "score",
                  },
                ],
                "parts": [
                  "v1",
                  "locations",
                  "score",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/solar-return",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "solar-return",
                  },
                ],
                "parts": [
                  "v1",
                  "solar-return",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/synastry",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "synastry",
                  },
                ],
                "parts": [
                  "v1",
                  "synastry",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/timing",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "timing",
                  },
                ],
                "parts": [
                  "v1",
                  "timing",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/transits",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "transits",
                  },
                ],
                "parts": [
                  "v1",
                  "transits",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "free_and_pro": {
        "fields": [
          {
            "name": "birth",
            "title": "Birth",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "date",
            "title": "Date",
            "type": "`$STRING`",
            "short": "The day to compute, today (UTC) by default.",
            "format": "date",
          },
        ],
        "name": "free_and_pro",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/chart/angles",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "chart",
                  },
                  {
                    "lit": "angles",
                  },
                ],
                "parts": [
                  "v1",
                  "chart",
                  "angles",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/chart/aspects",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "chart",
                  },
                  {
                    "lit": "aspects",
                  },
                ],
                "parts": [
                  "v1",
                  "chart",
                  "aspects",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/chart/elements",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "chart",
                  },
                  {
                    "lit": "elements",
                  },
                ],
                "parts": [
                  "v1",
                  "chart",
                  "elements",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/chart/fixed-stars",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "chart",
                  },
                  {
                    "lit": "fixed-stars",
                  },
                ],
                "parts": [
                  "v1",
                  "chart",
                  "fixed-stars",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/chart/full",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "chart",
                  },
                  {
                    "lit": "full",
                  },
                ],
                "parts": [
                  "v1",
                  "chart",
                  "full",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/chart/houses",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "chart",
                  },
                  {
                    "lit": "houses",
                  },
                ],
                "parts": [
                  "v1",
                  "chart",
                  "houses",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/chart/planets",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "chart",
                  },
                  {
                    "lit": "planets",
                  },
                ],
                "parts": [
                  "v1",
                  "chart",
                  "planets",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/chart/short",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "chart",
                  },
                  {
                    "lit": "short",
                  },
                ],
                "parts": [
                  "v1",
                  "chart",
                  "short",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/horoscope/daily",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "horoscope",
                  },
                  {
                    "lit": "daily",
                  },
                ],
                "parts": [
                  "v1",
                  "horoscope",
                  "daily",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/sky",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "sky",
                  },
                ],
                "parts": [
                  "v1",
                  "sky",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "date",
                      "orig": "date",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/usage",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "usage",
                  },
                ],
                "parts": [
                  "v1",
                  "usage",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
