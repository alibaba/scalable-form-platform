import { formatDate } from '../src';

describe('formatDate should return correct result', () => {
  it('format ts', () => {
    const result = formatDate(0, 'yyyy-MM-DD hh:mm:ss');
    expect(result).toEqual('1970-01-01 12:00:00');
  });
  it('format string', () => {
    const result = formatDate('1970-01-01 12:00:00', 'yyyy-MM-DD hh:mm:ss');
    expect(result).toEqual('1970-01-01 12:00:00');
  });
  it('format date', () => {
    const result = formatDate(new Date(0), 'yyyy-MM-DD hh:mm:ss');
    expect(result).toEqual('1970-01-01 12:00:00');
  });
  it('format date with default style', () => {
    const result = formatDate(new Date(0));
    expect(result).toEqual('1970-01-01 12:00:00');
  });
  it('format null', () => {
    const result = formatDate(null);
    expect(result).toEqual('');
  });
  it('format undefined', () => {
    const result = formatDate(undefined);
    expect(result).toEqual('');
  });
});
