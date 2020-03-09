import * as CONST from '../common/const';
import {request} from '../common/request';
import {getFieldsBySchema, getSchema, isSchemaLegal} from '../common/fields';
import { message } from 'antd';
import {getMessageId} from '../i18n/localeMessages';
import Logger from "../logger";

function formatDataSourceListData(data, messages) {
    const result = data.map((item) => {
        return {
            label: item.sourceName,
            value: item.sourceCode
        };
    });
    return [{
        label: messages[getMessageId('actionCreatorsDefaultDataSource')],
        value: ''
    }].concat(result);
}

let logger = null;
export function setLogger(originLogger) {
    logger = originLogger;
}

function getLogger() {
    if(logger){
        return logger;
    } else {
        return new Logger(() => {});
    }
}
const actionCreators = {

    // 更新编辑中的field数据
    updateEditFieldData(fieldData, namespace) {
        return {
            type: CONST.XFORM_BUILDER_UPDATE_EDIT_FIELD,
            data: fieldData,
            namespace
        };
    },

    // 更新整个fields数据
    updateFields(fields, namespace) {
        return {
            type: CONST.XFORM_BUILDER_INIT_FIELDS,
            data: fields,
            namespace
        };
    },

    // 获取builder的基础配置（包括系统字段、通用模板、业务属性、选项业务属性）
    fetchInitConfig: (params, messages, resolve, reject) => {
        const {bizCode, formCode, locale, systemFieldSupport, commonFieldSupport, bizDataSupport, langConfigSupport, supportLangList, systemTemplate, commonTemplate, attributeTemplate, optionTemplate, customInterfaces, customGateway, namespace, env} = params;

        // 开启多语言配置的场景下，判断设置的locale属性在不在supportLangList中，如果不在，给一个warning
        if (langConfigSupport) {
            if (supportLangList && supportLangList.indexOf(locale) <= -1) {
                console.warn('[xform-editor]配置的locale属性值不在supportLangList中，将默认设置' + supportLangList[0] + '作为多语言设置的默认语言');
            }
        }
        return (dispatch) => {
            request.fetch(request.getInterface('getInitConfig', customInterfaces, env), {
                currentLang: locale,
                supportedLangs: supportLangList && supportLangList.join(','),
                bizCode,
                formCode,
                systemTemplate,
                commonTemplate,
                attributeTemplate,
                optionTemplate
            }, customGateway, env).then((data) => {
                if (systemFieldSupport) {
                    if (data && data.systemTemplate && data.systemTemplate.fields) {
                        dispatch({
                            type: CONST.XFORM_BUILDER_UPDATE_SYSTEM_FIELDS,
                            data: data.systemTemplate.fields,
                            namespace
                        });
                    } else {
                        console.warn('[xform-editor]getInitConfig接口缺少systemTemplate字段');
                        getLogger().logException('xformBuilder.getInitConfig.missingSystemTemplate', true);
                    }
                }
                if (commonFieldSupport) {
                    if (data && data.commonTemplate && data.commonTemplate.fields) {
                        dispatch({
                            type: CONST.XFORM_BUILDER_UPDATE_COMMON_FIELDS,
                            data: data.commonTemplate.fields,
                            namespace
                        });
                    } else {
                        console.warn('[xform-editor]getInitConfig接口缺少commonTemplate字段');
                        getLogger().logException('xformBuilder.getInitConfig.missingCommonTemplate', true);
                    }
                }
                if (bizDataSupport) {
                    if (data && data.attributeTemplate && data.attributeTemplate.fields) {
                        dispatch({
                            type: CONST.XFORM_BUILDER_UPDATE_BIZ,
                            data: data.attributeTemplate.fields,
                            namespace
                        });
                    } else {
                        console.warn('[xform-editor]getInitConfig接口缺少attributeTemplate字段');
                        getLogger().logException('xformBuilder.getInitConfig.missingAttributeTemplate', true);
                    }
                    if (data && data.optionTemplate && data.optionTemplate.fields) {
                        dispatch({
                            type: CONST.XFORM_BUILDER_UPDATE_OPTION_BIZ,
                            data: data.optionTemplate.fields,
                            namespace
                        });
                    } else {
                        console.warn('[xform-editor]]getInitConfig接口缺少optionTemplate字段');
                        getLogger().logException('xformBuilder.getInitConfig.missingOptionTemplate', true);
                    }
                }

                // 多语言配置版本
                if (langConfigSupport) {
                    if (data && data.langs && data.defaultLang) {
                        dispatch({
                            type: CONST.XFORM_BUILDER_UPDATE_LANGS,
                            data: {
                                langs: data.langs,
                                defaultLang: data.defaultLang,
                                currentLang: data.defaultLang
                            },
                            namespace
                        });
                    } else {
                        console.warn('[xform-editor]getInitConfig接口缺少字段langs和defaultLang字段');
                        getLogger().logException('xformBuilder.getInitConfig.missingOptionTemplate', true);
                    }
                }

                resolve(data);
            }).catch((error) => {
                message.error(messages[getMessageId('actionCreatorsGetInitConfigErrorTip')] + error.message);
                getLogger().logException('xformBuilder.getInitConfigFields', true);
                console.error('[xform-editor]' + messages[getMessageId('actionCreatorsGetInitConfigErrorTip')] + error.message);
                reject(error);
            });
        };
    },

    // 通过服务端重新获取多语言配置数据
    refetchLangConfig: (params, messages, currentLang) => {
        const {bizCode, formCode, locale, langConfigSupport, supportLangList, systemTemplate, commonTemplate, attributeTemplate, optionTemplate, customInterfaces, customGateway, namespace, env} = params;
        return (dispatch) => {
            request.fetch(request.getInterface('getInitConfig', customInterfaces, env), {
                currentLang: locale,
                supportedLangs: supportLangList && supportLangList.join(','),
                bizCode,
                formCode,
                systemTemplate,
                commonTemplate,
                attributeTemplate,
                optionTemplate
            }, customGateway, env).then((data) => {

                // 多语言配置版本
                if (langConfigSupport) {
                    if (data && data.langs && data.defaultLang) {
                        dispatch({
                            type: CONST.XFORM_BUILDER_UPDATE_LANGS,
                            data: {
                                langs: data.langs,
                                defaultLang: data.defaultLang,
                                currentLang
                            },
                            namespace
                        });
                    } else {
                        console.warn('[xform-editor]getInitConfig接口缺少字段langs和defaultLang字段');
                        getLogger().logException('xformBuilder.getInitConfig.missingOptionTemplate', true);
                    }
                }

            }).catch((error) => {
                message.error(messages[getMessageId('actionCreatorsGetInitConfigErrorTip')] + error.message);
                getLogger().logException('xformBuilder.getInitConfigFields', true);
                console.error('[xform-editor]' + messages[getMessageId('actionCreatorsGetInitConfigErrorTip')] + error.message);
            });
        };
    },

    // 更新store中的langs多语言部分数据
    updateLangConfig: (langConfig, namespace) => {
        return {
            type: CONST.XFORM_BUILDER_UPDATE_LANGS,
            data: langConfig,
            namespace
        };
    },

    // 清空多语言配置
    clearLangConfig: (namespace) => {
        return {
            type: CONST.XFORM_BUILDER_CLEAR_LANGS,
            data: null,
            namespace
        };
    },

    // 更新全局配置
    updateGlobalConfig: (globalConfig, namespace) => {
        return {
            type: CONST.XFORM_BUILDER_UPDATE_GLOBAL_CONFIG,
            data: globalConfig,
            namespace
        };
    },

    // 清空系统字段数据
    clearSystemFieldData: (namespace) => {
        return {
            type: CONST.XFORM_BUILDER_CLEAR_SYSTEM_FIELDS,
            data: [],
            namespace
        };
    },

    // 清空通用字段数据
    clearCommonFieldData: (namespace) => {
        return {
            type: CONST.XFORM_BUILDER_CLEAR_COMMON_FIELDS,
            data: [],
            namespace
        };
    },

    // 清空业务属性
    clearBizData: (namespace) => {
        return {
            type: CONST.XFORM_BUILDER_CLEAR_BIZ,
            data: [],
            namespace
        }
    },

    // 清空选项业务属性
    clearOptionBizData: (namespace) => {
        return {
            type: CONST.XFORM_BUILDER_CLEAR_OPTION_BIZ,
            data: [],
            namespace
        }
    },

    // 获取生效字段初始field数据
    fetchSelectedFieldData(params, filterSystemFields, messages) {
        const {systemFieldSupport, langConfigSupport, formCode, lang, customInterfaces, customGateway, namespace, env} = params;
        let fields, requestParam = {};
        return (dispatch, getState) => {
            if (typeof params.formCode === 'undefined' || params.formCode === '') {
                // 新建表单
                if (params.jsonSchema) {
                    const schema = getSchema(params.jsonSchema, params.uiSchema, params.formData, params.bizData, params.sequence);
                    const data = getFieldsBySchema(schema);
                    if (data && data.fields) {
                        fields = data.fields;
                        if (!systemFieldSupport || filterSystemFields) {
                            fields = fields.filter((field) => {
                                return field.fieldType !== 'system';
                            });
                        }
                        dispatch({
                            type: CONST.XFORM_BUILDER_INIT_FIELDS,
                            data: fields,
                            namespace
                        });
                        return;
                    }
                }
                fields = getState().xformBuilderData[namespace].systemFields;
                if (!systemFieldSupport || filterSystemFields) {
                    fields = fields.filter((field) => {
                        return field.fieldType !== 'system';
                    });
                }
                // 初始更新store的fields(更新为store.systemFields)
                dispatch({
                    type: CONST.XFORM_BUILDER_INIT_FIELDS,
                    data: fields,
                    namespace
                });
            } else {
                // 在老的表单的基础上编辑
                if (langConfigSupport) {
                    requestParam = {
                        formCode,  // formCode用来决定是新建还是编辑更新
                        lang
                    };
                } else {
                    requestParam = {
                        formCode  // formCode用来决定是新建还是编辑更新
                    };
                }
                let useGetSchemaByCode = true;
                if (customInterfaces && !customInterfaces.getSchemaByCode) {
                    useGetSchemaByCode = false;
                    console.warn('[xform-editor]please set getSchemaByCode in customInterfaces');
                    getLogger().logException('NO xformBuilder.getSchemaByCode', true);
                }
                const apiName = useGetSchemaByCode ? 'getSchemaByCode' : 'getSelectedFieldsData';
                request.fetch(request.getInterface(apiName, customInterfaces, env), requestParam, customGateway, env).then((originData) => {
                    let data = originData;
                    if (useGetSchemaByCode && originData) {
                        if (isSchemaLegal(originData)) {
                            data = getFieldsBySchema(originData);
                        } else {
                            throw new Error('json schema is not legal');
                        }
                    }
                    if (data && ('fields' in data)) {
                        fields = data.fields;
                        if (!systemFieldSupport || filterSystemFields) {
                            fields = fields.filter((field) => {
                                return field.fieldType !== 'system';
                            });
                        }
                        // 初始更新store的fields
                        dispatch({
                            type: CONST.XFORM_BUILDER_INIT_FIELDS,
                            data: fields,
                            namespace
                        });
                    } else {
                        console.warn('[xform-editor]获取初始selectedFieldData缺少fields字段');
                        getLogger().logException('xformBuilder.getSelectedFields', true);
                        // 如果接口数据格式错误，则默认无生效字段
                        dispatch({
                            type: CONST.XFORM_BUILDER_INIT_FIELDS,
                            data: [],
                            namespace
                        });
                    }
                }).catch((error) => {
                    message.error(messages[getMessageId('actionCreatorsGetSelectFieldErrorTip')] + error.message);
                    // 如果接口调用失败，则默认无生效字段
                    dispatch({
                        type: CONST.XFORM_BUILDER_INIT_FIELDS,
                        data: [],
                        namespace
                    });
                    getLogger().logException('xformBuilder.getSelectedFields', true);
                    console.error('[xform-editor]' + messages[getMessageId('actionCreatorsGetSelectFieldErrorTip')] + error.message);
                });
            }
        };
    },

    // 获取动态校验器列表
    fetchServerCodeList(params, messages) {
        const {customInterfaces, customGateway, namespace, env} = params;
        return (dispatch) => {
            request.fetch(request.getInterface('getServerCheckListData', customInterfaces, env), {}, customGateway, env)
                .then((data) => {
                    if (data && typeof data.data !== 'undefined' && data.data.length > 0) {
                        dispatch({
                            type: CONST.XFORM_BUILDER_GET_SERVER_CODE,
                            data: data.data,
                            namespace
                        });
                    } else {
                        console.warn('[xform-editor]获取动态校验器配置接口缺少data字段');
                        getLogger().logException('xformBuilder.getServerCheckListData', true);
                        // 如果数据源接口格式错误，则默认为空列表
                        dispatch({
                            type: CONST.XFORM_BUILDER_GET_SERVER_CODE,
                            data: [{
                                label: messages[getMessageId('actionCreatorsDefaultDataSource')],
                                value: ''
                            }],
                            namespace
                        });
                    }
                }).catch((error) => {
                    message.error(messages[getMessageId('actionCreatorsGetServerCodeErrorTip')]  + error.message);
                    // 如果出错，则默认为空列表
                    dispatch({
                        type: CONST.XFORM_BUILDER_GET_SERVER_CODE,
                        data: [{
                            label: messages[getMessageId('actionCreatorsDefaultDataSource')],
                            value: '',
                            namespace
                        }]
                    });
                    getLogger().logException('xformBuilder.getServerCheckListData', true);
                    console.error('[xform-editor]' + messages[getMessageId('actionCreatorsGetServerCodeErrorTip')]  + error.message);
                });
        };
    },

    /**
    // 获取字段级配置数据源列表
    fetchFieldDataSourceList(params, messages) {
        const {customInterfaces, customGateway, namespace, env} = params;
        return (dispatch) => {
            request.fetch(request.getInterface('getDataSourceListData', customInterfaces, env), {
                pageNo: 1,
                pageSize: 2000,
                dataSourceParamJson: JSON.stringify({
                    sourceTypeList: ['FIELD_DATA', 'HSF_OPTION', 'SOP_CATEGORY', 'DEFAULT_VALUE']
                })
            }, customGateway, env, {type: 'POST'}).then((data) => {
                if (data && typeof data.data !== 'undefined' && data.data.length > 0) {
                    dispatch({
                        type: CONST.XFORM_BUILDER_GET_DATASOURCE,
                        data: formatDataSourceListData(data.data, messages),
                        namespace
                    });
                } else {
                    console.warn('[xform-editor]获获取数据源配置接口缺少data字段');
                    if (typeof XT !== 'undefined') {
                        XT('xform.exception', 'xformBuilder.getDataSourceList', true);
                    }
                    // 如果数据源接口格式错误，则默认传入“无数据源”配置项
                    dispatch({
                        type: CONST.XFORM_BUILDER_GET_DATASOURCE,
                        data: [{
                            label: messages[getMessageId('actionCreatorsDefaultDataSource')],
                            value: ''
                        }],
                        namespace
                    });
                }
            }).catch((error) => {
                message.error(messages[getMessageId('actionCreatorsGetDataSourceErrorTip')] + error.message);
                // 如果出错，则默认传入“无数据源”配置项
                dispatch({
                    type: CONST.XFORM_BUILDER_GET_DATASOURCE,
                    data: [{
                        label: messages[getMessageId('actionCreatorsDefaultDataSource')],
                        value: '',
                        namespace
                    }]
                });
                if (typeof XT !== 'undefined') {
                    XT('xform.exception', 'xformBuilder.getDataSourceList', true);
                }
                console.error('[xform-editor]' + messages[getMessageId('actionCreatorsGetDataSourceErrorTip')] + error.message);
            });
        };
    },
    */

    // 获取字段级配置数据源列表
    fetchFieldDataSourceList(params, messages) {
        const {customInterfaces, customGateway, namespace, env} = params;
        return (dispatch) => {
            request.fetch(request.getInterface('dataSourceServerUrl', customInterfaces, env), {
                sourceCode: 'dataSourceList',
                params: {},
                stringifyParams: JSON.stringify({})
            }, customGateway, env, {type: 'POST'}).then((data) => {
                if (data && typeof data.data !== 'undefined' && data.data.length > 0) {
                    dispatch({
                        type: CONST.XFORM_BUILDER_GET_DATASOURCE,
                        data: data.data,
                        namespace
                    });
                } else {
                    console.warn('[xform-editor]获获取数据源配置接口缺少data字段');
                    getLogger().logException('xformBuilder.getDataSourceList', true);
                    // 如果数据源接口格式错误，则默认传入“无数据源”配置项
                    dispatch({
                        type: CONST.XFORM_BUILDER_GET_DATASOURCE,
                        data: [{
                            label: messages[getMessageId('actionCreatorsDefaultDataSource')],
                            value: ''
                        }],
                        namespace
                    });
                }
            }).catch((error) => {
                message.error(messages[getMessageId('actionCreatorsGetDataSourceErrorTip')] + error.message);
                // 如果出错，则默认传入“无数据源”配置项
                dispatch({
                    type: CONST.XFORM_BUILDER_GET_DATASOURCE,
                    data: [{
                        label: messages[getMessageId('actionCreatorsDefaultDataSource')],
                        value: '',
                        namespace
                    }]
                });
                getLogger().logException('xformBuilder.getDataSourceList', true);
                console.error('[xform-editor]' + messages[getMessageId('actionCreatorsGetDataSourceErrorTip')] + error.message);
            });
        };
    },

    // 获取表单级配置数据源列表
    fetchFormDataSourceList(params, messages) {
        const {customInterfaces, customGateway, namespace, env} = params;
        return (dispatch) => {
            request.fetch(request.getInterface('getDataSourceListData', customInterfaces, env), {
                pageNo: 1,
                pageSize: 2000,
                dataSourceParamJson: JSON.stringify({
                    sourceTypeList: ['FORM_DATA']
                })
            }, customGateway, env, {type: 'POST'}).then((data) => {
                if (data && data.data && data.data.length > 0) {
                    dispatch({
                        type: CONST.XFORM_BUILDER_GET_FORM_DATASOURCE,
                        data: formatDataSourceListData(data.data, messages),
                        namespace
                    });
                } else {
                    console.warn('[xform-editor]获获取数据源配置接口缺少data字段');
                    getLogger().logException('xformBuilder.getDataSourceList', true);
                    // 如果数据源接口格式错误，则默认传入“无数据源”配置项
                    dispatch({
                        type: CONST.XFORM_BUILDER_GET_FORM_DATASOURCE,
                        data: [{
                            label: messages[getMessageId('actionCreatorsDefaultDataSource')],
                            value: ''
                        }],
                        namespace
                    });
                }
            }).catch((error) => {
                message.error(messages[getMessageId('actionCreatorsGetDataSourceErrorTip')] + error.message);
                // 如果出错，则默认传入“无数据源”配置项
                dispatch({
                    type: CONST.XFORM_BUILDER_GET_FORM_DATASOURCE,
                    data: [{
                        label: messages[getMessageId('actionCreatorsDefaultDataSource')],
                        value: '',
                        namespace
                    }]
                });
                getLogger().logException('xformBuilder.getDataSourceList', true);
                console.error('[xform-editor]' + messages[getMessageId('actionCreatorsGetDataSourceErrorTip')] + error.message);
            });
        };
    },

    // 生效字段中添加field数据
    addSelectedFieldData(fieldData, namespace) {
        return {
            type: CONST.XFORM_BUILDER_ADD_FIELDS,
            data: fieldData,
            namespace
        };
    },

    // 生效字段索引为index的位置增加一个fieldData字段数据
    addFieldDataWithIndex(fieldData, index, namespace) {
        return {
            type: CONST.XFORM_BUILDER_ADD_FIELDS_WITH_INDEX,
            data: {
                fieldData: fieldData,
                index: index
            },
            namespace
        };
    },

    // 生效字段中删除field数据
    deleteSelectedFieldData(code, namespace) {
        return {
            type: CONST.XFORM_BUILDER_DELETE_FIELDS,
            data: code,
            namespace
        };
    },

    // 生效字段中更新field某项数据
    updateSelectedFieldItemData(code, fieldData, namespace) {
        return {
            type: CONST.XFORM_BUILDER_UPDATE_FIELDS_ITEM,
            data: {
                code,
                fieldData
            },
            namespace
        }
    }
};

export default actionCreators;
