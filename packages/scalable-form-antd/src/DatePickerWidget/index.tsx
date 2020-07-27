/**
 * @file DatePicker 日期选择类型
 * @description options.picker 'date', 'week', 'month', 'quarter', 'year' 指定 Picker 类型
 * 'date-time' 类型带时间的的 DatePicker
 */

import React, { useMemo, useCallback } from 'react';
import cls from 'classnames';
import moment, { Moment } from 'moment';
import { DatePicker } from 'antd';
import { DatePickerProps } from 'antd/es/date-picker';
import { WidgetProps } from 'scalable-form-core';
import { useLogWidgetPV } from 'scalable-form-tools';

import './index.less';
import { BaseFormContext } from '../types';

const { WeekPicker, MonthPicker } = DatePicker;

type PickerEnhance = NonNullable<DatePickerProps['picker'] | 'date-time'>;

/* eslint-disable @typescript-eslint/indent */
// https://github.com/typescript-eslint/typescript-eslint/issues/1824
export type DatePickerWidgetOptions = Pick<
  DatePickerProps,
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
> & {
  picker?: PickerEnhance;
  /**
   * 是否展示today入口
   */
  showToday?: boolean;
  /**
   * 是否展示time选择
   */
  showTime?: boolean;
};
/* eslint-enable @typescript-eslint/indent */

export type DatePickerWidgetProps = WidgetProps<string, DatePickerWidgetOptions, BaseFormContext>;

/**
 * breaking changes
 * 原: prop.schema.format 'data' / 'month' 区分 DatePicker 和 MonthPicker, 但 schema.format 用于 ajv 校验，使用 如下属性替换
 * 更改为： prop.options.picker ，具体支持类型，请参考 https://ant.design/components/date-picker/#Common-API
 */

// antd 3.x 仅支持这三种 Picker
const PICKER_MAP = {
  'date-time': DatePicker,
  date: DatePicker,
  week: WeekPicker,
  month: MonthPicker,
};

const DEFAULT_FORMAT_MAP: Record<PickerEnhance, string> = {
  time: 'HH:mm:ss',
  'date-time': 'YYYY-MM-DD HH:mm:ss',
  date: 'YYYY-MM-DD',
  week: 'gggg-wo',
  month: 'YYYY-MM',
  quarter: 'YYYY-[Q]Q',
  year: 'YYYY',
};

const getFormatStr = (type: PickerEnhance, format?: string | string[]) => {
  const ft = Array.isArray(format) ? format[0] : format;
  return ft || DEFAULT_FORMAT_MAP[type];
};

const dateStr2Moment = (format: string, dateStr?: string) => {
  if (!dateStr) {
    return undefined;
  }
  return moment(dateStr, format);
};

const DatePickerWidget: React.FC<DatePickerWidgetProps> = (props) => {
  const { className, defaultValue, value, disabled, placeholder, onChange, options, formContext, autofocus } = props;
  const { picker = 'date', getPopupContainer, ...restOptions } = options;
  const popContainer = typeof getPopupContainer === 'function' ? getPopupContainer : formContext?.popupContainer;

  useLogWidgetPV(picker);

  const formatStr = getFormatStr(picker, restOptions.format);

  const momentDefaultValue = useMemo(() => dateStr2Moment(formatStr, defaultValue), [defaultValue, formatStr]);
  const momentValue = useMemo(() => dateStr2Moment(formatStr, value), [value, formatStr]);
  const handleChange = useCallback((date: Moment) => onChange(date.format(formatStr)), [onChange, formatStr]);

  const pickerProps = {
    autoFocus: autofocus,
    picker, // 传入 picker，确保 4.x 新增 picker 生效
    defaultValue: momentDefaultValue,
    value: momentValue,
    disabled,
    placeholder,
    getPopupContainer: popContainer,
    getCalendarContainer: popContainer, // 兼容 antd 3.x
    onChange: handleChange,
    ...restOptions,
  };

  // 兼容 antd 3.x
  const PickerComponent = PICKER_MAP[picker] || DatePicker; // antd 3.x 支持的 picker 之外，回退使用 DatePicker
  const clsn = cls('ant-form-item-control', 'xform-custom-widget', 'xform-custom-datepicker', className);

  return (
    <div className={clsn}>
      <PickerComponent {...pickerProps} />
    </div>
  );
};

DatePickerWidget.displayName = 'DatePickerWidget';
DatePickerWidget.defaultProps = {
  disabled: false,
  value: undefined,
  defaultValue: undefined,
  placeholder: undefined,
  formContext: {},
  onChange: () => {},
  options: {},
};

export default React.memo(DatePickerWidget);
