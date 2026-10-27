# Natalchart SDK utility: prepare_body
require_relative 'media'
module NatalchartUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return NatalchartUtilities.raw_body(ctx.reqdata) if NatalchartUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
