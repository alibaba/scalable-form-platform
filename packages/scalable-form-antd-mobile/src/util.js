/**
 * 公用工具类方法
 */

const utils = {
    formatDate : (date, style) => {
        if (!date) {
            return;
        }
        if (!style) {
            style = 'yyyy-MM-dd hh:mm:ss';
        }
        if (typeof date == 'string' || typeof date == 'number') {
            date = new Date(date);
        }
        let y = date.getFullYear();
        let M = "0" + (date.getMonth() + 1);
        M = M.substring(M.length - 2);
        let d = "0" + date.getDate();
        d = d.substring(d.length - 2);
        let h = "0" + date.getHours();
        h = h.substring(h.length - 2);
        let m = "0" + date.getMinutes();
        m = m.substring(m.length - 2);
        let s = "0" + date.getSeconds();
        s = s.substring(s.length - 2);
        return style.replace('yyyy', y).replace('MM', M).replace('dd', d).replace('hh', h).replace('mm', m).replace('ss', s);
    },

    /*
    * 生成随机len位数的字符串
    * @param len
    */
    randomString: (len) => {
       len = len || 16;
       var $firstChars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';  // 字符串首字符集合
       var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
       var maxPos = $chars.length;
       var pwd = '';
       for (var i = 0; i < len; i++) {
           if (i === 0) {
               pwd += $firstChars.charAt(Math.floor(Math.random() * $firstChars.length));
           } else {
               pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
           }
       }
       return pwd;
   },

   getTreeRootValue: () => {
       return 'xform-tree-root';
   }
};

export default utils;
