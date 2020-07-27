import React, { useCallback } from 'react';
import { DatePicker, List } from 'antd-mobile';
import classNames from 'classnames';
import { WidgetProps } from 'scalable-form-core';
import { formatDate } from 'scalable-form-tools';
import './index.less';

const ListItem = List.Item;

const DEFAULT_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';

/**
 * 时间日期选择器
 * @type {WidgetProps<string>}
 */
const DateTimePickerWidget: React.FC<WidgetProps<string>> = (props: WidgetProps<string>) => {
  const { label, required, value, disabled, onChange, placeholder } = props;

  const handleDateTimeChanged = useCallback(
    (newValue: Date) => {
      onChange(formatDate(newValue, DEFAULT_DATE_TIME_FORMAT));
    },
    [onChange],
  );

  return (
    <div
      className={classNames({
        'scalable-form-widget': true,
        'scalable-form-date-time-picker': true,
        disabled,
      })}
    >
      <DatePicker
        mode="datetime"
        format={DEFAULT_DATE_TIME_FORMAT}
        value={value ? new Date(value.replace(/-/g, '/')) : undefined}
        disabled={disabled}
        onChange={handleDateTimeChanged}
        extra={placeholder}
      >
        <ListItem arrow="horizontal" wrap multipleLine>
          <label
            className={classNames({
              required,
            })}
          >
            {label}
          </label>
        </ListItem>
      </DatePicker>
    </div>
  );
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
