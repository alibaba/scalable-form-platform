import { UiSchema, Widget } from 'scalable-form-core';
import _ from 'lodash';

/**
 * 判断uiSchema中ui:widget字段涉及的组件是否存在
 * 如果不存在，替换ui:widget为Anonymous组件，展示错误信息
 * @param {Record<string, Widget>} widgets
 * @param {UiSchema} uiSchema
 * @returns {UiSchema}
 */
export function getUiSchemaByProvidedWidgets(widgets: Record<string, Widget> = {}, uiSchema: UiSchema = {}): UiSchema {
  const result: UiSchema = {};
  _.entries(uiSchema).forEach(([uiKey, uiItem]: [string, UiSchema]) => {
    if (uiItem['ui:widget'] && !widgets[uiItem['ui:widget'] as string]) {
      result[uiKey] = {
        ...uiItem,
        'ui:options': {
          ...(uiItem['ui:options'] || {}),
          originWidget: uiItem['ui:widget'],
        },
        'ui:widget': 'Anonymous',
      };
    } else {
      result[uiKey] = {
        ...uiItem,
      };
    }
  });
  result['ui:order'] = uiSchema['ui:order'];
  return result;
}
