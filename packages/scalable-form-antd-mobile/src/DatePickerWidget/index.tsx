import React from 'react';
import { DatePicker, List } from 'antd-mobile';
import classNames from 'classnames';
import { WidgetProps } from 'scalable-form-core';
import { formatDate } from 'scalable-form-tools';
import './index.less';

const ListItem = List.Item;

/**
 * 日期选择器
 * @type {WidgetProps<string>}
 */
const DatePickerWidget: React.FC<WidgetProps<string>> = (props: WidgetProps<string>) => {
  const { label, required, value, disabled, onChange, placeholder } = props;

  return (
    <div
      className={classNames({
        'scalable-form-widget': true,
        'scalable-form-datepicker': true,
        disabled,
      })}
    >
      <DatePicker
        mode="date"
        format="YYYY-MM-DD"
        value={value ? new Date(value.replace(/-/g, '/')) : undefined}
        disabled={disabled}
        onChange={(newValue) => {
          onChange(formatDate(newValue, 'yyyy-MM-dd'));
        }}
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
