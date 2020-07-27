import React, { createContext } from 'react';
import Locale from './Locale';
import LanguagePack from './LanguagePack';
import LocalMessages from './LocalMessages';

interface LocaleContextProps {
  locale: Locale;
  languagePack: LanguagePack;
  localMessages: LocalMessages;
}
/**
 * 组件获得当前国际化语言标记
 * @type {React.Context<Locale>}
 */
const LocaleContext: React.Context<LocaleContextProps> = createContext<LocaleContextProps>({
  locale: Locale.ZH_CN,
  languagePack: {},
  localMessages: {},
});

export default LocaleContext;
