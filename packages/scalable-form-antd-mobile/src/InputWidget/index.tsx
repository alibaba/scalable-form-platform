import React from 'react';
import { InputItem } from 'antd-mobile';
import classNames from 'classnames';
import { WidgetProps } from 'scalable-form-core';
import './index.less';

/**
 * 单行文本框输入组件
 * @type {WidgetProps<string>}
 */
const InputWidget: React.FC<WidgetProps<string>> = (props: WidgetProps<string>) => {
  const { onChange, schema, label, readonly, disabled, required, placeholder, value } = props;
  const { maxLength, minLength } = schema;
  return (
    <div
      className={classNames({
        'scalable-form-widget': true,
        'scalable-form-input': true,
      })}
    >
      <InputItem
        type="text"
        clear
        maxLength={maxLength}
        minLength={minLength}
        placeholder={placeholder}
        value={value}
        editable={!readonly}
        disabled={disabled}
        onChange={onChange}
      >
        <label
          className={classNames({
            required,
          })}
        >
          {label}
        </label>
      </InputItem>
    </div>
  );
};

InputWidget.displayName = 'InputWidget';
InputWidget.defaultProps = {
  disabled: false,
  value: undefined,
  defaultValue: undefined,
  placeholder: '',
  onChange: () => {},
  options: {},
};
export default React.memo(InputWidget);
