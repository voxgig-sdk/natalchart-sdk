# Natalchart SDK exists test

import pytest
from natalchart_sdk import NatalchartSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = NatalchartSDK.test(None, None)
        assert testsdk is not None
