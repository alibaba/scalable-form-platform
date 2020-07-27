/**
 * @file 滑动区域输入条
 * @description 滑动区域输入条
 */

import React from 'react';
import cls from 'classnames';
import { WidgetProps } from 'scalable-form-core';
import { useLogWidgetPV } from 'scalable-form-tools';

import { BaseFormContext } from '../types';
import SliderWidget, { SliderWidgetOptions } from '../SliderWidget';

type SliderRangeWidgetProps = WidgetProps<[number, number], Omit<SliderWidgetOptions, 'range'>, BaseFormContext>;

const SliderRangeWidget: React.FC<SliderRangeWidgetProps> = (props) => {
  useLogWidgetPV('sliderRange');
  const { className, options, ...restProps } = props;
  const realOptions: SliderWidgetOptions = {
    ...options,
    range: true,
  };

  const clsn = cls('ant-form-item-control', 'xform-custom-widget', 'xform-custom-slider-range', className);

  return (
    <div className={clsn}>
      <SliderWidget {...restProps} options={realOptions} />
    </div>
  );
};

SliderRangeWidget.displayName = 'SliderRangeWidget';
SliderRangeWidget.defaultProps = {
  value: undefined,
  label: '',
  disabled: false,
  onChange: () => {},
  options: {},
};
export default React.memo(SliderRangeWidget);
