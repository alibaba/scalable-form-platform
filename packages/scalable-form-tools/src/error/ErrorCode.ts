/**
 * ScalableForm错误码
 */
enum ErrorCode {
  /**
   * 由componentDidCatch捕获，出现于渲染时，可能导致组件渲染崩溃
   * @type {string}
   */
  UI_ERROR = 'UI_ERROR',
  /**
   * 业务错误，即由于使用sdk的扩展属性导致的出错（扩展函数执行出错等），这类错误需要使用sdk的业务方自行解决
   * @type {string}
   */
  BIZ_ERROR = 'BIZ_ERROR',
}

export default ErrorCode;
