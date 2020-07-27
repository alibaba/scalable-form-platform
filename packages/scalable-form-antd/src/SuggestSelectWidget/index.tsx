/**
 * @file 带 suggest 功能的 select 选择器组件
 * @description 对应 antd AutoComplete 组件
 */

import React, { useCallback } from 'react';
import cls from 'classnames';
import { AutoComplete } from 'antd';
import { AutoCompleteProps } from 'antd/es/auto-complete';
import { WidgetProps } from 'scalable-form-core';
import { useLogWidgetPV } from 'scalable-form-tools';

import { BaseFormContext } from '../types';
import { EnumOption } from '../common/types';
import { useControlState } from '../common/use-control-state';

/* eslint-disable @typescript-eslint/indent */
// https://github.com/typescript-eslint/typescript-eslint/issues/1824
export type SuggestSelectWidgetOptions = Pick<
  AutoCompleteProps,
  | 'allowClear'
  | 'autoFocus'
  | 'backfill'
  | 'defaultActiveFirstOption'
  | 'filterOption'
  | 'getPopupContainer'
  | 'defaultOpen'
  | 'notFoundContent'
  | 'onSearch'
> & {
  enumOptions: EnumOption[];
};
/* eslint-enable @typescript-eslint/indent */
export type SuggestSelectWidgetProps = WidgetProps<string, SuggestSelectWidgetOptions, BaseFormContext>;

const { Option } = AutoComplete;

const simpleCompare = (str1: string | undefined, str2: string) => {
  return (str1 || '').indexOf(str2) > -1;
};

const handleDefaultFilter = (iv: string, option: React.ReactElement<{ label: string; children: string }>): boolean => {
  const { label: l, children: v } = option.props;
  return simpleCompare(l, iv) || simpleCompare(v, iv);
};

const SuggestSelectWidget: React.FC<SuggestSelectWidgetProps> = (props) => {
  useLogWidgetPV('suggest-select');
  const {
    className,
    defaultValue,
    value: pValue,
    disabled,
    readonly,
    onChange,
    options,
    formContext,
    autofocus,
    placeholder,
  } = props;
  const { getPopupContainer, enumOptions, onSearch, ...restOptions } = options;

  const popContainer = typeof getPopupContainer === 'function' ? getPopupContainer : formContext?.popupContainer;
  const clsn = cls('ant-form-item-control', 'xform-custom-widget', 'xform-custom-suggest-select', className);

  const [value, setValue] = useControlState(pValue);

  const handleSelect = useCallback(
    (v: string) => {
      const realValue = v === '' ? undefined : v;
      setValue(realValue);
      onChange(v);
    },
    [setValue, onChange],
  );

  const handleSearch = typeof onSearch === 'function' ? onSearch : handleSelect;

  return (
    <div className={clsn}>
      <AutoComplete
        // 默认项，可以被覆盖
        autoFocus={autofocus}
        disabled={disabled || readonly}
        defaultActiveFirstOption={false}
        filterOption={handleDefaultFilter as any}
        {...restOptions}
        placeholder={placeholder}
        getPopupContainer={popContainer}
        defaultValue={defaultValue}
        value={value === '' ? undefined : value}
        onChange={handleSearch} // TODO: 因为中文输入法问题，暂时换成 onChange, props.onSearch 还有问题
      >
        {enumOptions.map(({ label, value: v }) => (
          <Option key={v} value={v}>
            {label}
          </Option>
        ))}
      </AutoComplete>
    </div>
  );
};

SuggestSelectWidget.displayName = 'SuggestSelectWidget';

export default React.memo(SuggestSelectWidget);
