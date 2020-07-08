import { initData, postData, getData } from '../modules/scoreAPI';

describe('Testing Score API', () => {
  test('It should return the string about the initialization of game', () => {
    initData().then(data => {
      expect(typeof data).to('string');
    });
  });
  test('It should return the string about succesfully posting data', () => {
    postData('Dmitri', 30).then(data => {
      expect(data).toBe('Leaderboard score created correctly.');
    });
  });
  test('It should get the data from the leaderboard', () => {
    getData().then(data => {
      expect(typeof data).toBe('object');
    });
  });
  test('It should return an error', () => {
    postData('Error', '50').then(data => {
      expect(data).toBe('error');
    });
  });
});