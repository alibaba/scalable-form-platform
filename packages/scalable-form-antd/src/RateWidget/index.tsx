/**
 * @file 评分组件
 * @description 数据源为 props.options.enumOptions
 * @description props.options.enumOptions.length {number} 总评分数
 * @description props.options.enumOptions => label {string[]} tooltips
 * @description props.options.enumOptions[n].value {string} value
 */

import React, { useCallback, useMemo, useState } from 'react';
import cls from 'classnames';
import { Rate } from 'antd';
import { RateProps } from 'antd/es/rate';
import { WidgetProps } from 'scalable-form-core';
import { useLogWidgetPV } from 'scalable-form-tools';

import { BaseFormContext } from '../types';
import { EnumOption } from '../common/types';

/* eslint-disable @typescript-eslint/indent */
// https://github.com/typescript-eslint/typescript-eslint/issues/1824
type RateWidgetOptions = Pick<RateProps, 'allowClear' | 'allowHalf' | 'character' | 'style'> & {
  enumOptions: EnumOption[];
};
/* eslint-enable @typescript-eslint/indent */

type RateWidgetProps = WidgetProps<string, RateWidgetOptions, BaseFormContext>;

const getRateNumberFromValue = (v: string | undefined, options: EnumOption[]) => {
  let result: number | undefined;
  options.some(({ value }, index) => {
    if (value === v) {
      result = index + 1;
      return true;
    }
    return false;
  });
  return result;
};

const getRateLabelFromValue = (v: string | undefined, options: EnumOption[]) => {
  let result: string | undefined;
  options.some(({ label, value }) => {
    if (value === v) {
      result = label;
      return true;
    }
    return false;
  });

  return result;
};

const RateWidget: React.FC<RateWidgetProps> = (props) => {
  useLogWidgetPV('rate');
  const { className, defaultValue, value, disabled, readonly, onChange, options } = props;
  const { enumOptions, ...restOptions } = options;

  const clsn = cls('ant-form-item-control', 'xform-custom-widget', 'xform-custom-rate', className);
  const [showLabel, setShowLabel] = useState(getRateLabelFromValue(value, enumOptions));

  const handleChange = useCallback(
    (num: number) => {
      const currentItem = enumOptions[num - 1];
      onChange(currentItem?.value);
      setShowLabel(currentItem?.label);
    },
    [onChange, enumOptions],
  );

  const handleHoverChange = useCallback(
    (num: number) => {
      if (!num) {
        setShowLabel(getRateLabelFromValue(value, enumOptions));
        return;
      }
      const currentItem = enumOptions[num - 1];
      setShowLabel(currentItem?.label);
    },
    [value, enumOptions],
  );

  const count = enumOptions.length;
  const tooltips = useMemo(() => enumOptions.map(({ label }) => label), [enumOptions]);

  return (
    <div className={clsn}>
      <Rate
        disabled={disabled || readonly}
        {...restOptions}
        count={count}
        tooltips={tooltips}
        defaultValue={getRateNumberFromValue(defaultValue, enumOptions)}
        value={getRateNumberFromValue(value, enumOptions)}
        onHoverChange={handleHoverChange}
        onChange={handleChange}
      />
      <span>{showLabel}</span>
    </div>
  );
};

RateWidget.displayName = 'RateWidget';

export default React.memo(RateWidget);
