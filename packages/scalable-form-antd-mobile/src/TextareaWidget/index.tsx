import React from 'react';
import { TextareaItem } from 'antd-mobile';
import classNames from 'classnames';
import { WidgetProps } from 'scalable-form-core';
import './index.less';

/**
 * 多行文本输入框
 * @param {WidgetProps<string>} props
 * @returns {any}
 * @constructor
 */
const TextareaWidget: React.FC<WidgetProps<string>> = (props: WidgetProps<string>) => {
  const { schema, label, readonly, disabled, required, placeholder, value, onChange } = props;
  const { maxLength } = schema;

  return (
    <div
      className={classNames({
        'scalable-form-widget': true,
        'scalable-form-textarea': true,
      })}
    >
      <TextareaItem
        title={
          <label
            className={classNames({
              required,
            })}
          >
            {label}
          </label>
        }
        placeholder={placeholder}
        value={value}
        editable={!readonly}
        disabled={disabled}
        count={maxLength}
        autoHeight
        clear
        onChange={onChange}
      />
    </div>
  );
};
TextareaWidget.displayName = 'TextareaWidget';
export default React.memo(TextareaWidget);
