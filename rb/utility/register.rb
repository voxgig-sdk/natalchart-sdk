# Natalchart SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

NatalchartUtility.registrar = ->(u) {
  u.clean = NatalchartUtilities::Clean
  u.clean_add = NatalchartUtilities::CleanAdd
  u.clean_explain = NatalchartUtilities::CleanExplain
  u.done = NatalchartUtilities::Done
  u.make_error = NatalchartUtilities::MakeError
  u.feature_add = NatalchartUtilities::FeatureAdd
  u.feature_hook = NatalchartUtilities::FeatureHook
  u.feature_init = NatalchartUtilities::FeatureInit
  u.fetcher = NatalchartUtilities::Fetcher
  u.make_fetch_def = NatalchartUtilities::MakeFetchDef
  u.make_context = NatalchartUtilities::MakeContext
  u.make_options = NatalchartUtilities::MakeOptions
  u.make_request = NatalchartUtilities::MakeRequest
  u.make_response = NatalchartUtilities::MakeResponse
  u.make_result = NatalchartUtilities::MakeResult
  u.make_point = NatalchartUtilities::MakePoint
  u.make_spec = NatalchartUtilities::MakeSpec
  u.make_url = NatalchartUtilities::MakeUrl
  u.param = NatalchartUtilities::Param
  u.prepare_auth = NatalchartUtilities::PrepareAuth
  u.prepare_body = NatalchartUtilities::PrepareBody
  u.prepare_headers = NatalchartUtilities::PrepareHeaders
  u.prepare_method = NatalchartUtilities::PrepareMethod
  u.prepare_params = NatalchartUtilities::PrepareParams
  u.prepare_path = NatalchartUtilities::PreparePath
  u.prepare_query = NatalchartUtilities::PrepareQuery
  u.graphql_body = NatalchartUtilities::GraphqlBody
  u.graphql_errors = NatalchartUtilities::GraphqlErrors
  u.result_basic = NatalchartUtilities::ResultBasic
  u.result_body = NatalchartUtilities::ResultBody
  u.result_headers = NatalchartUtilities::ResultHeaders
  u.transform_request = NatalchartUtilities::TransformRequest
  u.transform_response = NatalchartUtilities::TransformResponse
}
