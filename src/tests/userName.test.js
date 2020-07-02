import { getName, setName } from '../models/userName';

describe('Tests for getting and setting user name', () => {
  test('It should set name Dan', () => {
    expect(setName('Dan')).toBe('Dan');
  });
  test('It should return name Dan ', () => {
    expect(getName()).toBe('Dan');
  });
});