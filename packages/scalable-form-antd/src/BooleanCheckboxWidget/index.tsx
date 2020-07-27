/**
 * @file boolean 类型的 checkbox 组件
 * @description 默认值 false
 */

import React, { useCallback } from 'react';
import cls from 'classnames';
import { Checkbox } from 'antd';
import { CheckboxProps, CheckboxChangeEvent } from 'antd/es/checkbox';
import { WidgetProps } from 'scalable-form-core';
import { useLogWidgetPV } from 'scalable-form-tools';

import './index.less';
import { BaseFormContext } from '../types';

type BooleanCheckboxOptions = Pick<CheckboxProps, 'checked' | 'defaultChecked' | 'indeterminate' | 'autoFocus'>;

type BooleanCheckboxProps = WidgetProps<boolean, BooleanCheckboxOptions, BaseFormContext>;

const BooleanCheckbox: React.FC<BooleanCheckboxProps> = (props) => {
  const { label, options, disabled, value, onChange, autofocus, className } = props;

  useLogWidgetPV('boolean-checkbox');

  const handleChange = useCallback(
    (e: CheckboxChangeEvent) => {
      typeof onChange === 'function' && onChange(e?.target?.checked);
    },
    [onChange],
  );

  const clsn = cls('xform-custom-widget', 'xform-custom-boolean-checkbox', className);

  return (
    <div className={clsn}>
      <Checkbox checked={value} disabled={disabled} onChange={handleChange} autoFocus={autofocus} {...options}>
        {label}
      </Checkbox>
    </div>
  );
};

BooleanCheckbox.displayName = 'BooleanCheckbox';
BooleanCheckbox.defaultProps = {
  label: '',
  disabled: false,
  value: false,
  onChange: () => {},
  options: {},
};

export default React.memo(BooleanCheckbox);
