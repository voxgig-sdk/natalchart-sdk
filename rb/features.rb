# Natalchart SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module NatalchartFeatures
  def self.make_feature(name)
    case name
    when "base"
      NatalchartBaseFeature.new
    when "ratelimit"
      NatalchartRatelimitFeature.new
    when "retry"
      NatalchartRetryFeature.new
    when "test"
      NatalchartTestFeature.new
    when "timeout"
      NatalchartTimeoutFeature.new
    else
      NatalchartBaseFeature.new
    end
  end
end
