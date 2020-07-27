/**
 * @file DateRangePicker 日期范围选择器
 * @description 默认格式化 YYYY-MM-DD
 */

import React, { memo, useMemo, useCallback } from 'react';
import cls from 'classnames';
import { DatePicker } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import { WidgetProps } from 'scalable-form-core';
import moment, { Moment } from 'moment';
import { useLogWidgetPV, DateRange, getMomentsByDateRange } from 'scalable-form-tools';

import './index.less';
import { BaseFormContext } from '../types';

/* eslint-disable @typescript-eslint/indent */
// https://github.com/typescript-eslint/typescript-eslint/issues/1824
export type DateRangePickerWidgetOptions = Pick<
  RangePickerProps,
  | 'allowClear'
  | 'autoFocus'
  | 'className'
  | 'dropdownClassName'
  | 'getPopupContainer'
  | 'locale'
  | 'popupStyle'
  | 'size'
  | 'bordered'
  | 'suffixIcon'
  | 'style'
  | 'format'
  | 'separator'
> & {
  initRange?: DateRange;
};
/* eslint-enable @typescript-eslint/indent */
export type DateRangePickerWidgetProps = WidgetProps<[string, string], DateRangePickerWidgetOptions, BaseFormContext>;

const DATE_FORMAT = 'YYYY-MM-DD';
const { RangePicker } = DatePicker;

const DateRangePickerWidget: React.FC<DateRangePickerWidgetProps> = (props) => {
  const { className, value, disabled, placeholder, onChange, options, formContext, autofocus } = props;
  const { initRange, getPopupContainer, format, ...restOptions } = options;
  const popContainer = typeof getPopupContainer === 'function' ? getPopupContainer : formContext?.popupContainer;

  useLogWidgetPV('date-range');

  const pl = (Array.isArray(placeholder) ? placeholder : ['Start Date', 'End Date']) as [string, string];
  const realFormat = typeof format === 'string' ? format : DATE_FORMAT;

  const CompatibleProps = {
    getCalendarContainer: popContainer,
  };

  const realDefaultValue: [Moment, Moment] | undefined = useMemo(() => {
    return getMomentsByDateRange(initRange);
  }, [initRange]);

  const realValue: [Moment, Moment] | undefined = useMemo(() => {
    if (!(Array.isArray(value) && value.length === 2 && value[0] && value[1])) {
      return undefined;
    }

    return [moment(value[0], realFormat), moment(value[1], realFormat)];
  }, [value, realFormat]);

  const handleChange = useCallback(
    (date: any, dateStrArr: [string, string]) => {
      onChange(dateStrArr);
    },
    [onChange],
  );

  const clsn = cls('ant-form-item-control', 'xform-custom-widget', 'xform-custom-daterangepicker', className);

  return (
    <div className={clsn}>
      <RangePicker
        autoFocus={autofocus}
        placeholder={pl}
        disabled={disabled}
        format={realFormat}
        {...CompatibleProps}
        getPopupContainer={popContainer}
        {...restOptions}
        defaultValue={realDefaultValue}
        value={realValue}
        onChange={handleChange}
      />
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
export default memo(DateRangePickerWidget);
