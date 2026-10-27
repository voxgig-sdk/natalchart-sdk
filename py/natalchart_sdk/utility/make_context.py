# Natalchart SDK utility: make_context

from natalchart_sdk.core.context import NatalchartContext


def make_context_util(ctxmap, basectx):
    return NatalchartContext(ctxmap, basectx)
