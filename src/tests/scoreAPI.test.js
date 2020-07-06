const { initData } = require("./__mocks__/mockScoreAPI")

import { initData, postData, getData } from './__mocks__/mockScoreAPI';

describe('Testing Score API', () => {
  test('Should return an object', done => {
    try {
      expect(typeof initData()).toBe('object')
    } catch (err) {
      return err;
    }
    done();
  })

  test('Should post data')
})