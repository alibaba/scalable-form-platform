import FormData from './FormData';
import { AjvError } from '@rjsf/core';

/**
 * ScalableForm在ref中返回的实例instance定义，通过ref可以调用实例方法
 */
export default interface ScalableFormInstance {
  /**
   * 获得当前表单数据FormData
   * @returns {FormData}
   */
  getData: () => FormData;
  /**
   * 触发表单submit事件，表单会进行validate并且触发onSubmit回调
   */
  submit: () => void;
  /**
   * 触发表单数据校验，返回的errors如果为空数组，表示校验成功
   * @returns {{errors: AjvError[]}}
   */
  validate: () => { errors: AjvError[] };
}
