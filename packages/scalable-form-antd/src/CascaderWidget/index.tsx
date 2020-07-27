/**
 * @file 级联选择器
 * @description value 为 string 类型，级联项用 逗号 分隔
 */

import React, { useCallback, useMemo } from 'react';
import cls from 'classnames';
import { Cascader } from 'antd';
import { CascaderProps, CascaderOptionType } from 'antd/es/cascader';
import { WidgetProps } from 'scalable-form-core';
import { useLogWidgetPV } from 'scalable-form-tools';

import { BaseFormContext } from '../types';

/* eslint-disable @typescript-eslint/indent */
// https://github.com/typescript-eslint/typescript-eslint/issues/1824
type CascaderWidgetOptions = Pick<
  CascaderProps,
  | 'allowClear'
  | 'bordered'
  | 'changeOnSelect'
  | 'className'
  | 'expandTrigger'
  | 'getPopupContainer'
  | 'fieldNames'
  | 'notFoundContent'
  | 'popupClassName'
  | 'popupPlacement'
  | 'suffixIcon'
  | 'popupVisible'
  | 'showSearch'
  | 'size'
  | 'style'
> & {
  enumOptions?: any; // 仅用于过滤
  enumTreeData?: CascaderOptionType[];
};
/* eslint-enable @typescript-eslint/indent */

type CascaderWidgetProps = WidgetProps<string, CascaderWidgetOptions, BaseFormContext>;

const str2ArrStr = (v?: string) => {
  let arrStr: string[] = [];
  if (typeof v !== 'string' || v === '') {
    arrStr = [];
  } else {
    arrStr = v.split(',');
  }

  return arrStr.length === 0 ? undefined : arrStr; // 确保空值触发 placeholder 逻辑
};

const arrStr2Str = (v?: string[]) => {
  if (!Array.isArray(v) || v.length === 0) {
    return undefined; // 确保空值触发 placeholder 逻辑
  }

  return v.join(',');
};

const CascaderWidget: React.FC<CascaderWidgetProps> = (props) => {
  const { className, options, value, defaultValue, disabled, readonly, placeholder, onChange, formContext } = props;
  const { enumOptions, enumTreeData, getPopupContainer, ...restOptions } = options;

  useLogWidgetPV('cascader');

  const handleChange = useCallback(
    (v: string[]) => {
      typeof onChange === 'function' && onChange(arrStr2Str(v));
    },
    [onChange],
  );

  const cacheDefaultValue = useMemo(() => str2ArrStr(defaultValue), [defaultValue]);
  const cacheValue = useMemo(() => str2ArrStr(value), [value]);
  const popupContainer = typeof getPopupContainer === 'function' ? getPopupContainer : formContext?.popupContainer;
  const clsn = cls('xform-custom-widget', 'xform-custom-cascader-select', className);

  return (
    <div className={clsn}>
      <Cascader
        expandTrigger="hover"
        defaultValue={cacheDefaultValue}
        value={cacheValue}
        options={Array.isArray(enumTreeData) ? enumTreeData : []}
        disabled={disabled || readonly}
        onChange={handleChange}
        placeholder={placeholder}
        getPopupContainer={popupContainer}
        {...restOptions}
      />
    </div>
  );
};

CascaderWidget.displayName = 'CascaderWidget';
CascaderWidget.defaultProps = {
  label: '',
  disabled: false,
  readonly: false,
  value: undefined,
  defaultValue: undefined,
  placeholder: '',
  onChange: () => {},
  options: {},
};

export default React.memo(CascaderWidget);
