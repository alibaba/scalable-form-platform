/**
 * 数字选择器类型
 */
import React, { useCallback } from 'react';
import { WidgetProps } from 'scalable-form-core';
import { List, Stepper } from 'antd-mobile';
import classNames from 'classnames';
import './index.less';

const ListItem = List.Item;

/**
 * 数字选择器
 * @type {WidgetProps<number>}
 */
const NumberWidget: React.FC<WidgetProps<number>> = (props: WidgetProps<number>) => {
  const { schema, label, required, disabled, value, onChange } = props;
  const max = typeof schema.maximum !== 'undefined' ? schema.maximum : undefined;
  const min = typeof schema.minimum !== 'undefined' ? schema.minimum : undefined;
  const step = typeof schema.multipleOf !== 'undefined' ? schema.multipleOf : 1;
  const handleChanged = useCallback(
    (newValue) => {
      onChange(newValue);
    },
    [onChange],
  );
  return (
    <div
      className={classNames({
        'scalable-form-widget': true,
        'scalable-form-number-input': true,
        disabled,
      })}
    >
      <ListItem
        wrap
        multipleLine
        extra={
          <Stepper
            showNumber
            max={max}
            min={min}
            step={step}
            defaultValue={value || 0}
            value={value || 0}
            onChange={handleChanged}
          />
        }
      >
        <label
          className={classNames({
            required,
          })}
        >
          {label}
        </label>
      </ListItem>
    </div>
  );
};

NumberWidget.displayName = 'NumberWidget';
NumberWidget.defaultProps = {
  value: 0,
};
export default React.memo(NumberWidget);
