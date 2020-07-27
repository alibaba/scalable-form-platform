import moment from 'moment';
import DateRange from './DateRange';

/**
 * 根据DateRange获得时间范围
 * @param {DateRange | string} dateRange
 * @returns {[moment.Moment, moment.Moment]}
 */
export function getMomentsByDateRange(dateRange: DateRange | string | undefined): [moment.Moment, moment.Moment] {
  switch (dateRange) {
    case DateRange.BEFORE_WEEK:
      return [moment().subtract(7, 'days'), moment()];
    case DateRange.BEFORE_MONTH:
      return [moment().subtract(1, 'months'), moment()];
    case DateRange.BEFORE_YEAR:
      return [moment().subtract(1, 'years'), moment()];
    case DateRange.AFTER_WEEK:
      return [moment(), moment().add(7, 'days')];
    case DateRange.AFTER_MONTH:
      return [moment(), moment().add(1, 'months')];
    case DateRange.AFTER_YEAR:
      return [moment(), moment().add(1, 'years')];
    default:
      return [moment(), moment()];
  }
}

/**
 * string dateRange是否在DateRange枚举中
 * @param {string} dateRange
 * @returns {dateRange is DateRange}
 */
export function isDateRange(dateRange: string | undefined): dateRange is DateRange {
  switch (dateRange) {
    case DateRange.BEFORE_WEEK:
    case DateRange.BEFORE_MONTH:
    case DateRange.BEFORE_YEAR:
    case DateRange.AFTER_WEEK:
    case DateRange.AFTER_MONTH:
    case DateRange.AFTER_YEAR:
      return true;
    default:
      return false;
  }
}
