/**
 * 表单字段非空校验
 * @private
 */
export function isEmpty(value, widgetType) {
    // 根据schema的约定，input类型和uploader两种类型的ui:widget为空字符串
    if (widgetType !== '') {
        if (widgetType !== 'array') {
            return typeof value === 'undefined' ||
                (typeof value === 'string' && value === '') ||
                // 对于有些object类型的数据结构，会使用JSON.stringify处理为string类型
                (typeof value === 'string' && value === '{}') ||
                (typeof value === 'object' && JSON.stringify(value) === '[]') ||
                (typeof value === 'object' && JSON.stringify(value) === '{}');
        } else {
            return JSON.stringify(value) === '[]' ||
                JSON.stringify(value) === '[""]' ||
                JSON.stringify(value) === '[[]]';
        }
    } else {
        return (typeof value === 'string' && value === '') ||
            // 对于图片或文件上传类型，要判断value里面项目是否为done
            (typeof value === 'object' && value.filter((item) => {
                return item.status === 'done';
            }).length <= 0);
    }
}

/**
 * 验证是否为身份证号
 * @param id 身份证号
 * @return {boolean}
 */
export function isId(id) {
    if (typeof id === 'undefined') {
        return false;
    }
    if (typeof id === 'string') {
        id = id.trim();
    }
    const reg = /\d{17}[0-9xX]/;
    return reg.test(id);
}

/**
 * url验证(当输入为空时要通过验证，非空验证逻辑要拆出来)
 * @param url
 * @returns {boolean}
 */
export function isUrl(url) {
    if (typeof url !== 'string') {
        return false;
    }
    // url中不能出现空格
    if (url.indexOf(' ') > -1) {
        return false;
    }
    let strRegex = "^((https|http):\/\/)?"
        + "(((([0-9]|1[0-9]{2}|[1-9][0-9]|2[0-4][0-9]|25[0-5])[.]{1}){3}([0-9]|1[0-9]{2}|[1-9][0-9]|2[0-4][0-9]|25[0-5]))" //  IP>形式的URL- 199.194.52.184
        + "|"
        + "([0-9a-zA-Z\u4E00-\u9FA5\uF900-\uFA2D-]+[.]{1})+[a-zA-Z-]+)" //  DOMAIN（域名）形式的URL
        + "(:[0-9]{1,4})?" //  端口- :80
        + "((/?)|(/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+/?){1}";
    let re = new RegExp(strRegex);
    return re.test(url.trim());
}

/**
 * 邮箱验证(当输入为空时要通过验证，非空验证逻辑要拆出来)
 * @param str
 * @returns {boolean}
 */
export function isEmail(str) {
    if (typeof str !== 'string') {
        return false;
    }
    let reg = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return reg.test(str.trim());
}

/**
 * 全部是数字验证，主要用于填写一些ID的地方(当输入为空时要通过验证，非空验证逻辑要拆出来)
 * @param str
 * @returns {boolean}
 */
export function isDigit(str) {
    if (typeof str === 'undefined') {
        return false;
    }
    if (typeof str === 'string') {
        str = str.trim();
    }
    let reg = /^\d+$/;
    return reg.test(str);
}

/**
 * 金额校验，可带小数点，小数点后最多两位
 * @param str
 * @returns {boolean}
 */
export function isMoney(str) {
    if (typeof str === 'undefined') {
        return false;
    }
    if (typeof str === 'string') {
        str = str.trim();
    }
    let reg = /^(([1-9]\d*)|\d)(\.\d{1,2})?$/;
    return reg.test(str);
}

/**
 * 电话验证，这里只做是不是11为数字的验证(当输入为空时要通过验证，非空验证逻辑要拆出来)
 * @param tel
 * @returns {boolean}
 */
export function isTel(tel) {
    if (typeof tel === 'undefined') {
        return false;
    }
    if (typeof tel === 'string') {
        tel = tel.trim();
    }
    let reg = /^\d{11}$/;
    return reg.test(tel);
}
