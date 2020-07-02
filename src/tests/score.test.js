import { incScore, getScore, resetScore } from '../models/score';

describe('Tests for scoring', () => {
  test('It should increment score', () => {
    expect(incScore(20)).toBe('20');
  });
  test('It should return score 20', () => {
    expect(getScore()).toBe(20);
  });
  test('It should set the score to zero', () => {
    expect(resetScore()).toBe('0');
  });
});