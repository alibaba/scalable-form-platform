/**
 * 公用util模块
 */

import * as CONST from './const';

const util = {

    /**
     * 从registerWidgets属性中获取注入XForm组件中的数据内容
     */
    getXFormCustomWidgets: (registerWidgets) => {
        let xformRegisterWidgets = {};
        let widgetType = '';
        registerWidgets.map((widget) => {
            if (typeof widget.schema.uiSchema['ui:widget'] !== 'undefined') {
                widgetType = widget.schema.uiSchema['ui:widget'];
                xformRegisterWidgets[widgetType] = widget.component;
            } else {
                console.warn('xformBuilder:注册的customWidget没有指定ui:widget');
            }
        });
        return xformRegisterWidgets;
    },

    /**
     * 从url中获取参数值
     * @param key 待获取的参数的key值（默认不进行编码处理）
     */
    getParamsFromUrl: (key) => {
        if (!key) {
            return;
        }
        let params = location.href.slice(location.href.indexOf('?') + 1).split('&');
        let paramsObj = {};
        let splitParams;
        params.forEach((param) => {
            splitParams = param.split('=');
            paramsObj[splitParams[0]] = splitParams[1];
        });
        if (paramsObj[key]) {
            return paramsObj[key];
        } else {
            return '';
        }
    },

    /**
     * 生成随机len位数的字符串
     * @param len
     */
    getRandomString: (len) => {
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

    /**
     * 从localStorage中获取数据
     * @param key 获取字段的key值，不传该参数则代表获取命名空间下所有配置数据
     */
    getXFormLocalStorage: (key) => {
        const namespace = CONST.LOCALSTORAGE_NAMESPACE;
        const localStorageData = window.localStorage.getItem(namespace);
        if (!key) {
            return JSON.parse(localStorageData);
        } else {
            if (localStorageData !== null) {
                return JSON.parse(localStorageData)[key] || null;
            } else {
                return null;
            }
        }
    },

    /**
     * 更新localStorage中的数据
     * @param data 待更新的数据
     */
    setXFormLocalStorage: (data) => {
        const namespace = CONST.LOCALSTORAGE_NAMESPACE;
        const localStorageData = window.localStorage.getItem(namespace);
        if (localStorageData !== null) {
            window.localStorage.setItem(namespace, JSON.stringify({
                ...JSON.parse(localStorageData),
                ...data
            }));
        } else {
            window.localStorage.setItem(namespace, JSON.stringify(data));
        }
    },

    /**
     * 判断当前字段类型是否能够支持当前的适配端，默认不支持
     **/
    _isInConfigPlatform: (configPlatform, platform) => {
        if (platform === 'both') {
            return configPlatform.indexOf('laptop') > -1 && configPlatform.indexOf('mobile') > -1;
        } else if (platform === 'laptop' || platform === 'mobile') {
            return configPlatform.indexOf(platform) > -1;
        } else {
            return false;
        }
    }

};

export {util};
