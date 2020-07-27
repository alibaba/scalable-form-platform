import { FormData, JSONSchema, UiSchema } from 'scalable-form-core';

/**
 * 单个字段配置schema
 */
export default interface ConfigSchema {
  /**
   * 单个字段配置jsonSchema
   */
  configJsonSchema: JSONSchema;
  /**
   * 单个字段配置uiSchema
   */
  configUiSchema: UiSchema;
  /**
   * 单个字段配置formData
   */
  configFormData: FormData;
}
