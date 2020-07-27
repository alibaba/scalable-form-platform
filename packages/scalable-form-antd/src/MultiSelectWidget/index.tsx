/**
 * @file 下拉选择 Widget
 * @description 下拉数据从 props.options.enumOptions 中获取
 */

import React from 'react';
import cls from 'classnames';
import { WidgetProps } from 'scalable-form-core';
import { useLogWidgetPV } from 'scalable-form-tools';

import { BaseFormContext } from '../types';
import SelectWidget, { SelectWidgetOptions } from '../SelectWidget';

const ALL_VALUE = `all-value-[${new Date().valueOf()}]`;

export type MultiSelectWidgetProps = WidgetProps<string[], Omit<SelectWidgetOptions, 'mode'>, BaseFormContext>;

const MultiSelectWidget: React.FC<MultiSelectWidgetProps> = (props) => {
  useLogWidgetPV('multi-select');
  const { className, options, value: pValue, onChange, ...restProps } = props;
  const clsn = cls('xform-custom-multiple-select', className);
  const { enumOptions: originEnumOptions } = options;
  let value = Array.isArray(pValue) ? pValue : [];
  let enumOptions = Array.isArray(originEnumOptions) ? [...originEnumOptions] : [];

  // 过滤一遍 value，只保留 options 里面有的值
  value = value.filter((outerItem) => enumOptions.some((innerItem) => innerItem.value === outerItem));
  // 如果 value 有值，并选中了所有 enumOptions 的值，那么添加全选值（如果已经有 ALL_VALUE，会在上一步被过滤掉）
  if (value.length > 0 && value.length === enumOptions.length) {
    value.push(ALL_VALUE);
  }
  // 处理 enumOptions，如果为非空数组，那么添加全选 option
  if (enumOptions.length > 0) {
    enumOptions = [
      ...enumOptions,
      {
        label: '全选', // TODO: i18n locale
        value: ALL_VALUE,
      },
    ];
  }

  // 注意 handleChange 顺序，必须是在 value 处理之后，用到的 value 包含了 ALL_VALUE 逻辑
  // 不用 useCallback 封装是因为依赖项总是会变化
  const handleChange = (selectedValue: string[]) => {
    const hasAllValueItemBefore = value.some((v) => v === ALL_VALUE);
    const hasAllValueItemSelected = selectedValue.some((v) => v === ALL_VALUE);

    // 删除了全选
    if (hasAllValueItemBefore && !hasAllValueItemSelected) {
      onChange([]);
      return;
    }

    // 选中了全选
    if (!hasAllValueItemBefore && hasAllValueItemSelected) {
      onChange(originEnumOptions.map(({ value: v }) => v));
      return;
    }

    // 没有手动选中或去除全选动作
    const sv = hasAllValueItemSelected ? selectedValue.filter((v) => v !== ALL_VALUE) : selectedValue; // 先去掉全选项
    // 因全选只是一个内部状态，不能反馈到组件外部，先去掉全选，再 onChange
    onChange(sv);
  };

  return (
    <SelectWidget
      {...restProps}
      options={{
        ...options,
        enumOptions,
        mode: 'multiple',
      }}
      value={value.length === 0 ? undefined : value} // 触发 placeholder
      className={clsn}
      onChange={handleChange}
    />
  );
};

MultiSelectWidget.displayName = 'MultiSelectWidget';
MultiSelectWidget.defaultProps = {
  value: [],
};
export default React.memo(MultiSelectWidget);
