import ScalableFormError from './ScalableFormError';

interface onError {
  (e: ScalableFormError): void;
}

/**
 * 默认error处理，如果用户没有传onError属性，会直接通过console.error打印错误日志
 * @param {ScalableFormError} e
 */
export const defaultErrorHandler: onError = (e: ScalableFormError) => {
  // eslint-disable-next-line no-console
  console.error(`${Date.now()}: Error ${e.code}, ${e.message}`, e);
};
