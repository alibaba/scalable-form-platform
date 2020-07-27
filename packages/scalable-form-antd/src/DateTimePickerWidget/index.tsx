/**
 * @file DateTimePicker 带时间的日期选择类型
 * @description 使用 DatePicker 实现, 强制指定 options.picker 'date-time', options.showTime ture
 */

import React from 'react';
import cls from 'classnames';

import DatePickerWidget, { DatePickerWidgetProps, DatePickerWidgetOptions } from '../DatePickerWidget';

const DateTimePickerWidget: React.FC<DatePickerWidgetProps> = (props) => {
  const { options, className, ...restProps } = props;
  const realOptions: DatePickerWidgetOptions = {
    ...options,
    showTime: true,
    picker: 'date-time',
  };

  const clsn = cls('xform-custom-datetimepicker', className);
  return <DatePickerWidget {...restProps} options={realOptions} className={clsn} />;
};

DateTimePickerWidget.displayName = 'DateTimePickerWidget';
DateTimePickerWidget.defaultProps = {
  disabled: false,
  value: undefined,
  defaultValue: undefined,
  placeholder: undefined,
  formContext: {},
  onChange: () => {},
  options: {},
};
export default React.memo(DateTimePickerWidget);
