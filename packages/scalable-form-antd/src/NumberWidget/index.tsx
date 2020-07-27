/**
 * @file 数字输入框
 * @description 同 InputNumber
 */

import React from 'react';
import cls from 'classnames';
import { InputNumber } from 'antd';
import { InputNumberProps } from 'antd/es/input-number';
import { WidgetProps } from 'scalable-form-core';
import { useLogWidgetPV } from 'scalable-form-tools';

import './index.less';
import { BaseFormContext } from '../types';

/* eslint-disable @typescript-eslint/indent */
// https://github.com/typescript-eslint/typescript-eslint/issues/1824
type InputNumberWidgetOptions = Pick<
  InputNumberProps,
  'autoFocus' | 'precision' | 'decimalSeparator' | 'size' | 'step'
> & {
  // 仅用来过滤掉 react-jsonschema-react 强塞的属性，不需要在意类型
  emptyValue: any;
  enumOptions: any;
};
/* eslint-enable @typescript-eslint/indent */

type InputNumberWidgetProps = WidgetProps<number, InputNumberWidgetOptions, BaseFormContext>;

const InputNumberWidget: React.FC<InputNumberWidgetProps> = (props) => {
  useLogWidgetPV('number');
  const { className, schema, options, readonly, autofocus, disabled, placeholder, value, onChange } = props;
  const { enumOptions, emptyValue, ...restOptions } = options; // 过滤掉不能透传的属性
  const { maximum, minimum, multipleOf } = schema || {};

  const max = typeof maximum === 'number' ? maximum : Infinity;
  const min = typeof minimum === 'number' ? minimum : -Infinity;
  const step = multipleOf || 1;

  const clsn = cls('ant-form-item-control', 'xform-custom-widget', 'xform-custom-number-input', className);

  return (
    <div className={clsn}>
      <InputNumber
        readOnly={readonly}
        disabled={disabled}
        autoFocus={autofocus}
        {...restOptions}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

InputNumberWidget.displayName = 'InputNumberWidget';
InputNumberWidget.defaultProps = {
  value: 0,
};
export default React.memo(InputNumberWidget);
