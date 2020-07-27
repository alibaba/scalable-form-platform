import LanguagePack from './LanguagePack';
import Locale from './Locale';
import LocalMessages from './LocalMessages';

function getMessageById(messageId: string, locale: Locale, languagePack: LanguagePack): string {
  const id = `xform.client.${messageId}`;
  const lang = languagePack[locale] || {};
  return lang[id] || '';
}

export default function getMessageByKey(
  messageKey: string,
  locale: Locale,
  localMessages: LocalMessages,
  languagePack: LanguagePack,
): string {
  const localMessage: {
    id: string;
    defaultMessage: string;
  } = localMessages[messageKey] || {};
  if (localMessage.id) {
    const result = getMessageById(localMessage.id, locale, languagePack);
    if (result) {
      return result;
    } else {
      return localMessage.defaultMessage || '';
    }
  }
  return '';
}
