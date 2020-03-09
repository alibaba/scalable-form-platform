/**
 * xform-builder数据请求模块
 */

import nattyFetch from 'natty-fetch';

/**
 * 使用reqwest发起的jsonp http请求（仅在本地调试环境用）
 * @param ajaxUrl
 * @param ajaxParams
 * @param ajaxOptions
 * @return Promise
 */
const commonAjax = (ajaxUrl, ajaxParams, env, ajaxOptions = {}) => {
    if (typeof ajaxUrl === 'string' && ajaxUrl.length > 0) {

        // ajax配置，默认为jsonp get请求
        let method = ajaxOptions.type || 'GET';
        let jsonp = true;

        // post请求的场景不能用jsonp调用
        if (method.toUpperCase() === 'POST') {
            jsonp = false;
        }

        if (location.href.indexOf('xform-mock=true') > -1 || env === 'dev') {

            method = 'GET';
            jsonp = false;
        }

        let withCredentials = true;
        if (ajaxUrl && ajaxUrl.indexOf('alicdn') >= 0) {
            withCredentials = false;
        }

        return new Promise((resolve, reject) => {
            const nattyFetchRequest = nattyFetch.create({
                url: ajaxUrl,
                data: ajaxParams,
                withCredentials,
                method: method.toUpperCase(),
                jsonp,
                urlMark: false,
                urlStamp: false,
                fit: (response, vars) => {
                    if (response.success) {
                        return {
                            success: response.success,
                            content: response.data
                        };
                    } else {
                        return {
                            success: response.success,
                            error: response.data
                        };
                    }
                }
            });

            nattyFetchRequest().then((data) => {
                resolve(data);
            }).catch((error) => {
                console.warn('xform:接口' + ajaxUrl + '调用失败:', error);
                reject(error);
            });
        });
    } else {
        console.warn('xform:' + '未传入有效的ajax url！');
    }

};


const commonCustomRequest = (api, params, customGateway, env, options = {}) => {
    if (typeof customGateway === 'object' && typeof customGateway.request === 'function') {
        if (typeof api === 'string' && api.length > 0) {
            if (location.href.indexOf('xform-mock=true') > -1 || env === 'dev') {
                return commonAjax(api, params, env, options);
            } else {
                const defaultOptions = {};
                // mix options
                for (const key in options) {
                    if (options.hasOwnProperty(key)) {
                        defaultOptions[key] = options[key];
                    }
                }
                const nattyFetchCustomRequest = nattyFetch.create({
                    data: Object.assign({}, defaultOptions, {
                        api: api,
                        data: params
                    }),
                    plugins: [customGateway.request]
                });

                return new Promise((resolve, reject) => {
                    nattyFetchCustomRequest().then((data) => {
                        resolve(data);
                    }).catch((error) => {
                        // error里面必须包含message字段
                        reject(error);
                        console.error('[xform-editor]', error);
                    });
                });
            }
        } else {
            console.warn('未传入有效的api！');
        }
    } else {
        console.warn('未传入customGateway属性，或customGateway属性格式不正确。必须为：{request: [Function]}');
    }

};

const request = {

    /**
     * 根据gateway不同获取不同接口
     */
    getInterface: (name, customInterfaces, env) => {
        let result = '';
        const interfaces = {
            mock: {
                getSchemaByCode:'/getJsonSchemaByCode.json',
                getDataSourceListData: '/getDataSourceList.json',
                getServerCheckListData: '/getServerCheckList.json',
                getInitConfig: '/getInitConfig.json',
                getSelectedFieldsData: '/getSelectedFieldsData.json',
                saveFieldsData: '/saveFieldsData.json',
                updateFieldsData: '/updateFieldsData.json',
                dataSourceServerUrl: '/datasource.json'
            },
            local: {
                dataSourceServerUrl: '//g.alicdn.com/xform/xform-open/0.0.3/xform-mock/datasource.json',
                getSchemaByCode: '//g.alicdn.com/xform/xform-open/0.0.3/xform-mock/getSchemaByCode.json',
                serverCheck: '//g.alicdn.com/xform/xform-open/0.0.3/xform-mock/serverCheck.json',
                getDataSourceListData: '//g.alicdn.com/xform/xform-open/0.0.3/xform-mock/getDataSourceList.json',
                getServerCheckListData: '//g.alicdn.com/xform/xform-open/0.0.3/xform-mock/getServerCheckList.json',
                getInitConfig: '//g.alicdn.com/xform/xform-open/0.0.3/xform-mock/getInitConfig.json',
                getSelectedFieldsData: '//g.alicdn.com/xform/xform-open/0.0.3/xform-mock/getSelectedFieldsData.json',
                saveFieldsData: '//g.alicdn.com/xform/xform-open/0.0.3/xform-mock/saveFieldsData.json',
                updateFieldsData: '//g.alicdn.com/xform/xform-open/0.0.3/xform-mock/updateFieldsData.json',
            }
        };
        if (location.href.indexOf('xform-mock=true') > -1) {
            // mock=true为xform自己进行开发调试的后门
            result = interfaces.mock[name];
        } else if (env === 'dev') {
            result = interfaces.local[name];
        } else {
            if (typeof customInterfaces === 'object') {
                if (typeof customInterfaces[name] !== 'undefined') {
                    result = customInterfaces[name];
                } else {
                    console.warn('xform:设置了customInterfaces属性，但是未设置【' + name + '】字段');
                }
            } else {
                console.warn('xform:未设置必要的customInterfaces属性字段');
            }
        }
        return result;
    },

    /**
     * 区分网关的fetch方法
     */
    fetch: (fetchApi, fetchParams, customGateway, env, fetchOptions = {}) => {
        if (typeof customGateway === 'object' && typeof customGateway.request === 'function') {
            return commonCustomRequest(fetchApi, fetchParams, customGateway, env, fetchOptions);
        } else {
            return commonAjax(fetchApi, fetchParams, env, fetchOptions);
        }
    }
};

export {request};
