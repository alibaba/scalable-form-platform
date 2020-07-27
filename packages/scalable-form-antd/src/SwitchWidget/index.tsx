/**
 * @file switch 开关组件
 * @description 对应 antd Switch 组件
 */

import React from 'react';
import cls from 'classnames';
import { Switch } from 'antd';
import { SwitchProps } from 'antd/es/switch';
import { WidgetProps } from 'scalable-form-core';
import { useLogWidgetPV } from 'scalable-form-tools';

import { BaseFormContext } from '../types';

/* eslint-disable @typescript-eslint/indent */
// https://github.com/typescript-eslint/typescript-eslint/issues/1824
export type SwitchWidgetOptions = Pick<
  SwitchProps,
  'autoFocus' | 'checkedChildren' | 'className' | 'size' | 'unCheckedChildren'
> & {
  // 仅用于过滤 react-jsonschema-form 默认注入的不需要属性
  enumOptions: any;
  help: any;
  emptyValue: any;
};
/* eslint-enable @typescript-eslint/indent */
export type SwitchWidgetProps = WidgetProps<boolean, SwitchWidgetOptions, BaseFormContext>;

const SwitchWidget: React.FC<SwitchWidgetProps> = (props) => {
  useLogWidgetPV('switch');
  const { className, defaultValue, value, disabled, readonly, onChange, options, autofocus } = props;
  const { enumOptions, help, emptyValue, ...restOptions } = options; // 过滤掉不需要属性

  const clsn = cls('ant-form-item-control', 'xform-custom-widget', 'xform-custom-switch', className);

  return (
    <div className={clsn}>
      <Switch
        // 默认项，可以被覆盖
        autoFocus={autofocus}
        disabled={disabled || readonly}
        {...restOptions}
        defaultChecked={defaultValue}
        checked={value}
        onChange={onChange}
      />
    </div>
  );
};

SwitchWidget.displayName = 'SwitchWidget';

export default React.memo(SwitchWidget);
