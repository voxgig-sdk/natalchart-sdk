
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { NatalchartSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = NatalchartSDK.test()
    equal(testsdk instanceof NatalchartSDK, true,
      'NatalchartSDK.test() must return a client synchronously')
  })

})
