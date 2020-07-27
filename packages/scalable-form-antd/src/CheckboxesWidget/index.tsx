/**
 * @file Checkbox Group
 * @description options.enumOptions 描述 checkbox 列表项
 */

import React, { useCallback } from 'react';
import cls from 'classnames';
import { Checkbox } from 'antd';
import { CheckboxGroupProps, CheckboxOptionType } from 'antd/es/checkbox';
import { WidgetProps } from 'scalable-form-core';
import { useLogWidgetPV } from 'scalable-form-tools';

import './index.less';
import { BaseFormContext } from '../types';

type CheckboxesValueType = CheckboxOptionType['value'];
type CheckboxesWidgetOptions = {
  enumOptions?: CheckboxGroupProps['options'];
  vertical?: boolean;
};

type CheckboxesWidgetProps = WidgetProps<CheckboxesValueType[], CheckboxesWidgetOptions, BaseFormContext>;

const { Group: CheckboxGroup } = Checkbox;

const CheckboxesWidget: React.FC<CheckboxesWidgetProps> = (props) => {
  const { className, defaultValue, value, disabled, onChange, options } = props;
  const { enumOptions, vertical } = options || {};
  const verticalClassName = vertical ? 'vertical' : undefined;

  useLogWidgetPV('checkbox');

  const handleChange = useCallback(
    (v: string[]) => {
      typeof onChange === 'function' && onChange(v);
    },
    [onChange],
  );

  const clsn = cls('ant-form-item-control', 'xform-custom-widget', 'xform-custom-checkbox', className);

  return (
    <div className={clsn}>
      <div className={verticalClassName}>
        <CheckboxGroup
          disabled={disabled}
          options={enumOptions}
          defaultValue={defaultValue}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

CheckboxesWidget.displayName = 'CheckboxesWidget';
CheckboxesWidget.defaultProps = {
  disabled: false,
  value: undefined,
  defaultValue: undefined,
  onChange: () => {},
  options: {},
};

export default React.memo(CheckboxesWidget);
