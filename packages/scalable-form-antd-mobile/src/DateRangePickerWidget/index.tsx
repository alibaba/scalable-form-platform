import React, { useCallback, useEffect } from 'react';
import { DatePicker, List } from 'antd-mobile';
import classNames from 'classnames';
import { WidgetProps } from 'scalable-form-core';
import moment from 'moment';
import { DateRange, getMomentsByDateRange, isDateRange, formatDate, useGetMessage } from 'scalable-form-tools';
import './index.less';

const ListItem = List.Item;
const DATE_FORMAT = 'YYYY-MM-DD';

/**
 * 日期范围选择器，ui:options
 */
interface DateRangePickerOptions {
  /**
   * 初始化默认值
   */
  initRange?: DateRange;
}

type DateRangePickerWidgetProps = WidgetProps<string[], DateRangePickerOptions>;

/**
 * 日期范围选择器
 * @param {DateRangePickerWidgetProps} props
 * @returns {any}
 * @constructor
 */
const DateRangePickerWidget: React.FC<DateRangePickerWidgetProps> = (props: DateRangePickerWidgetProps) => {
  const { options, schema, required, value, disabled, onChange } = props;
  const { initRange } = options;
  useEffect(() => {
    if (isDateRange(initRange)) {
      const defaultRange: [moment.Moment, moment.Moment] = getMomentsByDateRange(initRange);
      const dateString = [defaultRange[0].format(DATE_FORMAT), defaultRange[1].format(DATE_FORMAT)];
      onChange(dateString);
    }
  }, [initRange, onChange]);
  const placeholder = [
    useGetMessage('xformDefaultStartDatePlaceholder'),
    useGetMessage('xformDefaultEndDatePlaceholder'),
  ];
  let startDate: Date = new Date();
  let endDate: Date = new Date();
  if (value && value.length > 0) {
    if (typeof value[0] !== 'undefined') {
      startDate = moment(value[0], DATE_FORMAT).toDate();
    }
    if (typeof value[1] !== 'undefined') {
      endDate = moment(value[1], DATE_FORMAT).toDate();
    }
  }
  const handleDateChanged = useCallback(
    (dateValue: Date) => {
      const rangeValue = (value || ['', '']).slice();
      rangeValue[1] = formatDate(dateValue, 'yyyy-MM-dd');
      onChange(rangeValue);
    },
    [value, onChange],
  );
  return (
    <div
      className={classNames({
        'scalable-form-widget': true,
        'scalable-form-date-range-picker': true,
        disabled,
      })}
    >
      <div className="date-range-picker-wrapper">
        <DatePicker
          mode="date"
          format={DATE_FORMAT}
          value={startDate}
          disabled={disabled}
          onChange={handleDateChanged}
          extra={placeholder[0]}
        >
          <ListItem arrow="horizontal" wrap multipleLine>
            <label
              className={classNames({
                required,
              })}
            >
              {schema.title}
            </label>
          </ListItem>
        </DatePicker>
        <DatePicker
          mode="date"
          format={DATE_FORMAT}
          value={endDate}
          disabled={disabled}
          onChange={handleDateChanged}
          extra={placeholder[1]}
        >
          <ListItem arrow="horizontal" wrap multipleLine>
            <label
              className={classNames({
                required,
              })}
            >
              {schema.title}
            </label>
          </ListItem>
        </DatePicker>
      </div>
    </div>
  );
};

DateRangePickerWidget.displayName = 'DateRangePickerWidget';
DateRangePickerWidget.defaultProps = {
  disabled: false,
  value: undefined,
  defaultValue: undefined,
  placeholder: undefined,
  formContext: {},
  onChange: () => {},
  options: {
    initRange: undefined,
  },
};
export default React.memo(DateRangePickerWidget);
