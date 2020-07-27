import { getRandomString } from '../src';

describe('test getRandomString', () => {
  const result = getRandomString();
  it('should make componentB as Anonymous', () => {
    expect(result.length).toBe(16);
    expect(typeof result).toBe('string');
  });
});
