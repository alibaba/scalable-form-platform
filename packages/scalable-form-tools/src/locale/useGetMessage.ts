import { useContext } from 'react';
import LocaleContext from './LocaleContext';
import getMessageByKey from './getMessageByKey';

/**
 * 根据messageKey，获得i18n国际化文案
 *
 * @export
 * @hooks
 *
 * @param {string} messageKey 文案key
 * @param {string} defaultMessage 默认文案
 * @returns {string} 国际化文案
 */
export default function useGetMessage(messageKey: string, defaultMessage?: string) {
  const { locale, localMessages, languagePack } = useContext(LocaleContext);
  return getMessageByKey(messageKey, locale, localMessages, languagePack) || defaultMessage;
}
