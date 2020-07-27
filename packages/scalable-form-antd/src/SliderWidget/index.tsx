/**
 * @file 滑动输入条
 * @description 滑动输入条
 */

import React from 'react';
import cls from 'classnames';
import { Slider } from 'antd';
import { SliderProps, SliderValue } from 'antd/es/slider';
import { WidgetProps } from 'scalable-form-core';
import { useLogWidgetPV } from 'scalable-form-tools';
import { BaseFormContext } from '../types';

/* eslint-disable @typescript-eslint/indent */
// https://github.com/typescript-eslint/typescript-eslint/issues/1824
export type SliderWidgetOptions = Pick<
  SliderProps,
  'disabled' | 'dots' | 'included' | 'marks' | 'range' | 'reverse' | 'step' | 'vertical' | 'tooltipPlacement'
>;
/* eslint-enable @typescript-eslint/indent */

export type SliderWidgetProps = WidgetProps<SliderValue, SliderWidgetOptions, BaseFormContext>;

const SliderWidget: React.FC<SliderWidgetProps> = (props) => {
  useLogWidgetPV('slider');
  const { className, defaultValue, value, disabled, readonly, onChange, options } = props;
  const { vertical, ...restOptions } = options;

  const clsn = cls('ant-form-item-control', 'xform-custom-widget', 'xform-custom-slider', className);

  return (
    <div className={clsn}>
      <Slider
        disabled={disabled || readonly}
        {...restOptions}
        vertical={vertical}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        onAfterChange={onChange}
      />
    </div>
  );
};

SliderWidget.displayName = 'SliderWidget';
SliderWidget.defaultProps = {
  label: '',
  disabled: false,
  value: undefined,
  onChange: () => {},
  options: {
    vertical: true,
  },
};
export default React.memo(SliderWidget);
