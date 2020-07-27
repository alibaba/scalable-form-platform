import React from 'react';
import { Radio, List } from 'antd-mobile';
import { WidgetProps } from 'scalable-form-core';
import classNames from 'classnames';
import { EnumOption, getLabelFromOptionsByValue } from '../tools';
import './index.less';

const { RadioItem } = Radio;
const ListItem = List.Item;

/**
 * ui:options会注入选项信息
 */
interface RadioOptions {
  /**
   * 选项
   */
  enumOptions: EnumOption[];
}

type RadioWidgetProps = WidgetProps<string, RadioOptions>;

/**
 * radio单选按钮组
 * @type {WidgetProps<string, RadioOptions>}
 */
const RadioWidget: React.FC<RadioWidgetProps> = (props: RadioWidgetProps) => {
  const { label, required, value, disabled, onChange, options } = props;
  const enumOptions = options.enumOptions || [];
  return (
    <div
      className={classNames({
        'scalable-form-widget': true,
        'scalable-form-radio': true,
        disabled,
      })}
    >
      <ListItem wrap multipleLine extra={getLabelFromOptionsByValue(enumOptions, value || '')}>
        <label
          className={classNames({
            required,
          })}
        >
          {label}
        </label>
      </ListItem>
      {enumOptions.map((innerEnum: EnumOption) => {
        return (
          <RadioItem
            className={classNames({
              'scalable-form-radio-item': true,
              checked: value === innerEnum.value,
            })}
            key={innerEnum.value}
            checked={value === innerEnum.value}
            disabled={disabled}
            onClick={() => {
              onChange(innerEnum.value);
            }}
          >
            {innerEnum.label}
          </RadioItem>
        );
      })}
    </div>
  );
};

RadioWidget.displayName = 'RadioWidget';
RadioWidget.defaultProps = {
  disabled: false,
  value: '',
  defaultValue: undefined,
  onChange: () => {},
  options: {
    enumOptions: [],
  },
};
export default React.memo(RadioWidget);
