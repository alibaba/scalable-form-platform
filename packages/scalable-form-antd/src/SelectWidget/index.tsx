/**
 * @file 下拉选择 Widget
 * @description 下拉数据从 props.options.enumOptions 中获取
 * 根据 props.options.mode 的不同，可以选择设置成是否多选
 */

import React, { useCallback } from 'react';
import cls from 'classnames';
import { Select } from 'antd';
import { SelectProps } from 'antd/es/select';
import { WidgetProps } from 'scalable-form-core';
import { useLogWidgetPV } from 'scalable-form-tools';

import { BaseFormContext } from '../types';
import { EnumOption } from '../common/types';

/* eslint-disable @typescript-eslint/indent */
// https://github.com/typescript-eslint/typescript-eslint/issues/1824
export type SelectWidgetOptions = Pick<
  SelectProps<any>,
  | 'allowClear'
  | 'autoClearSearchValue'
  | 'autoFocus'
  | 'className'
  | 'defaultActiveFirstOption'
  | 'dropdownClassName'
  | 'dropdownMatchSelectWidth'
  | 'dropdownStyle'
  | 'getPopupContainer'
  | 'labelInValue'
  | 'maxTagCount'
  | 'maxTagTextLength'
  | 'mode'
  | 'notFoundContent'
  | 'optionFilterProp'
  | 'optionLabelProp'
  | 'showArrow'
  | 'showSearch'
  | 'size'
  | 'suffixIcon'
  | 'removeIcon'
  | 'clearIcon'
  | 'menuItemSelectedIcon'
  | 'tokenSeparators'
> & {
  enumOptions: EnumOption[];
};
/* eslint-enable @typescript-eslint/indent */

export type SelectWidgetProps = WidgetProps<string | string[], SelectWidgetOptions, BaseFormContext>;

const { Option } = Select;

const SelectWidget: React.FC<SelectWidgetProps> = (props) => {
  useLogWidgetPV('select');
  const { id, options, readonly, autofocus, disabled, placeholder, value, onChange, formContext, className } = props;
  const { enumOptions, getPopupContainer, ...restOptions } = options;
  const popContainer = typeof getPopupContainer === 'function' ? getPopupContainer : formContext?.popupContainer;
  const list: EnumOption[] = Array.isArray(enumOptions) ? enumOptions : [];

  const handleChange = useCallback((v: string) => onChange(v), [onChange]);
  const clsn = cls('ant-form-item-control', 'xform-custom-widget', 'xform-custom-select', className);

  return (
    <div className={clsn}>
      <Select
        // 默认行为，允许被 ...restOptions覆盖
        allowClear
        showSearch
        optionFilterProp="label"
        optionLabelProp="label"
        autoFocus={autofocus}
        {...restOptions}
        id={id}
        value={value}
        disabled={disabled || readonly}
        placeholder={placeholder}
        getPopupContainer={popContainer}
        onChange={handleChange}
      >
        {list.map(({ label, value: v }) => (
          <Option key={v} value={v} label={label}>
            {label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

SelectWidget.displayName = 'SelectWidget';
SelectWidget.defaultProps = {
  label: '',
  disabled: false,
  value: '',
  onChange: () => {},
  options: {
    enumOptions: [],
  },
};
export default React.memo(SelectWidget);
