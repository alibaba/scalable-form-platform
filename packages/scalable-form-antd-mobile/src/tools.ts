import { WidgetProps } from 'scalable-form-core';
import { getRandomString } from 'scalable-form-tools';

/**
 * 适用于单选，多选，下拉选择的选项（移动端radio等组件适用）
 */
export interface EnumOption {
  value: string;
  label: string;
}

/**
 * 从选项中提取展示用label
 * @param {EnumOption[]} enumOptions
 * @param {string} value
 * @returns {string} label
 */
export function getLabelFromOptionsByValue(enumOptions: EnumOption[], value: string): string {
  let result = '';
  enumOptions.forEach((enums) => {
    if (enums.value === value) {
      result = enums.label;
    }
  });
  return result;
}

/**
 * 准备默认widgetProps，【为测试场景准备】
 * @returns {WidgetProps}
 */
export function getTestDefaultWidgetProps(): WidgetProps {
  return {
    id: getRandomString(),
    schema: {},
    value: '',
    options: {},
    onChange: () => {},
    formContext: {},
    onBlur: () => {},
    onFocus: () => {},
    required: false,
    readonly: false,
    disabled: false,
    autofocus: false,
    label: '',
    rawErrors: [],
  };
}
