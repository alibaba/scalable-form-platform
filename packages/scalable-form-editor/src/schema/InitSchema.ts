import { JSONSchema, UiSchema } from 'scalable-form-core';

/**
 * 单个字段初始化schema
 */
export default interface InitSchema {
  /**
   * 单个字段添加初始化jsonSchema
   */
  initJsonSchema: JSONSchema;
  /**
   * 单个字段添加初始化uiSchema
   */
  initUISchema: UiSchema;
  /**
   * 单个字段添加初始化formData
   */
  initFormData: boolean | string | number | null | object;
}
