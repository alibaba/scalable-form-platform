var i18n = {};
var defaultLocale = 'en-us';

i18n['en-us'] = require('./en-us.js');

i18n['ru-ru'] = require('./ru-ru.js');

i18n['hi-in'] = require('./hi-in.js');

i18n['zh-tw'] = require('./zh-tw.js');

i18n['ko-kr'] = require('./ko-kr.js');

i18n['fr-fr'] = require('./fr-fr.js');

i18n['zh-cn'] = require('./zh-cn.js');

i18n['in-id'] = require('./in-id.js');

i18n['ar-sa'] = require('./ar-sa.js');

i18n['tr-tr'] = require('./tr-tr.js');

i18n['pl-pl'] = require('./pl-pl.js');

i18n['de-de'] = require('./de-de.js');

i18n['es-es'] = require('./es-es.js');

i18n['it-it'] = require('./it-it.js');

i18n['nl-nl'] = require('./nl-nl.js');

i18n['vi-vn'] = require('./vi-vn.js');

i18n['pt-pt'] = require('./pt-pt.js');

i18n['iw-il'] = require('./iw-il.js');

i18n['th-th'] = require('./th-th.js');

i18n['ja-jp'] = require('./ja-jp.js');


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

