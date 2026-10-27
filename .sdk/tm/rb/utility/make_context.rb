# Natalchart SDK utility: make_context
require_relative '../core/context'
module NatalchartUtilities
  MakeContext = ->(ctxmap, basectx) {
    NatalchartContext.new(ctxmap, basectx)
  }
end
