import React, { ReactNode, MemoExoticComponent, NamedExoticComponent } from 'react';
import { JSONSchema7, JSONSchema7Definition } from 'json-schema';
import { FormProps, WidgetProps as OriginWidgetProps } from '@rjsf/core';
import FormData from './model/FormData';

/**
 * Scalable Form使用的表单schema描述，基于[JSONSchema7](https://json-schema.org/)进行扩展
 */
interface JSONSchema extends JSONSchema7 {
  /**
   * 枚举项描述，与enums字段一起使用，其中enums对应key，enumNames对应label
   */
  enumNames?: string[];
  /**
   * 表单字段描述，每一个key对应的均为JSONSchema
   */
  properties?: {
    [key: string]: JSONSchema;
  };
  /**
   * 扩展文件上传属性，最大文件数量
   */
  maxFileNum?: number;
  /**
   * 扩展文件上传属性，最大单个文件大小（单位M）
   */
  maxFileSize?: number;
  /**
   * object中字段枚举
   */
  items?: JSONSchema | JSONSchema[] | JSONSchema7Definition | JSONSchema7Definition[];
}

/**
 * 单个扩展组件接收的props
 */
interface WidgetProps<Value = any, Options = any, FormContext = any>
  extends Omit<OriginWidgetProps, 'value' | 'defaultValue' | 'options' | 'onChange' | 'schema' | 'formContext'> {
  /**
   * 单个组件对应的表单描述schema
   */
  schema: JSONSchema;
  /**
   * 组件值
   */
  value?: Value;
  /**
   * 配置的默认值
   */
  defaultValue?: Value;
  /**
   * 组件options，配置在ui:options中的字段，会作为options传入
   */
  options: Options;
  /**
   * 值变化回调
   * @param v
   */
  onChange: (v?: Value) => void;
  /**
   * 表单上下文信息，通常业务使用的图片上传，错误处理等会在formContext中
   */
  formContext: FormContext;
}

type WidgetComponentType<V, O, F> = React.ComponentType<WidgetProps<V, O, F>>;
type Widget<V = any, O = any, F = any> =
  | WidgetComponentType<V, O, F>
  | MemoExoticComponent<WidgetComponentType<V, O, F>>
  | NamedExoticComponent<WidgetProps<V, O, F>>;

// 透传复杂类型描述
export {
  FieldProps,
  Field,
  FieldTemplateProps,
  ArrayFieldTemplateProps,
  ObjectFieldTemplateProps,
  FormValidation,
  AjvError,
  ErrorListProps,
  IChangeEvent,
  ISubmitEvent,
} from '@rjsf/core';

// eslint-disable-next-line no-undef
export { JSONSchema, WidgetProps, Widget };

/**
 * ScalableFormCore接收的props
 */
export interface ScalableFormCoreProps<FormData = unknown, FormContext = unknown>
  extends Omit<FormProps<FormData>, 'formContext' | 'schema' | 'widgets' | 'onError'> {
  /**
   * 表单描述schema
   */
  schema: JSONSchema;
  /**
   * 表单context，context中的内容，会透传到所有业务组件
   */
  formContext?: FormContext;
  /**
   * 表单扩展组件
   */
  widgets?: Record<string, Widget<any, any, FormContext>>;
  children?: ReactNode;
  /**
   * class前缀
   */
  prefixCls?: string;
}
