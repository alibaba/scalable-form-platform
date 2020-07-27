/**
 * Log数据类型
 */
export default interface LogParams {
  /**
   * Log业务code
   */
  code: string;
  /**
   * Log消息描述
   */
  message?: string;
  /**
   * Log时间戳
   */
  ts: number;
  /**
   * Log额外业务参数，用于扩展消息数据
   */
  payload?: any;
}
