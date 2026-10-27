# Natalchart SDK exists test

require "minitest/autorun"
require_relative "../Natalchart_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = NatalchartSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
