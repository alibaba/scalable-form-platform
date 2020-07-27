import { getMomentsByDateRange, isDateRange } from '../src';
import DateRange from '../src/time/DateRange';

describe('isDateRange should return correct result', () => {
  it('beforeweek is true', () => {
    const result = isDateRange('beforeweek');
    expect(result).toBe(true);
  });
  it('beforeweek2 is false', () => {
    const result = isDateRange('beforeweek2');
    expect(result).toBe(false);
  });
  it('empty string is false', () => {
    const result = isDateRange('');
    expect(result).toBe(false);
  });
});

describe('getMomentsByDateRange should return correct result', () => {
  it('AFTER_YEAR diff year is 1', () => {
    const result = getMomentsByDateRange(DateRange.AFTER_YEAR);
    expect(result[1].year() - result[0].year()).toBe(1);
  });
  it('AFTER_MONTH diff year is 1', () => {
    const result = getMomentsByDateRange(DateRange.AFTER_MONTH);
    expect(result[1].month() - result[0].month()).toBe(1);
  });
  it('AFTER_WEEK diff year is 1', () => {
    const result = getMomentsByDateRange(DateRange.AFTER_WEEK);
    expect(result[1].week() - result[0].week()).toBe(1);
  });
  it('BEFORE_YEAR diff year is 1', () => {
    const result = getMomentsByDateRange(DateRange.BEFORE_YEAR);
    expect(result[1].year() - result[0].year()).toBe(1);
  });
  it('BEFORE_MONTH diff year is 1', () => {
    const result = getMomentsByDateRange(DateRange.BEFORE_MONTH);
    expect(result[1].month() - result[0].month()).toBe(1);
  });
  it('BEFORE_WEEK diff year is 1', () => {
    const result = getMomentsByDateRange(DateRange.BEFORE_WEEK);
    expect(result[1].week() - result[0].week()).toBe(1);
  });
  it('default diff is 0', () => {
    const result = getMomentsByDateRange('');
    expect(result[1].week() - result[0].week()).toBe(0);
  });
});
