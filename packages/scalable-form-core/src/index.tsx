import React from 'react';
import Form, { AjvError, Widget } from '@rjsf/core';
import FormData from './model/FormData';
import { ScalableFormCoreProps } from './types';
import { JSONSchema7 } from 'json-schema';
import ReactJsonSchemaFormState from './model/ReactJsonSchemaFormState';

/**
 * ScalableFormCore核心组件，用于解析schema协议，使用原生HTML组件进行渲染
 */
class ScalableFormCore extends React.PureComponent<ScalableFormCoreProps> {
  static defaultProps = {
    prefixCls: 'scalable-form',
    formContext: {},
    widgets: {},
  };

  private jsonSchemaInstance: Form<any> | null;

  /**
   * 获得当前ScalableFormCore中用户填写的数据FormData
   * @returns {FormData | null}
   */
  getData = (): FormData | null => {
    const state = (this.jsonSchemaInstance?.state || {}) as ReactJsonSchemaFormState;
    return state.formData || null;
  };

  /**
   * 触发ScalableFormCore的onSubmit事件，ScalableForm会自动执行校验，校验成功后，从onSubmit中返回提交数据
   */
  submit = (): void => {
    if (this.jsonSchemaInstance) {
      this.jsonSchemaInstance.submit();
    }
  };

  /**
   * 触发ScalableForm的表单校验逻辑，并返回校验结果
   * @returns {{errors: AjvError[]}}
   */
  validate = (): { errors: AjvError[] } => {
    const state = (this.jsonSchemaInstance?.state || {}) as ReactJsonSchemaFormState;
    const { formData = null } = state;
    return this.jsonSchemaInstance?.validate(formData) || { errors: [] };
  };

  render() {
    const { uiSchema, prefixCls, children, className, ...restProps } = this.props;
    return (
      <div className={`${this.props.prefixCls}-root-container ${className || ''}`}>
        <Form
          {...restProps}
          uiSchema={uiSchema}
          widgets={this.props.widgets as { [name: string]: Widget }}
          schema={this.props.schema as JSONSchema7}
          ref={(ref) => {
            this.jsonSchemaInstance = ref;
          }}
        >
          {this.props.children}
        </Form>
      </div>
    );
  }
}

export default ScalableFormCore;
export * from './types';
export { UiSchema } from '@rjsf/core';
export { default as FormData } from './model/FormData';
