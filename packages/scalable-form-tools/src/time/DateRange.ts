/**
 * 时间范围枚举，用于支持一周前beforeweek等时间范围描述
 */
enum DateRange {
  BEFORE_WEEK = 'beforeweek',
  BEFORE_MONTH = 'beforemonth',
  BEFORE_YEAR = 'beforeyear',
  AFTER_WEEK = 'afterweek',
  AFTER_MONTH = 'aftermonth',
  AFTER_YEAR = 'afteryear',
}

export default DateRange;
