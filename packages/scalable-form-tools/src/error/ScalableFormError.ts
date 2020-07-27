import ErrorCode from './ErrorCode';

/**
 * ScalableForm通用错误，扩展了code属性
 */
export default class ScalableFormError extends Error {
  /**
   * ScalableForm错误码
   */
  public code: ErrorCode | string;

  constructor(code: ErrorCode | string, e: Error) {
    super(e.message);
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
