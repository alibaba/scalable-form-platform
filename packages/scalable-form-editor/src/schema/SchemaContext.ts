import React, { createContext } from 'react';
import { JSONSchema, UiSchema } from 'scalable-form-core';
import { getInitJsonSchema, getInitUISchema } from './SchemaUtils';
import PickerItem from './PickerItem';

/**
 * 全局schema的context
 * @type {React.Context<>}
 */
const SchemaContext: React.Context<{
  /**
   * 工单表单组件选择列表
   */
  pickerList: PickerItem[];
  /**
   * 已配置schema
   */
  schema: JSONSchema;
  /**
   * 已配置uiSchema
   */
  uiSchema: UiSchema;
  /**
   * 已选中组件id
   */
  selectedWidgetId: string;
  /**
   * 更新选中的widgetId
   * @param {string} selectedWidgetId
   */
  onUpdateSelectedWidgetId: (selectedWidgetId: string) => void;
  /**
   * 删除widgetId对应组件
   * @param {string} widgetId
   */
  onDeleteWidgetById: (widgetId: string) => void;
}> = createContext({
  pickerList: [] as PickerItem[],
  schema: getInitJsonSchema(),
  uiSchema: getInitUISchema(),
  selectedWidgetId: '',
  onUpdateSelectedWidgetId: (selectedWidgetId: string) => {
    // eslint-disable-next-line no-console
    console.debug(selectedWidgetId);
  },
  onDeleteWidgetById: (widgetId: string) => {
    // eslint-disable-next-line no-console
    console.debug(widgetId);
  },
});

export default SchemaContext;
