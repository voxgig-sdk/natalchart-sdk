# Natalchart SDK feature factory

from natalchart_sdk.feature.base_feature import NatalchartBaseFeature
from natalchart_sdk.feature.ratelimit_feature import NatalchartRatelimitFeature
from natalchart_sdk.feature.retry_feature import NatalchartRetryFeature
from natalchart_sdk.feature.test_feature import NatalchartTestFeature
from natalchart_sdk.feature.timeout_feature import NatalchartTimeoutFeature


_FEATURES = {
    "base": lambda: NatalchartBaseFeature(),
    "ratelimit": lambda: NatalchartRatelimitFeature(),
    "retry": lambda: NatalchartRetryFeature(),
    "test": lambda: NatalchartTestFeature(),
    "timeout": lambda: NatalchartTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
