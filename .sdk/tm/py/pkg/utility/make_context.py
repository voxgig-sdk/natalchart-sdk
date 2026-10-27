# Natalchart SDK utility: make_context

from projectname_sdk.core.context import NatalchartContext


def make_context_util(ctxmap, basectx):
    return NatalchartContext(ctxmap, basectx)
