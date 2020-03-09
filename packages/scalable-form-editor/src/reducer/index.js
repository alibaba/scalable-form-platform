import * as CONST from '../common/const';

const initialState = {
    dataSource: [{
        label: '',
        value: ''
    }],
    formDataSource: [{
        label: '',
        value: ''
    }],
    serverCode: [{
        label: '',
        value: ''
    }],
    fields: [],
    systemFields: [],
    commonFields: [],
    xformBizData: [],
    xformOptionBizData: [],
    editFieldData: null,
    langs: {
        langs: [],
        defaultLang: '',
        currentLang: ''
    },
    globalConfig: {
        codeEditable: false,
        fieldPreviewable: false
    }
};

const reducer = (state, action) => {

    let code, index, fieldData;
    const namespace = action.namespace;

    if (typeof state === 'undefined') {
        state = {...initialState};   // 这里为了初始化冗余了一些数据，实际需要获取的数据都在对应的namespace中
    }

    if (typeof namespace !== 'undefined' && typeof state[namespace] === 'undefined') {
        state[namespace] = {...initialState};
    }

    switch (action.type) {

        // 更新字段数据源
        case CONST.XFORM_BUILDER_GET_DATASOURCE:
            return {
                ...state,
                [namespace]: {
                    ...state[namespace],
                    dataSource: action.data
                }
            }

        // 更新表单字段数据源
        case CONST.XFORM_BUILDER_GET_FORM_DATASOURCE:
            return {
                ...state,
                [namespace]: {
                    ...state[namespace],
                    formDataSource: action.data
                }
            }

        // 更新动态校验器列表
        case CONST.XFORM_BUILDER_GET_SERVER_CODE:
            return {
                ...state,
                [namespace]: {
                    ...state[namespace],
                    serverCode: action.data
                }
            };
        // 对xform field配置的处理
        // 初始化
        case CONST.XFORM_BUILDER_INIT_FIELDS:
            return {
                ...state,
                [namespace]: {
                    ...state[namespace],
                    fields: action.data
                }
            };
        // 添加
        case CONST.XFORM_BUILDER_ADD_FIELDS:
            return {
                ...state,
                [namespace]: {
                    ...state[namespace],
                    fields: state[namespace].fields.concat([action.data])
                }
            };
        // 在某个索引处添加
        case CONST.XFORM_BUILDER_ADD_FIELDS_WITH_INDEX:
            fieldData = action.data.fieldData;
            index = action.data.index;
            return {
                ...state,
                [namespace]: {
                    ...state[namespace],
                    fields: state[namespace].fields.slice(0, index).concat(fieldData).concat(state[namespace].fields.slice(index, state[namespace].fields.length))
                }
            };
        // 删除
        case CONST.XFORM_BUILDER_DELETE_FIELDS:
            code = action.data;
            index = -1;
            state[namespace].fields.map((field, i) => {
                if (field.code === code) {
                    index = i;
                }
            });
            if (index <= -1) {
                return state;
            } else {
                return {
                    ...state,
                    [namespace]: {
                        ...state[namespace],
                        fields: state[namespace].fields.slice(0, index).concat(state[namespace].fields.slice(index + 1, state[namespace].fields.length))
                    }
                };
            }
        // 更新
        case CONST.XFORM_BUILDER_UPDATE_FIELDS_ITEM:
            code = action.data.code;
            index = -1;
            fieldData = action.data.fieldData;
            let hasItem = false;
            state[namespace].fields.map((field, fieldIndex) => {
                if (field.code === code) {
                    hasItem = true;
                    index = fieldIndex;
                }
            });
            if (hasItem) {
                return {
                    ...state,
                    [namespace]: {
                        ...state[namespace],
                        fields: state[namespace].fields.slice(0, index).concat(fieldData).concat(state[namespace].fields.slice(index + 1, state[namespace].fields.length))
                    }
                };
            } else {
                return {
                    ...state,
                    [namespace]: {
                        ...state[namespace],
                        fields: state[namespace].fields.concat(fieldData)
                    }
                };
            }
        // 系统字段数据
        case CONST.XFORM_BUILDER_UPDATE_SYSTEM_FIELDS:
            return {
                ...state,
                [namespace]: {
                    ...state[namespace],
                    systemFields: action.data
                }
            };
        case CONST.XFORM_BUILDER_CLEAR_SYSTEM_FIELDS:
            return {
                ...state,
                [namespace]: {
                    ...state[namespace],
                    systemFields: []
                }
            };
        // 通用字段配置数据
        case CONST.XFORM_BUILDER_UPDATE_COMMON_FIELDS:
            return {
                ...state,
                [namespace]: {
                    ...state[namespace],
                    commonFields: action.data
                }
            };
        case CONST.XFORM_BUILDER_CLEAR_COMMON_FIELDS:
            return {
                ...state,
                [namespace]: {
                    ...state[namespace],
                    commonFields: []
                }
            };
        // xform业务属性配置数据
        case CONST.XFORM_BUILDER_UPDATE_BIZ:
            return {
                ...state,
                [namespace]: {
                    ...state[namespace],
                    xformBizData: action.data
                }
            };
        case CONST.XFORM_BUILDER_CLEAR_BIZ:
            return {
                ...state,
                [namespace]: {
                    ...state[namespace],
                    xformBizData: []
                }
            };
        // xform选项通用业务属性配置数据
        case CONST.XFORM_BUILDER_UPDATE_OPTION_BIZ:
            return {
                ...state,
                [namespace]: {
                    ...state[namespace],
                    xformOptionBizData: action.data
                }
            };
        case CONST.XFORM_BUILDER_CLEAR_OPTION_BIZ:
            return {
                ...state,
                [namespace]: {
                    ...state[namespace],
                    xformOptionBizData: []
                }
            };
        // 编辑中的fieldData数据
        case CONST.XFORM_BUILDER_UPDATE_EDIT_FIELD:
            return {
                ...state,
                [namespace]: {
                    ...state[namespace],
                    editFieldData: action.data
                }
            };
        // 更新多语言配置
        case CONST.XFORM_BUILDER_UPDATE_LANGS:
            return {
                ...state,
                [namespace]: {
                    ...state[namespace],
                    langs: action.data
                }
            };

        // 清空多语言配置
        case CONST.XFORM_BUILDER_CLEAR_LANGS:
            return {
                ...state,
                [namespace]: {
                    ...state[namespace],
                    langs: {
                        langs: [],
                        defaultLang: '',
                        currentLang: ''
                    }
                }
            }

        // 更新全局统一配置（目前主要是查看Code和字段内容预览）
        case CONST.XFORM_BUILDER_UPDATE_GLOBAL_CONFIG:
            return {
                ...state,
                [namespace]: {
                    ...state[namespace],
                    globalConfig: action.data
                }
            };

        default:
            return state;
    }

};

export default reducer;
