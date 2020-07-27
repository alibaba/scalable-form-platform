/**
 * @file Radio 选择器
 * @description 数据从 props.options.enumOptions 中获取
 */

import React, { useCallback } from 'react';
import cls from 'classnames';
import { Radio } from 'antd';
import { RadioGroupProps, RadioChangeEvent } from 'antd/es/radio';
import { WidgetProps } from 'scalable-form-core';
import { useLogWidgetPV } from 'scalable-form-tools';

import './index.less';
import { BaseFormContext } from '../types';
import { EnumOption } from '../common/types';

export enum RadioStyle {
  NORMAL = 'normal',
  BUTTON = 'button',
}

/* eslint-disable @typescript-eslint/indent */
// https://github.com/typescript-eslint/typescript-eslint/issues/1824
type RadioWidgetOptions = Pick<RadioGroupProps, 'name' | 'size' | 'buttonStyle'> & {
  /**
   * 渲染 Radio 的数据源
   */
  enumOptions: EnumOption[];
  /**
   * 是否采用垂直模式
   */
  vertical?: boolean;
  /**
   * Radio 的展现模式 (normal 或 button)
   */
  style: RadioStyle;
};
/* eslint-enable @typescript-eslint/indent */

type RadioWidgetProps = WidgetProps<string, RadioWidgetOptions, BaseFormContext>;

const { Group, Button } = Radio;

const RadioWidget: React.FC<RadioWidgetProps> = (props) => {
  useLogWidgetPV('radio');
  const { className, options, readonly, disabled, value, onChange, formContext } = props;
  const { enumOptions, vertical, style, ...restOptions } = options;
  const { labelType } = formContext || {};

  let radioVertical = typeof vertical === 'boolean' ? vertical : labelType === 'vertical';

  const clsn = cls('ant-form-item-control', 'xform-custom-widget', 'xform-custom-radio', className);

  let ChildComponent: typeof Radio | typeof Button = Radio;
  if (style === RadioStyle.BUTTON) {
    ChildComponent = Button;
    radioVertical = false;
  }

  const handleChange = useCallback(
    (e: RadioChangeEvent) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  const list = Array.isArray(enumOptions) ? enumOptions : [];
  return (
    <div className={clsn}>
      <div className={cls({ vertical: radioVertical })}>
        <Group disabled={disabled || readonly} {...restOptions} value={value} onChange={handleChange}>
          {list.map(({ label, value: v }) => (
            <ChildComponent key={v} value={v}>
              {label}
            </ChildComponent>
          ))}
        </Group>
      </div>
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
    style: RadioStyle.NORMAL,
  },
};
export default React.memo(RadioWidget);
