type CommonVoidFunc = (...args: any[]) => void;

/**
 * 不处理返回值和 this 的 debounce
 *
 * @export
 * @template T
 * @param {T} func 无返回值函数
 * @param {number} wait 等待时间
 * @returns {T}
 */
export function simpleDebounce<T extends CommonVoidFunc>(func: T, wait: number) {
  let timer: number;

  const resultFunc = (...args: Parameters<T>) => {
    if (timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(() => func(...args), wait);
  };

  return resultFunc;
}
