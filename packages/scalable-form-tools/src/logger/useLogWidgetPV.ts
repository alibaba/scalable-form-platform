import { useEffect, useContext } from 'react';
import LoggerContext from './LoggerContext';

/**
 * 组件展示时事件，推荐使用useLogWidgetPV对组件PV进行触发，并且在logFunc中对埋点数据进行记录
 * @param {string} widgetName
 * @param {any[]} deps
 */
export function useLogWidgetPV(widgetName: string, deps: any[] = []) {
  const logger = useContext(LoggerContext);
  useEffect(() => {
    logger.logWidgetPV(widgetName);
    // 默认情况，只需要log一次，如果需要多次打点，可以通过deps控制
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
