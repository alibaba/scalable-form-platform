import { JSONSchema7 } from 'json-schema';
import { UiSchema } from '@rjsf/core';
import FormData from './FormData';

/**
 * react-jsonschema-form实例中state的定义
 */
export default interface ReactJsonSchemaFormState {
  /**
   * 表单schema
   */
  schema: JSONSchema7;
  /**
   * 表单uiSchema
   */
  uiSchema: UiSchema;
  /**
   * 表单数据
   */
  formData: FormData;
}
