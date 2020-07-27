import LogParams from './LogParams';

/**
 * 如果用户没有传logFunc函数，使用默认log（console.debug）
 * @param {LogParams} params
 */
export function defaultLogFunc(params: LogParams): void {
  // eslint-disable-next-line no-console
  console.debug('default log func: ', params);
}

export interface LogFunc {
  (params: LogParams): void;
}

/**
 * Logger，各组件可以从formContext中获得Logger实例，用于日志记录
 */
export default class Logger {
  private readonly logFunc: LogFunc;

  constructor(logFunc: LogFunc) {
    this.logFunc = logFunc || defaultLogFunc;
  }

  /**
   * 组件展示时事件，推荐使用useLogWidgetPV对组件PV进行触发，并且在logFunc中对埋点数据进行记录
   * @param {string} widgetName
   */
  public logWidgetPV = (widgetName: string) => {
    this.logEvent('widget', `show ${widgetName}`);
  };

  /**
   * 事件记录
   * @param {string} code
   * @param {string} message
   * @param payload
   */
  public logEvent = (code: string, message?: string, payload?: any) => {
    if (this.logFunc) {
      this.logFunc({
        code,
        message,
        ts: Date.now(),
        payload,
      });
    }
  };
}
