var i18n = {};
var defaultLocale = 'en-us';

i18n['en-us'] = require('./en-us.js');

i18n['zh-cn'] = require('./zh-cn.js');

i18n['zh-tw'] = require('./zh-tw.js');

i18n['pt-pt'] = require('./pt-pt.js');

i18n['es-es'] = require('./es-es.js');

i18n['zh-hk'] = require('./zh-hk.js');

i18n['fr-fr'] = require('./fr-fr.js');

i18n['de-de'] = require('./de-de.js');

i18n['it-it'] = require('./it-it.js');

i18n['ko-kr'] = require('./ko-kr.js');

i18n['th-th'] = require('./th-th.js');

i18n['nl-nl'] = require('./nl-nl.js');

i18n['pl-pl'] = require('./pl-pl.js');

i18n['ms-my'] = require('./ms-my.js');

i18n['ur-pk'] = require('./ur-pk.js');

i18n['tl-ph'] = require('./tl-ph.js');

i18n['en-lk'] = require('./en-lk.js');

i18n['en-mm'] = require('./en-mm.js');

i18n['en-vn'] = require('./en-vn.js');

i18n['en-my'] = require('./en-my.js');

i18n['en-bd'] = require('./en-bd.js');

i18n['en-ph'] = require('./en-ph.js');

i18n['en-sg'] = require('./en-sg.js');

i18n['ne-np'] = require('./ne-np.js');

i18n['in-id'] = require('./in-id.js');

i18n['my-mm'] = require('./my-mm.js');

i18n['uk-ua'] = require('./uk-ua.js');

i18n['tr-tr'] = require('./tr-tr.js');

i18n['ja-jp'] = require('./ja-jp.js');

i18n['ru-ru'] = require('./ru-ru.js');

i18n['ar-sa'] = require('./ar-sa.js');

i18n['vi-vn'] = require('./vi-vn.js');

i18n['iw-il'] = require('./iw-il.js');

i18n['hi-in'] = require('./hi-in.js');

i18n['bn-bd'] = require('./bn-bd.js');

i18n['si-lk'] = require('./si-lk.js');

i18n['en-th'] = require('./en-th.js');

i18n['en-pk'] = require('./en-pk.js');

i18n['en-np'] = require('./en-np.js');


for (var locale in i18n) {
  if(!i18n.hasOwnProperty(locale)){
    continue;
  }
  if(locale == defaultLocale){
    continue;
  }
  for(var key in i18n[defaultLocale]){
    if(!i18n[defaultLocale].hasOwnProperty(key)){
      continue;
    }
    if(!i18n[locale].hasOwnProperty(key)){
      i18n[locale][key] = i18n[defaultLocale][key];
    }
  }
}

//把其它信息也加上去
i18n.appName = 'xform';
i18n.groupName = 'xform.client.xform-antd-mobile';
i18n.defaultLocale = defaultLocale;

module.exports = i18n;

