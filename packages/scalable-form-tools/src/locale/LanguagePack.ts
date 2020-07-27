import Locale from './Locale';
import Lang from './Lang';

type P<L extends Locale> = {
  [K in L]?: Lang;
};

/**
 * 语言包数据结构
 */
type LanguagePack = P<Locale>;

export default LanguagePack;
