/**
 * 基于react-jsonschema-form的表单组件xform-core
 * @props: env（指定xform组件当前运行的环境，dev表示开发环境、prod表示生产环境；默认值为生产环境） locale（当前使用的语言） popupContainer（xform组件内部使用的popup渲染的根节点，默认为xform组件的Root Element） widgets(为react-jsonschema-form注册的自定义widget) fields(为react-jsonschema-form注册的自定义field) fieldTemplate（为react-jsonschema-form注册的自定义普通类型字段模板）arrayFieldTemplate(为react-jsonschema-form注册的自定义array类型字段模板) objectFieldTemplate(为react-jsonschema-form注册的自定义object类型字段模板) formContext（为react-jsonschema-form注册的formContext，通过这个上下文属性，在自定义子组件中可以获取到这些数据） defaultSubmitButtonComponent(渲染组件自定义的默认提交按钮，必填)     disabled（是否设置表单各项为禁用状态） readonly（是否设置表单各项为只读态） validation（表单校验的方法，允许传入一个自定义校验方法，组件不会中断标单提交，需要业务自行实现） beforeDataSourceFetch（在数据源请求执行之前注入的方法，会传入数据源code，当前的formData和bizData作为参数） formCode（表单的formCode，根据formCode可以自动获取表单相应的信息渲染出来表单） customGateway（自定义网关） mockInterfaces(自定义接口mock数据的配置) customInterfaces（自定义服务端请求配置） customUploadRequest（自定义上传方法，指定后则不会走默认的xform的OSS上传） jsonSchema（描述表单的jsonSchema） uiSchema（描述表单的uiSchema） formData（描述表单初始数据的formData） bizData（描述表单的业务属性，这部分数据组件不做处理，只做传递，任何与表单的字段相关的业务属性均存储在这里，不能放置到jsonSchema中，防止污染） sequence（form的字段顺序设置，如果不设定该属性则按schema object的顺序） className（表单的自定义class值） onload（表单onload处理器，会传入初始的formData和bizData作为参数） onError（将组件catch的错误上报） onChange（表单change处理器，会传入formData和bizData作为参数） onSubmit（表单submit处理器，会传入formData和bizData作为参数）
 * @states: bizCode（xform使用场景的bizCode，图片上传等场景用来区分上传到的图片域） sequence（form的字段顺序设置，如果不设定该属性则按schema object的顺序） jsonSchema（描述表单的jsonSchema） uiSchema（uiSchema中的ui:options字段里面会包含表单的校验状态，联动状态，数据源状态等） formData（描述表单初始数据的formData） bizData（描述表单字段的业务属性）
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
import {isTel, isEmpty, isMoney, isId, isEmail, isDigit, isUrl} from './validate';
import {getOrderJsonSchemaBySequence, getOrderSchemaBySequence} from './tools';
import {request} from './request';
import Logger from "./logger";

const XFORM_HIDDEN_CLASS = 'xform-hidden';
const XFORM_ROOT_CLASS = 'xform-root-container';
const debugMode = location.search.indexOf('xform-debug') > -1;
let formRenderTime;
let taskSuccess = false; // 表单提交任务是否完成，防止重复发送success类型的task埋点
let isFormDirty = false; // 表单是否是dirty状态

// 表单校验类型，'live'表示实时校验，'submit'表示表单提交前校验，主要用在判断只在提交校验的场景下才进行服务端校验
let validateType = 'submit';

// 表单初始formData，用来做表单重置
let initFormData = {};

const XFORM_ROOT_ELEMENT = (triggerNode) => {
    let parentNode = triggerNode;
    while (parentNode.tagName.toLowerCase() !== 'body') {
        parentNode = parentNode.parentNode;
        if (parentNode.className.indexOf(XFORM_ROOT_CLASS) > -1) {
            return parentNode;
        }
    }
    return document.body;
};

const deepCloneObject = (obj) => {
    if (typeof obj !== 'object') {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.concat();
    } else {
        return JSON.parse(JSON.stringify(obj));
    }
};

class XFormCore extends Component {

    static propTypes = {
        env: PropTypes.oneOf(['dev', 'prod']),
        locale: PropTypes.string,
        popupContainer: PropTypes.func,
        fieldTemplate: PropTypes.func,
        arrayFieldTemplate: PropTypes.func,
        objectFieldTemplate: PropTypes.object,
        widgets: PropTypes.object,
        fields: PropTypes.object,
        formContext: PropTypes.object,
        defaultSubmitButtonComponent: PropTypes.element,
        formCode: PropTypes.string,
        customGateway: PropTypes.object,
        mockInterfaces: PropTypes.shape({
            dataSourceServerUrl: PropTypes.any,
            getSchemaByCode: PropTypes.any,
            serverCheck: PropTypes.any
        }),
        customInterfaces: PropTypes.shape({
            dataSourceServerUrl: PropTypes.any,
            getSchemaByCode: PropTypes.any,
            serverCheck: PropTypes.any
        }),
        customInterfacesParams: PropTypes.shape({
            dataSourceServerUrl: PropTypes.object,
            getSchemaByCode: PropTypes.object,
            serverCheck: PropTypes.object
        }),
        jsonSchema: PropTypes.object,
        uiSchema: PropTypes.object,
        formData: PropTypes.object,
        bizData: PropTypes.object,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        readonly: PropTypes.bool,
        sequence: PropTypes.array,
        beforeSchemaFetch: PropTypes.func,
        beforeDataSourceFetch: PropTypes.func,
        beforeServerCheck: PropTypes.func,
        validation: PropTypes.func,
        onload: PropTypes.func,
        onError: PropTypes.func,
        onChange: PropTypes.func,
        onSubmit: PropTypes.func,
        logEvent: PropTypes.func,
    };

    static defaultProps = {
        env: 'prod',
        popupContainer: XFORM_ROOT_ELEMENT,
        formContext: {},
        formCode: '',
        className: '',
        disabled: false,
        readonly: false,
        beforeSchemaFetch: function() { return {}; },
        beforeDataSourceFetch: function() { return {}; },
        beforeServerCheck: function() { return {}; },
        widgets: {},
        fields: {},
        validation: function() {return true;},
        onload: function() {},
        onChange: function() {},
        onSubmit: function() {},
    };

    constructor(props) {
        super(props);
        this._fieldHasDataSource = this._fieldHasDataSource.bind(this);
        this._isUpdateFieldsDataSource = this._isUpdateFieldsDataSource.bind(this);
        this._getFieldDataFromDataSource = this._getFieldDataFromDataSource.bind(this);
        this._fetchDataFromDataSource = this._fetchDataFromDataSource.bind(this);
        this._setAllFieldsBizData = this._setAllFieldsBizData.bind(this);
        this._setAllFieldsDisable = this._setAllFieldsDisable.bind(this);
        this._setAllFieldsReadonly = this._setAllFieldsReadonly.bind(this);
        this._setAllFieldsDisplayName = this._setAllFieldsDisplayName.bind(this);
        this._validate = this._validate.bind(this);
        this._validateField = this._validateField.bind(this);
        this._validateFieldSync = this._validateFieldSync.bind(this);
        this._updateFieldsData = this._updateFieldsData.bind(this);
        this._updateFieldsShow = this._updateFieldsShow.bind(this);
        this._shouldFieldHidden = this._shouldFieldHidden.bind(this);
        this._filterExportData = this._filterExportData.bind(this);
        this._handleXFormChange = this._handleXFormChange.bind(this);
        this._handleXFormSubmit = this._handleXFormSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.XFormSubmit = this.XFormSubmit.bind(this);
        this.XFormInitFormData = this.XFormInitFormData.bind(this);
        this.XFormReset = this.XFormReset.bind(this);
        this.XFormSetFormData = this.XFormSetFormData.bind(this);
        this.XFormCurrentFormData = this.XFormCurrentFormData.bind(this);
        this.XFormBizData = this.XFormBizData.bind(this);
        this.XFormValidate = this.XFormValidate.bind(this);
        this.XFormValidateSync = this.XFormValidateSync.bind(this);
        this.XFormFetchAllFromDataSource = this.XFormFetchAllFromDataSource.bind(this);
        this.XFormFetchFromDataSource = this.XFormFetchFromDataSource.bind(this);
        const logEvent = props.logEvent || (() => {});
        this.logger = new Logger(logEvent);
        this.state = {
            sequence: [],
            jsonSchema: {
                description: '',
                title: '',
                type: 'object',
                properties: {}
            },
            uiSchema: {},
            formData: {},
            bizData: {}
        };
    }

    componentWillMount() {
        // 初始化xform schema
        let {env, locale, formCode, sequence, jsonSchema, uiSchema, formData, bizData, customGateway, customInterfaces, mockInterfaces, customInterfacesParams, onload} = this.props;
        let fieldName, jsonSchemaProperties;
        let fetchSchemaParams = {}, dataSourcePromises = [];
        this.logger.logPageView();
        if (typeof formCode === 'string' && formCode.length > 0) {
            if (typeof this.props.beforeSchemaFetch === 'function') {
                fetchSchemaParams = this.props.beforeSchemaFetch(formCode);
            }
            // 根据formCode获取schema，属性中对应的值优先
            request.fetch(request.getInterface('getSchemaByCode', customInterfaces, env, mockInterfaces), Object.assign({}, fetchSchemaParams, {
                formCode: formCode,
                lang: locale
            }, (customInterfacesParams && customInterfacesParams.getSchemaByCode) || {}), customGateway, env, {type: 'POST'}).then((data) => {
                if (typeof data.jsonSchema !== 'undefined' &&
                    typeof data.uiSchema !== 'undefined' &&
                    typeof data.formData !== 'undefined' &&
                    typeof data.bizData !== 'undefined' &&
                    typeof data.sequence !== 'undefined') {

                    jsonSchema = jsonSchema || data.jsonSchema;
                    uiSchema = uiSchema || data.uiSchema;
                    formData = (typeof formData !== 'undefined') ? Object.assign({}, data.formData, formData) : data.formData;
                    bizData = (typeof bizData !== 'undefined') ? Object.assign({}, data.bizData, bizData) : data.bizData;
                    sequence = sequence || data.sequence;

                    // 保存初始formData
                    initFormData = formData;

                    // 在bizData中设置字段的初始disabled和readonly状态
                    bizData = this._setAllFieldsBizData(bizData, uiSchema, jsonSchema);

                    this.setState({
                        jsonSchema: deepCloneObject(jsonSchema),
                        uiSchema: deepCloneObject(uiSchema),
                        formData: deepCloneObject(formData),
                        bizData: deepCloneObject(bizData),
                        sequence: deepCloneObject(sequence)
                    }, () => {
                        dataSourcePromises = [];
                        // 这里要通过jsonSchema来进行字段遍历，只有jsonSchema中能够保证表单字段的完整性，其它字段都有可能会出现字段缺失的情形
                        jsonSchemaProperties = jsonSchema.properties;
                        for (fieldName in jsonSchemaProperties) {
                            if (jsonSchemaProperties.hasOwnProperty(fieldName)) {
                                // 初始获取更新全部没有被配置联动的数据源
                                if (this._fieldHasDataSource(fieldName, jsonSchema) && !this._isUpdateFieldsDataSource(fieldName, uiSchema)) {
                                    dataSourcePromises.push(this._getFieldDataFromDataSource(fieldName, true));
                                }
                            }
                        }

                        Promise.all(dataSourcePromises).then((data) => {
                            data.map((resolveFormData) => {
                                formData = Object.assign({}, formData, resolveFormData);
                            });
                            for (fieldName in jsonSchemaProperties) {
                                if (jsonSchemaProperties.hasOwnProperty(fieldName)) {
                                    // 初始化级联数据源
                                    if (uiSchema[fieldName] && uiSchema[fieldName]['ui:options'] && uiSchema[fieldName]['ui:options'].updateFields && uiSchema[fieldName]['ui:options'].updateFields.length > 0) {

                                        this._updateFieldsData(fieldName, formData[fieldName], uiSchema[fieldName]['ui:options'].updateFields);
                                    }
                                }
                            }
                        }).catch((error) => {
                            console.warn(error);
                        });

                        // 触发onload属性
                        onload(formData, bizData);
                    });
                    if (debugMode) {
                        console.log('formCode init formData', formData);
                    }

                } else {
                    console.warn('xform: getSchemaByCode接口返回缺乏必要的参数');
                    this.logger.logException('xform.getSchemaByCode', true);
                }
            }).catch((error) => {
                console.warn('xform:获取xform schema接口失败：' + error.message);
                this.logger.logException('xform.getSchemaByCode', true);
            });
        } else if (typeof jsonSchema !== 'undefined' &&
            typeof uiSchema !== 'undefined' &&
            typeof formData !== 'undefined') {
            // 根据组件属性来初始化xform schema
            // 保存初始formData
            initFormData = formData;

            // 在bizData中设置字段的初始disabled和readonly状态
            bizData = this._setAllFieldsBizData(bizData, uiSchema, jsonSchema);

            this.setState({
                jsonSchema: deepCloneObject(jsonSchema),
                uiSchema: deepCloneObject(uiSchema),
                formData: deepCloneObject(formData),
                bizData: deepCloneObject(bizData),
                sequence: typeof sequence !== 'undefined' ? deepCloneObject(sequence) : []
            }, () => {
                dataSourcePromises = [];
                // 这里要通过jsonSchema来进行字段遍历，只有jsonSchema中能够保证表单字段的完整性，其它字段都有可能会出现字段缺失的情形
                jsonSchemaProperties = jsonSchema.properties;
                for (fieldName in jsonSchemaProperties) {
                    if (jsonSchemaProperties.hasOwnProperty(fieldName)) {
                        // 初始获取更新全部没有被配置联动的数据源
                        if (this._fieldHasDataSource(fieldName, jsonSchema) && !this._isUpdateFieldsDataSource(fieldName, uiSchema)) {
                            dataSourcePromises.push(this._getFieldDataFromDataSource(fieldName, true));
                        }
                    }
                }

                Promise.all(dataSourcePromises).then((data) => {
                    data.map((resolveFormData) => {
                        formData = Object.assign({}, formData, resolveFormData);
                    });
                    for (fieldName in jsonSchemaProperties) {
                        if (jsonSchemaProperties.hasOwnProperty(fieldName)) {
                            // 初始化级联数据源
                            if (uiSchema[fieldName] && uiSchema[fieldName]['ui:options'] && uiSchema[fieldName]['ui:options'].updateFields && uiSchema[fieldName]['ui:options'].updateFields.length > 0) {

                                this._updateFieldsData(fieldName, formData[fieldName], uiSchema[fieldName]['ui:options'].updateFields);
                            }
                        }
                    }
                }).catch((error) => {
                    console.warn(error);
                });

                // 触发onload属性
                onload(formData, bizData);
            });
            if (debugMode) {
                console.log('schema init formData', formData);
            }
        } else {
            console.warn('xform: 至少传入formCode属性或jsonSchema、uiSchema、formData三个属性');
        }
    }

    componentDidMount() {
        // 发送表单Dirty率任务类型埋点
        this.logger.logTask('表单Dirty率');
        // 记录xform渲染完成时间，用来计算表单填写计时
        formRenderTime = new Date().getTime();
        // 所有form禁用Enter提交
        const formNodeListArray = Array.prototype.slice.call(document.querySelectorAll('form'));
        formNodeListArray.forEach((form) => {
            form.onkeypress = (event) => {
                const txtArea = /textarea/i.test((event.target || event.srcElement).tagName);
                return txtArea || (event.keyCode || event.which || event.charCode || 0) !== 13;
            };
        });
    }

    componentDidCatch(error, info) {
        const {onError} = this.props;
        if (typeof onError === 'function') {
            onError(error, info);
        }
        console.error('[xform-core] error', error);
    }

    componentWillReceiveProps(nextProps) {
        let jsonSchema, uiSchema, formData, bizData, sequence;
        let fieldName, jsonSchemaProperties, prevFormData;
        let fetchSchemaParams = {}, dataSourcePromises = [];
        const {env, locale, customInterfaces, mockInterfaces, customGateway, customInterfacesParams, onload} = nextProps;

        if (nextProps.formCode !== '') {
            if (nextProps.formCode !== this.props.formCode) {
                if (debugMode) {
                    console.log('formCode compare:',
                        nextProps.formCode !== this.props.formCode);
                    console.log('nextProps.formCode:', nextProps.formCode);
                    console.log('this.props.formCode:', this.props.formCode);
                }
                if (typeof nextProps.beforeSchemaFetch === 'function') {
                    fetchSchemaParams = nextProps.beforeSchemaFetch(nextProps.formCode);
                }
                // 根据formCode获取schema，属性中对应的值优先
                request.fetch(request.getInterface('getSchemaByCode', customInterfaces, env, mockInterfaces), Object.assign({}, fetchSchemaParams, {
                    formCode: nextProps.formCode,
                    lang: locale
                }, (customInterfacesParams && customInterfacesParams.getSchemaByCode) || {}), customGateway, env, {type: 'POST'}).then((data) => {
                    if (typeof data.jsonSchema !== 'undefined' &&
                        typeof data.uiSchema !== 'undefined' &&
                        typeof data.formData !== 'undefined' &&
                        typeof data.bizData !== 'undefined' &&
                        typeof data.sequence !== 'undefined') {

                        jsonSchema = nextProps.jsonSchema || data.jsonSchema;
                        uiSchema = nextProps.uiSchema || data.uiSchema;
                        formData = (typeof nextProps.formData !== 'undefined') ? Object.assign({}, data.formData, nextProps.formData) : data.formData;
                        bizData = (typeof nextProps.bizData !== 'undefined') ? Object.assign({}, data.bizData, nextProps.bizData) : data.bizData;
                        sequence = nextProps.sequence || data.sequence;

                        // 在bizData中设置字段的初始disabled和readonly状态
                        bizData = this._setAllFieldsBizData(bizData, uiSchema, jsonSchema);

                        this.setState({
                            jsonSchema: deepCloneObject(jsonSchema),
                            uiSchema: deepCloneObject(uiSchema),
                            formData: deepCloneObject(formData),
                            bizData: deepCloneObject(bizData),
                            sequence: deepCloneObject(sequence)
                        }, () => {
                            // 更改了formCode，要触发数据源的更新
                            dataSourcePromises = [];
                            // 这里要通过jsonSchema来进行字段遍历，只有jsonSchema中能够保证表单字段的完整性，其它字段都有可能会出现字段缺失的情形
                            jsonSchemaProperties = jsonSchema.properties;
                            for (fieldName in jsonSchemaProperties) {
                                if (jsonSchemaProperties.hasOwnProperty(fieldName)) {
                                    // 初始获取更新全部没有被配置联动的数据源
                                    if (this._fieldHasDataSource(fieldName, jsonSchema) && !this._isUpdateFieldsDataSource(fieldName, uiSchema)) {
                                        dataSourcePromises.push(this._getFieldDataFromDataSource(fieldName, true));
                                    }
                                }
                            }

                            Promise.all(dataSourcePromises).then((data) => {
                                data.map((resolveFormData) => {
                                    formData = Object.assign({}, formData, resolveFormData);
                                });
                                for (fieldName in jsonSchemaProperties) {
                                    if (jsonSchemaProperties.hasOwnProperty(fieldName)) {
                                        // 初始化级联数据源
                                        if (uiSchema[fieldName] && uiSchema[fieldName]['ui:options'] && uiSchema[fieldName]['ui:options'].updateFields && uiSchema[fieldName]['ui:options'].updateFields.length > 0) {

                                            this._updateFieldsData(fieldName, formData[fieldName], uiSchema[fieldName]['ui:options'].updateFields);
                                        }
                                    }
                                }
                            }).catch((error) => {
                                console.warn(error);
                            });

                            // 触发onload属性
                            onload(formData, bizData);
                        });

                        if (debugMode) {
                            console.log('formCode componentWillReceiveProps formData', formData);
                        }
                    } else {
                        console.warn('xform: getSchemaByCode接口返回缺乏必要的参数');
                        this.logger.logException('xform.getSchemaByCode', true);
                    }
                }).catch((error) => {
                    console.warn('xform:获取schema接口失败：' + error.message);
                    this.logger.logException('xform.getSchemaByCode', true);
                });
            } else if (JSON.stringify(nextProps.formData) !== JSON.stringify(this.props.formData)) {

                // 使用formCode的场景，更新formData属性依旧要触发重渲染
                if (debugMode) {
                    console.log('formData compare:',
                        JSON.stringify(nextProps.formData) !== JSON.stringify(this.props.formData));
                    console.log('nextProps.formData:', nextProps.formData);
                    console.log('this.props.formData:', this.props.formData);
                }

                jsonSchema = this.state.jsonSchema;
                uiSchema = this.state.uiSchema;
                formData = nextProps.formData;
                prevFormData = this.props.formData || {};

                this.setState({
                    formData: deepCloneObject(formData)
                }, () => {
                    // 这里要通过jsonSchema来进行字段遍历，只有jsonSchema中能够保证表单字段的完整性，其它字段都有可能会出现字段缺失的情形
                    jsonSchemaProperties = jsonSchema.properties;
                    for (fieldName in jsonSchemaProperties) {
                        if (jsonSchemaProperties.hasOwnProperty(fieldName) && formData[fieldName] !== prevFormData[fieldName]) {
                            // 更新级联数据源（formData更新的场景，一定不是整个表单重加载，因而只需要触发级联数据源的更新）
                            if (uiSchema[fieldName] && uiSchema[fieldName]['ui:options'] &&
                                uiSchema[fieldName]['ui:options'].updateFields &&
                                uiSchema[fieldName]['ui:options'].updateFields.length > 0) {

                                this._updateFieldsData(fieldName, formData[fieldName], uiSchema[fieldName]['ui:options'].updateFields);
                            }
                        }
                    }
                });

            } else if (JSON.stringify(nextProps.bizData) !== JSON.stringify(this.props.bizData)) {

                // 使用formCode的场景，更新bizData属性依旧要触发重渲染
                if (debugMode) {
                    console.log('bizData compare:',
                        JSON.stringify(nextProps.bizData) !== JSON.stringify(this.props.bizData));
                    console.log('nextProps.bizData:', nextProps.bizData);
                    console.log('this.props.bizData:', this.props.bizData);
                }

                bizData = nextProps.bizData;
                this.setState({
                    bizData: deepCloneObject(bizData)
                });

            } else if (JSON.stringify(nextProps.sequence) !== JSON.stringify(this.props.sequence)) {

                // 使用formCode的场景，更新sequence属性依旧要触发重渲染
                if (debugMode) {
                    console.log('sequence compare:',
                        JSON.stringify(nextProps.sequence) !== JSON.stringify(this.props.sequence));
                    console.log('nextProps.sequence:', nextProps.sequence);
                    console.log('this.props.sequence:', this.props.sequence);
                }

                sequence = nextProps.sequence;
                this.setState({
                    sequence: deepCloneObject(sequence)
                });
            }
        } else {

            if (debugMode) {
                console.log('jsonSchema compare:',
                    JSON.stringify(nextProps.jsonSchema) !== JSON.stringify(this.props.jsonSchema));
                console.log('uiSchema compare:',
                    JSON.stringify(nextProps.uiSchema) !== JSON.stringify(this.props.uiSchema));
                console.log('formData compare:',
                    JSON.stringify(nextProps.formData) !== JSON.stringify(this.props.formData));
                console.log('bizData compare:',
                    JSON.stringify(nextProps.bizData) !== JSON.stringify(this.props.bizData));
                console.log('sequence compare:',
                    JSON.stringify(nextProps.sequence) !== JSON.stringify(this.props.sequence));
            }

            jsonSchema = nextProps.jsonSchema;
            jsonSchemaProperties = jsonSchema.properties;
            uiSchema = nextProps.uiSchema;
            formData = nextProps.formData;
            bizData = nextProps.bizData;
            sequence = nextProps.sequence;
            prevFormData = this.props.formData || {};

            // 在bizData中设置字段的初始disabled和readonly状态
            bizData = this._setAllFieldsBizData(bizData, uiSchema, jsonSchema);

            if (JSON.stringify(nextProps.jsonSchema) !== JSON.stringify(this.props.jsonSchema) || JSON.stringify(nextProps.uiSchema) !== JSON.stringify(this.props.uiSchema)) {

                this.setState({
                    jsonSchema: deepCloneObject(jsonSchema),
                    uiSchema: deepCloneObject(uiSchema),
                    formData: deepCloneObject(formData),
                    bizData: deepCloneObject(bizData),
                    sequence: deepCloneObject(sequence)
                }, () => {
                    // uiSchema的props更新了，这时全部数据源都要重新获取一遍
                    dataSourcePromises = [];
                    // 这里要通过jsonSchema来进行字段遍历，只有jsonSchema中能够保证表单字段的完整性，其它字段都有可能会出现字段缺失的情形
                    for (fieldName in jsonSchemaProperties) {
                        if (jsonSchemaProperties.hasOwnProperty(fieldName)) {
                            // 初始获取更新全部没有被配置联动的数据源
                            if (this._fieldHasDataSource(fieldName, jsonSchema) && !this._isUpdateFieldsDataSource(fieldName, uiSchema)) {
                                dataSourcePromises.push(this._getFieldDataFromDataSource(fieldName, true));
                            }
                        }
                    }

                    Promise.all(dataSourcePromises).then((data) => {
                        data.map((resolveFormData) => {
                            formData = Object.assign({}, formData, resolveFormData);
                        });
                        for (fieldName in jsonSchemaProperties) {
                            if (jsonSchemaProperties.hasOwnProperty(fieldName)) {
                                // 初始化级联数据源
                                if (uiSchema[fieldName] && uiSchema[fieldName]['ui:options'] && uiSchema[fieldName]['ui:options'].updateFields && uiSchema[fieldName]['ui:options'].updateFields.length > 0) {

                                    this._updateFieldsData(fieldName, formData[fieldName], uiSchema[fieldName]['ui:options'].updateFields);
                                }
                            }
                        }
                    }).catch((error) => {
                        console.warn(error);
                    });

                    // 触发onload属性
                    onload(formData, bizData);
                });
            } else if (JSON.stringify(nextProps.formData) !== JSON.stringify(this.props.formData) ||
            JSON.stringify(nextProps.bizData) !== JSON.stringify(this.props.bizData) ||
            JSON.stringify(nextProps.sequence) !== JSON.stringify(this.props.sequence)) {

                this.setState({
                    formData: deepCloneObject(formData),
                    bizData: deepCloneObject(bizData),
                    sequence: deepCloneObject(sequence)
                }, () => {
                    // 这里要通过jsonSchema来进行字段遍历，只有jsonSchema中能够保证表单字段的完整性，其它字段都有可能会出现字段缺失的情形
                    for (fieldName in jsonSchemaProperties) {
                        if (jsonSchemaProperties.hasOwnProperty(fieldName) && formData[fieldName] !== prevFormData[fieldName]) {
                            // 初始化级联数据源（formData更新的场景，一定不是整个表单重加载，因而只需要触发级联数据源的更新）
                            if (uiSchema[fieldName] && uiSchema[fieldName]['ui:options'] &&
                                uiSchema[fieldName]['ui:options'].updateFields &&
                                uiSchema[fieldName]['ui:options'].updateFields.length > 0) {

                                this._updateFieldsData(fieldName, formData[fieldName], uiSchema[fieldName]['ui:options'].updateFields);
                            }
                        }
                    }
                });
            }

        }
    }

    // 验证一个字段是否有配置数据源
    _fieldHasDataSource(fieldName, jsonSchema) {
        jsonSchema = jsonSchema || this.state.jsonSchema;
        const jsonSchemaProperties = jsonSchema.properties;
        const jsonSchemaContent = jsonSchemaProperties[fieldName];
        return typeof jsonSchemaContent === 'object' && typeof jsonSchemaContent.dataSource === 'string' && jsonSchemaContent.dataSource !== '';
    }

    // 验证一个字段的数据源配置是否配置过数据源级联
    _isUpdateFieldsDataSource(name, uiSchema) {
        let result = false;
        uiSchema = uiSchema || this.state.uiSchema;
        for (let fieldName in uiSchema) {
            if (uiSchema.hasOwnProperty(fieldName)) {
                if (uiSchema[fieldName] && uiSchema[fieldName]['ui:options'] &&
                    uiSchema[fieldName]['ui:options'].updateFields &&
                    uiSchema[fieldName]['ui:options'].updateFields.length > 0) {

                    if (uiSchema[fieldName]['ui:options'].updateFields.indexOf(name) > -1) {
                        result = true;
                    }
                }
            }
        }
        return result;
    }

    // 根据配置的数据源，返回field的数据并放置到jsonSchema的data中
    _getFieldDataFromDataSource(name = 'all', returnPromise = false) {
        // 检测fieldName是否配置了数据源
        const jsonSchema = this.state.jsonSchema;
        let jsonSchemaProperties = jsonSchema.properties;
        let fieldName, fieldValue;
        let promises = [];

        // 获取数据源数据并更新jsonSchema
        if (name === 'all') {
            for (fieldName in jsonSchemaProperties) {
                if (jsonSchemaProperties.hasOwnProperty(fieldName)) {
                    fieldValue = jsonSchemaProperties[fieldName];
                    if (returnPromise) {
                        promises.push(this._fetchDataFromDataSource(fieldName, fieldValue, {}, returnPromise));
                    } else {
                        this._fetchDataFromDataSource(fieldName, fieldValue);
                    }
                }
            }
            return Promise.all(promises);
        } else {
            if (jsonSchemaProperties.hasOwnProperty(name)) {
                fieldName = name;
                fieldValue = jsonSchemaProperties[fieldName];
                if (returnPromise) {
                    return this._fetchDataFromDataSource(fieldName, fieldValue, {}, returnPromise);
                } else {
                    this._fetchDataFromDataSource(fieldName, fieldValue);
                }
            } else {
                console.warn('xform:_getFieldDataFromDataSource方法中传入的字段' +
                    name + '未配置相应的jsonSchema');
            }
        }

    }

    // updateFieldsParams为联动数据源配置参数，主要是用来注入联动字段改变后的参数
    _fetchDataFromDataSource(fieldName, fieldValue, updateFieldsParams = {}, returnPromise = false, fieldOptionProcessOnly = false) {

        const promise = new Promise((resolve, reject) => {
            const {env, gateway, customGateway, customInterfaces, mockInterfaces, customInterfacesParams, onChange} = this.props;
            let {jsonSchema, uiSchema, formData, bizData} = this.state;
            let dataSourceServerUrl = request.getInterface('dataSourceServerUrl', customInterfaces, env, mockInterfaces), dataSourceServerParams = {}, overallParams = {};
            let dataSourceCode, defaultValue, help;
            if (typeof fieldValue !== 'undefined') {
                if (fieldValue.type === 'array' && !fieldValue.uniqueItems) {
                    dataSourceCode = fieldValue.items.dataSource;
                } else {
                    dataSourceCode = fieldValue.dataSource;
                }
            }

            // 兼容服务端mtop必须指定类型的缺陷
            if (fieldOptionProcessOnly) {
                defaultValue = null;
                help = null;
            } else {
                if (typeof formData[fieldName] !== 'string') {
                    defaultValue = JSON.stringify(formData[fieldName]);
                } else {
                    defaultValue = formData[fieldName];
                }
                help = (uiSchema[fieldName] && uiSchema[fieldName]['ui:help']) || null;
            }

            if (typeof dataSourceCode !== 'undefined') {
                if (typeof this.props.beforeDataSourceFetch === 'function') {
                    dataSourceServerParams = this.props.beforeDataSourceFetch(dataSourceCode,
                        formData, bizData);
                }
                // 这里要针对mtop类型的网关场景做特殊处理（集团mtop不允许参数为Map类型！！！），这里是hack的代码，gateway属性不再对外披露
                if (gateway === 'mtop') {
                    overallParams = {
                        sourceCode: dataSourceCode,
                        defaultValue: defaultValue,
                        help: help,
                        stringifyParams: JSON.stringify(Object.assign({}, formData, dataSourceServerParams, updateFieldsParams))
                    }
                } else {
                    overallParams = {
                        sourceCode: dataSourceCode,
                        defaultValue: defaultValue,
                        help: help,
                        params: Object.assign({}, formData, dataSourceServerParams, updateFieldsParams),
                        stringifyParams: JSON.stringify(Object.assign({}, formData, dataSourceServerParams, updateFieldsParams))
                    }
                }
                request.fetch(dataSourceServerUrl, Object.assign({}, overallParams, (customInterfacesParams && customInterfacesParams.dataSourceServerUrl) || {}), customGateway, env, {
                    type: 'POST'
                }).then((data) => {
                    // 注意数据源这里的逻辑！数据源更新操作要从state中重新获取一遍相关的schema数据再更新，防止出现被数据源更新的schema数据被回退
                    let {jsonSchema, uiSchema, formData, bizData} = this.state;
                    let jsonSchemaProperties = jsonSchema.properties;
                    let jsonSchemaContent, uiSchemaContent;
                    if (typeof fieldValue !== 'undefined') {
                        if (fieldValue.type === 'array' && !fieldValue.uniqueItems) {
                            jsonSchemaContent = fieldValue.items;
                            uiSchemaContent = uiSchema[fieldName].items;
                        } else {
                            jsonSchemaContent = fieldValue;
                            uiSchemaContent = uiSchema[fieldName];
                        }
                    }
                    if (typeof data.data !== 'undefined' && data.data !== null) {
                        // 更新jsonSchema中的数据源data字段
                        jsonSchemaContent.data = data.data;
                    }
                    if (typeof data.defaultValue !== 'undefined' && data.defaultValue !== null) {
                        if (typeof formData[fieldName] !== 'string') {
                            if (typeof formData[fieldName] === 'boolean') {
                                formData[fieldName] = (data.defaultValue === 'true');
                            } else {
                                try {
                                    formData[fieldName] = JSON.parse(data.defaultValue);
                                } catch (e) {
                                    formData[fieldName] = data.defaultValue;
                                }
                            }
                        } else {
                            formData[fieldName] = data.defaultValue;
                        }
                        // 通过数据源更新了formData，要触发onChange，保证组件使用方的数据一致性
                        if (typeof bizData !== 'object') {
                            onChange(this._filterExportData(uiSchema, formData));
                        } else {
                            onChange(this._filterExportData(uiSchema, formData), this._filterExportData(uiSchema, bizData));
                        }
                    }

                    if (typeof data.help !== 'undefined' && data.help !== null) {
                        // 更新ui:help字段
                        if (typeof uiSchemaContent !== 'undefined') {
                            uiSchemaContent['ui:help'] = data.help;
                        } else {
                            uiSchemaContent = {
                                'ui:help': data.help
                            };
                        }
                    }

                    if (fieldValue.type === 'array' && !fieldValue.uniqueItems) {
                        jsonSchemaProperties[fieldName].items = jsonSchemaContent;
                        jsonSchema.properties = jsonSchemaProperties;
                        uiSchema[fieldName].items = uiSchemaContent;
                    } else {
                        jsonSchemaProperties[fieldName] = jsonSchemaContent;
                        jsonSchema.properties = jsonSchemaProperties;
                        uiSchema[fieldName] = uiSchemaContent;
                    }

                    this.setState({
                        jsonSchema: deepCloneObject(jsonSchema),
                        uiSchema: deepCloneObject(uiSchema),
                        formData: deepCloneObject(formData)
                    }, () => {
                        resolve({
                            [fieldName]: formData[fieldName]
                        });
                    });

                }).catch((error) => {
                    // 注意数据源这里的逻辑！数据源更新操作要从state中重新获取一遍相关的schema数据再更新，防止出现被数据源更新的schema数据被回退
                    let {jsonSchema, uiSchema, formData, bizData} = this.state;
                    let jsonSchemaProperties = jsonSchema.properties;
                    let jsonSchemaContent, uiSchemaContent;
                    // 如果接口异常，要传一个空data，防止出现使用到配置的enum和enumNames
                    jsonSchemaProperties[fieldName].data = [];
                    jsonSchema.properties = jsonSchemaProperties;
                    this.setState({
                        jsonSchema: deepCloneObject(jsonSchema)
                    });
                    console.warn('xform:获取数据源接口失败：' + error.message);
                    this.logger.logException('xform.fetchDataSource', true);
                    reject(error);
                });
            }
        });

        if (returnPromise) {
            return promise;
        } else {
            return promise.then();
        }

    }

    // 设置表单全部字段的bizData中的disabled与readonly初始配置值
    _setAllFieldsBizData(bizData = {}, uiSchema, jsonSchema) {
        let jsonSchemaProperties = jsonSchema.properties;
        let fieldName, uiSchemaContent, jsonSchemaContent, fieldDisabled = false, fieldReadonly = false;
        // 这里使用jsonSchema来遍历是因为存在某些field不需要配置uiSchema
        for (fieldName in jsonSchemaProperties) {
            if (jsonSchemaProperties.hasOwnProperty(fieldName)) {
                jsonSchemaContent = jsonSchemaProperties[fieldName];
                if (jsonSchemaContent.type === 'array' && !jsonSchemaContent.uniqueItems) {
                    uiSchemaContent = uiSchema[fieldName].items;
                } else {
                    uiSchemaContent = uiSchema[fieldName];
                }
                fieldDisabled = false, fieldReadonly = false;
                if (typeof uiSchemaContent !== 'undefined') {
                    if (typeof uiSchemaContent['ui:disabled'] === 'boolean') {
                        fieldDisabled = uiSchemaContent['ui:disabled'];
                    }
                    if (typeof uiSchemaContent['ui:readonly'] === 'boolean') {
                        fieldReadonly = uiSchemaContent['ui:readonly'];
                    }
                }
                if (typeof bizData[fieldName] !== 'undefined') {
                    bizData[fieldName].disabled = fieldDisabled;
                    bizData[fieldName].readonly = fieldReadonly;
                } else {
                    bizData[fieldName] = {
                        disabled: fieldDisabled,
                        readonly: fieldReadonly
                    };
                }
            }
        }
        return bizData;
    }

    // 设置表单的所有field为禁用状态
    _setAllFieldsDisable(bizData, uiSchema, jsonSchema, isDisabled) {
        let jsonSchemaProperties = jsonSchema.properties;
        let fieldName, uiSchemaContent, jsonSchemaContent, fieldDisabled;
        // 这里使用jsonSchema来遍历是因为存在某些field不需要配置uiSchema
        for (fieldName in jsonSchemaProperties) {
            if (jsonSchemaProperties.hasOwnProperty(fieldName)) {
                jsonSchemaContent = jsonSchemaProperties[fieldName];
                if (jsonSchemaContent.type === 'array' && !jsonSchemaContent.uniqueItems) {
                    uiSchemaContent = uiSchema[fieldName].items;
                } else {
                    uiSchemaContent = uiSchema[fieldName];
                }
                fieldDisabled = bizData[fieldName].disabled;
                if (fieldDisabled) {
                    if (typeof uiSchemaContent !== 'undefined') {
                        uiSchemaContent['ui:disabled'] = fieldDisabled;
                    } else {
                        uiSchemaContent = {'ui:disabled': fieldDisabled};
                    }
                } else {
                    if (typeof uiSchemaContent !== 'undefined') {
                        uiSchemaContent['ui:disabled'] = isDisabled;
                    } else {
                        uiSchemaContent = {'ui:disabled': isDisabled};
                    }
                }
                if (jsonSchemaContent.type === 'array' && !jsonSchemaContent.uniqueItems) {
                    uiSchema[fieldName].items = uiSchemaContent;
                } else {
                    uiSchema[fieldName] = uiSchemaContent;
                }
            }
        }
        return uiSchema;
    }

    // 设置表单的所有field为只读状态
    _setAllFieldsReadonly(bizData, uiSchema, jsonSchema, isReadonly) {
        let jsonSchemaProperties = jsonSchema.properties;
        let fieldName, uiSchemaContent, jsonSchemaContent, fieldReadonly;
        // 这里使用jsonSchema来遍历是因为存在某些field不需要配置uiSchema
        for (fieldName in jsonSchemaProperties) {
            if (jsonSchemaProperties.hasOwnProperty(fieldName)) {
                jsonSchemaContent = jsonSchemaProperties[fieldName];
                if (jsonSchemaContent.type === 'array' && !jsonSchemaContent.uniqueItems) {
                    uiSchemaContent = uiSchema[fieldName].items;
                } else {
                    uiSchemaContent = uiSchema[fieldName];
                }
                fieldReadonly = bizData[fieldName].readonly;
                if (fieldReadonly) {
                    if (typeof uiSchemaContent !== 'undefined') {
                        uiSchemaContent['ui:readonly'] = fieldReadonly;
                    } else {
                        uiSchemaContent = {'ui:readonly': fieldReadonly};
                    }
                } else {
                    if (typeof uiSchemaContent !== 'undefined') {
                        uiSchemaContent['ui:readonly'] = isReadonly;
                    } else {
                        uiSchemaContent = {'ui:readonly': isReadonly};
                    }
                }
                if (jsonSchemaContent.type === 'array' && !jsonSchemaContent.uniqueItems) {
                    uiSchema[fieldName].items = uiSchemaContent;
                } else {
                    uiSchema[fieldName] = uiSchemaContent;
                }
            }
        }
        return uiSchema;
    }

    // 设置字段的bizData的displayName
    _setAllFieldsDisplayName({jsonSchema, uiSchema, formData, bizData}) {
        let jsonSchemaProperties = jsonSchema.properties;
        let fieldName, jsonSchemaContent, enumOptions, displayName;
        for (fieldName in jsonSchemaProperties) {
            if (jsonSchemaProperties.hasOwnProperty(fieldName)) {
                jsonSchemaContent = jsonSchemaProperties[fieldName];
                displayName = undefined;
                if (typeof jsonSchemaContent.enum === 'undefined' && typeof jsonSchemaContent.enumNames === 'undefined' && typeof jsonSchemaContent.data === 'undefined') {
                    // 这种类型字段不需要进行code => label的转换，字段bizData.displayName值直接等同于formData[fieldName]
                    displayName = formData[fieldName];
                } else {
                    // 这种类型字段带有enum和enumOptions或者绑定了数据源，字段bizData.displayName需要进行转换
                    enumOptions = [];
                    if (typeof jsonSchemaContent.data !== 'undefined') {
                        enumOptions = jsonSchemaContent.data;
                    } else {
                        jsonSchemaContent.enum.map((enumItem, index) => {
                            enumOptions.push({
                                label: jsonSchemaContent.enumNames[index],
                                value: jsonSchemaContent.enum[index]
                            });
                        });
                    }
                    // 从enumOptions中获取displayName
                    enumOptions = this._flattenTreeData(enumOptions);
                    if (Array.isArray(formData[fieldName])) {
                        displayName = [];
                        formData[fieldName].map((formDataItem) => {
                            enumOptions.map((option) => {
                                if (option.value === formDataItem) {
                                    displayName.push(option.label);
                                }
                            });
                        });
                    } else {
                        enumOptions.map((option) => {
                            if (option.value === formData[fieldName]) {
                                displayName = option.label;
                            }
                        });
                    }
                }
                if (typeof bizData[fieldName] !== 'undefined') {
                    bizData[fieldName].displayName = displayName;
                } else {
                    bizData[fieldName] = {
                        displayName
                    };
                }
            }
        }

        return bizData;
    }

    // 扁平化Tree数据结构（树形结构数据扁平化）
    _flattenTreeData(treeRoot) {
        let result = [];
        treeRoot.map((treeNode) => {
            result.push({
                label: treeNode.label,
                value: treeNode.value
            });
            if (treeNode.children && treeNode.children.length > 0) {
                result = result.concat(this._flattenTreeData(treeNode.children));
            }
        });
        return result;
    }

    // 表单校验（如果传入了指定的fieldName则只校验当前name项目，否则所有项目都校验）
    // @return boolean
    _validate(formData, name = 'all', callback, failCallback) {
        let uiSchema = this.state.uiSchema;
        const jsonSchema = this.state.jsonSchema;
        const jsonSchemaProperties = jsonSchema.properties;
        if (debugMode) {
            console.log('validate uiSchema:', uiSchema);
            console.log('validate formData:', formData);
        }
        let jsonSchemaContent;
        let fieldName, fieldValue, fieldValidate, classNames, widgetType;
        let validateItemPromises = [], validatePromises = [];
        if (name === 'all') {
            for (fieldName in uiSchema) {
                if (uiSchema.hasOwnProperty(fieldName)) {
                    jsonSchemaContent = jsonSchemaProperties[fieldName];
                    fieldValue = formData[fieldName];
                    fieldValidate = [];
                    classNames = '';
                    widgetType = '';
                    if (typeof uiSchema[fieldName] !== 'undefined') {
                        fieldValidate = (uiSchema[fieldName]['ui:options'] && uiSchema[fieldName]['ui:options'].validate) || [];
                        classNames = uiSchema[fieldName].classNames || '';
                        widgetType = uiSchema[fieldName]['ui:widget'] || '';
                    }

                    // 对于array类型的字段，widgetType设置为特殊值'array',方便进行校验判断
                    if (jsonSchemaContent.type === 'array' && !jsonSchemaContent.uniqueItems) {
                        widgetType = 'array';
                    }

                    validateItemPromises = this._validateField(fieldValidate, fieldName, fieldValue, classNames, widgetType);
                    validatePromises.push(new Promise((resolve, reject) => {
                        Promise.all(validateItemPromises).then((values) => {
                            let resolveFieldName = values.length > 0 ? values[0].fieldName : fieldName;
                            // 将该fieldName下的_errorType置为空
                            if (typeof uiSchema[resolveFieldName] !== 'undefined') {
                                if (typeof uiSchema[resolveFieldName]['ui:options'] !== 'undefined') {
                                    uiSchema[resolveFieldName]['ui:options']._errorType = '';
                                } else {
                                    uiSchema[resolveFieldName]['ui:options'] = {_errorType: ''};
                                }
                            }
                            if (debugMode) {
                                console.log('field:' + resolveFieldName + ';errorType=' + uiSchema[resolveFieldName]['ui:options']._errorType);

                            }
                            this.setState({
                                uiSchema: deepCloneObject(uiSchema)
                            });
                            resolve();
                        }).catch((error) => {
                            let errorType = error.errorType;
                            let errorFieldName = error.fieldName;
                            let errorMessage, errorValidateCode;
                            // errorMessage, errorValidateCode字段只有动态校验器的场景才会出现，这种场景需要替换掉validate字段里面的message
                            if (typeof error.errorMessage !== 'undefined' &&
                                typeof error.errorValidateCode !== 'undefined') {

                                errorMessage = error.errorMessage;
                                errorValidateCode = error.errorValidateCode;
                                uiSchema[errorFieldName]['ui:options'].validate.map((validateItem, index) => {
                                    if (validateItem.validateCode === errorValidateCode) {
                                        uiSchema[errorFieldName]['ui:options'].validate[index].message = errorMessage;
                                    }
                                });
                            }
                            // 存在errorType，就要更新schema，来展示校验结果
                            if (typeof uiSchema[errorFieldName] === 'undefined') {
                                uiSchema[errorFieldName] = {'ui:options': {_errorType: errorType}};
                            } else if (typeof uiSchema[errorFieldName]['ui:options'] === 'undefined') {
                                uiSchema[errorFieldName]['ui:options'] = {_errorType: errorType};
                            } else {
                                uiSchema[errorFieldName]['ui:options']._errorType = errorType;
                            }
                            if (debugMode) {
                                console.log('field:' + errorFieldName + ';errorType=' + uiSchema[errorFieldName]['ui:options']._errorType);
                            }
                            this.setState({
                                uiSchema: deepCloneObject(uiSchema)
                            });
                            reject();
                        });
                    }));
                }
            }

            Promise.all(validatePromises).then(() => {
                if (typeof callback === 'function') {
                    callback();
                }
            }).catch(() => {
                if (typeof failCallback === 'function') {
                    failCallback();
                }
            });
        } else {
            fieldName = name;
            jsonSchemaContent = jsonSchemaProperties[fieldName];
            fieldValue = formData[fieldName];
            fieldValidate = [];
            classNames = '';
            widgetType = '';
            if (typeof uiSchema[fieldName] !== 'undefined') {
                fieldValidate = (uiSchema[fieldName]['ui:options'] && uiSchema[fieldName]['ui:options'].validate) || [];
                classNames = uiSchema[fieldName].classNames || '';
                widgetType = uiSchema[fieldName]['ui:widget'] || '';
            }
            // 对于array类型的字段，widgetType设置为特殊值'array',方便进行校验判断
            if (jsonSchemaContent.type === 'array' && !jsonSchemaContent.uniqueItems) {
                widgetType = 'array';
            }
            validateItemPromises = this._validateField(fieldValidate, fieldName, fieldValue, classNames, widgetType);
            Promise.all(validateItemPromises).then(() => {
                // 将该fieldName下的_errorType置为空
                if (typeof uiSchema[fieldName] !== 'undefined') {
                    if (typeof uiSchema[fieldName]['ui:options'] !== 'undefined') {
                        uiSchema[fieldName]['ui:options']._errorType = '';
                    } else {
                        uiSchema[fieldName]['ui:options'] = {_errorType: ''};
                    }
                }
                if (debugMode) {
                    console.log('field:' + fieldName + ';errorType=' + uiSchema[fieldName]['ui:options']._errorType);
                }
                this.setState({
                    uiSchema: deepCloneObject(uiSchema)
                });
                if (typeof callback === 'function') {
                    callback();
                }
            }).catch((error) => {
                let errorType = error.errorType;
                let errorFieldName = error.fieldName;
                let errorMessage, errorValidateCode;
                // errorMessage, errorValidateCode字段只有动态校验器的场景才会出现，这种场景需要替换掉validate字段里面的message
                if (typeof error.errorMessage !== 'undefined' &&
                    typeof error.errorValidateCode !== 'undefined') {

                    errorMessage = error.errorMessage;
                    errorValidateCode = error.errorValidateCode;
                    uiSchema[errorFieldName]['ui:options'].validate.map((validateItem, index) => {
                        if (validateItem.validateCode === errorValidateCode) {
                            uiSchema[errorFieldName]['ui:options'].validate[index].message = errorMessage;
                        }
                    });
                }
                // 存在errorType，就要更新schema，来展示校验结果
                if (typeof uiSchema[errorFieldName] === 'undefined') {
                    uiSchema[errorFieldName] = {'ui:options': {_errorType: errorType}};
                } else if (typeof uiSchema[errorFieldName]['ui:options'] === 'undefined') {
                    uiSchema[errorFieldName]['ui:options'] = {_errorType: errorType};
                } else {
                    uiSchema[errorFieldName]['ui:options']._errorType = errorType;
                }
                if (debugMode) {
                    console.log('field:' + fieldName + ';errorType=' + uiSchema[fieldName]['ui:options']._errorType);
                }
                this.setState({
                    uiSchema: deepCloneObject(uiSchema)
                });
                if (typeof failCallback === 'function') {
                    failCallback();
                }
            });
        }
    }

    _validateField(fieldValidate, fieldName, fieldValue, classNames, widgetType) {
        const {env, gateway, customGateway, customInterfaces, mockInterfaces, customInterfacesParams} = this.props;
        let serverParams = {}, overallParams = {};
        const formData = this.state.formData;
        let errorType = '';
        let promise;
        let promises = [];
        // 由于级联关系隐藏的字段直接校验通过
        let classnames = classNames.split(' ');
        if (classnames.indexOf(XFORM_HIDDEN_CLASS) > -1) {
            promises.push(new Promise((resolve) => {
                resolve({
                    fieldName: fieldName
                });
            }));
            return promises;
        }
        // ui:widget为hidden类型的字段直接校验通过
        if (widgetType === 'hidden') {
            promises.push(new Promise((resolve) => {
                resolve({
                    fieldName: fieldName
                });
            }));
            return promises;
        }
        // 如果fieldValidate为空数组（没有校验项），直接校验通过
        if (fieldValidate && fieldValidate.length <= 0) {
            promises.push(new Promise((resolve) => {
                resolve({
                    fieldName: fieldName
                });
            }));
            return promises;
        }
        // 遍历检查validate各项，查找校验不通过的errorType并写入schema中
        for (let i = 0; i < fieldValidate.length; i++) {
            let validateItem = fieldValidate[i];
            let validateCode;
            errorType = '';
            switch (validateItem.type) {
                case 'empty':
                    promise = new Promise((resolve, reject) => {
                        if (isEmpty(fieldValue, widgetType)) {
                            errorType = validateItem.type;
                            reject({
                                fieldName: fieldName,
                                errorType: errorType
                            });
                        } else {
                            resolve({
                                fieldName: fieldName
                            });
                        }
                    });
                    break;
                case 'digit':
                    promise = new Promise((resolve, reject) => {
                        if (!isDigit(fieldValue)) {
                            errorType = validateItem.type;
                            reject({
                                fieldName: fieldName,
                                errorType: errorType
                            });
                        } else {
                            resolve({
                                fieldName: fieldName
                            });
                        }
                    });
                    break;
                case 'money':
                    promise = new Promise((resolve, reject) => {
                        if (!isMoney(fieldValue)) {
                            errorType = validateItem.type;
                            reject({
                                fieldName: fieldName,
                                errorType: errorType
                            });
                        } else {
                            resolve({
                                fieldName: fieldName
                            });
                        }
                    });
                    break;
                case 'email':
                    promise = new Promise((resolve, reject) => {
                        if (!isEmail(fieldValue)) {
                            errorType = validateItem.type;
                            reject({
                                fieldName: fieldName,
                                errorType: errorType
                            });
                        } else {
                            resolve({
                                fieldName: fieldName
                            });
                        }
                    });
                    break;
                case 'url':
                    promise = new Promise((resolve, reject) => {
                        if (!isUrl(fieldValue)) {
                            errorType = validateItem.type;
                            reject({
                                fieldName: fieldName,
                                errorType: errorType
                            });
                        } else {
                            resolve({
                                fieldName: fieldName
                            });
                        }
                    });
                    break;
                case 'id':
                    promise = new Promise((resolve, reject) => {
                        if (!isId(fieldValue)) {
                            errorType = validateItem.type;
                            reject({
                                fieldName: fieldName,
                                errorType: errorType
                            });
                        } else {
                            resolve({
                                fieldName: fieldName
                            });
                        }
                    });
                    break;
                case 'telephone':
                    promise = new Promise((resolve, reject) => {
                        if (!isTel(fieldValue)) {
                            errorType = validateItem.type;
                            reject({
                                fieldName: fieldName,
                                errorType: errorType
                            });
                        } else {
                            resolve({
                                fieldName: fieldName
                            });
                        }
                    });
                    break;
                case 'server':
                    // 只有提交时才进行服务端校验
                    validateCode = validateItem.validateCode;
                    if (typeof validateCode !== 'undefined') {
                        promise = new Promise((resolve, reject) => {
                            if (validateType !== 'submit') {
                                resolve({
                                    fieldName: fieldName
                                });
                            } else {
                                if (typeof this.props.beforeServerCheck === 'function') {
                                    serverParams = this.props.beforeServerCheck(validateCode,
                                        this.state.formData, this.state.bizData);
                                }
                                // 这里要针对mtop类型的网关场景做特殊处理（集团mtop不允许参数为Map类型！！！），这里是hack的代码，gateway属性不再对外披露
                                if (gateway === 'mtop') {
                                    overallParams = {
                                        validateCode: validateCode,
                                        validateFieldName: fieldName,
                                        validateFieldValue: fieldValue,
                                        stringifyParams: JSON.stringify(Object.assign({}, formData, {
                                            [fieldName]: fieldValue
                                        }, serverParams))
                                    }
                                } else {
                                    overallParams = {
                                        validateCode: validateCode,
                                        validateFieldName: fieldName,
                                        validateFieldValue: fieldValue,
                                        params: Object.assign({}, formData, {
                                            [fieldName]: fieldValue
                                        }, serverParams),
                                        stringifyParams: JSON.stringify(Object.assign({}, formData, {
                                            [fieldName]: fieldValue
                                        }, serverParams))
                                    }
                                }
                                request.fetch(request.getInterface('serverCheck', customInterfaces, env, mockInterfaces), Object.assign({}, overallParams, (customInterfacesParams && customInterfacesParams.serverCheck) || {}), customGateway, env, {
                                    type: 'POST'
                                }).then((data) => {
                                    if (data && data.success) {
                                        resolve({
                                            fieldName: fieldName
                                        });
                                    } else {
                                        errorType = validateItem.type;
                                        if (typeof data.message !== 'undefined') {
                                            reject({
                                                fieldName: fieldName,
                                                errorType: errorType,
                                                errorMessage: data.message,
                                                errorValidateCode: validateCode
                                            });
                                        } else {
                                            reject({
                                                fieldName: fieldName,
                                                errorType: errorType
                                            });
                                        }
                                    }
                                }).catch(() => {
                                    errorType = validateItem.type;
                                    reject({
                                        fieldName: fieldName,
                                        errorType: errorType
                                    });
                                });
                            }
                        });
                    } else {
                        promise = new Promise((resolve) => {
                            resolve({
                                fieldName: fieldName
                            });
                        });
                    }

                    break;
                default:
                    console.warn('uiSchema中定义了一个必能识别的校验类型');
                    errorType = '';
                    promise = new Promise((resolve) => {
                        resolve({
                            fieldName: fieldName
                        });
                    });
            }

            promises.push(promise);
        }

        return promises;
    }

    // 表单同步验证方法，其中不包括server类型的校验
    _validateFieldSync(fieldValidate, fieldValue, classNames, widgetType) {
        let i, validateItem;
        // 由于级联关系隐藏的字段直接校验通过
        let classnames = classNames.split(' ');
        if (classnames.indexOf(XFORM_HIDDEN_CLASS) > -1) {
            return {
                result: true,
                errorType: ''
            };
        }
        // ui:widget为hidden类型的字段直接校验通过
        if (widgetType === 'hidden') {
            return {
                result: true,
                errorType: ''
            };
        }
        for (i = 0; i < fieldValidate.length; i++) {
            validateItem = fieldValidate[i];
            switch (validateItem.type) {
                case 'empty':
                    if (isEmpty(fieldValue, widgetType)) {
                        return {
                            result: false,
                            errorType: validateItem.type
                        };
                    }
                    break;
                case 'email':
                    if (!isEmail(fieldValue)) {
                        return {
                            result: false,
                            errorType: validateItem.type
                        };
                    }
                    break;
                case 'url':
                    if (!isUrl(fieldValue)) {
                        return {
                            result: false,
                            errorType: validateItem.type
                        };
                    }
                    break;
                case 'telephone':
                    if (!isTel(fieldValue)) {
                        return {
                            result: false,
                            errorType: validateItem.type
                        };
                    }
                    break;
                case 'id':
                    if (!isId(fieldValue)) {
                        return {
                            result: false,
                            errorType: validateItem.type
                        };
                    }
                    break;
                case 'digit':
                    if (!isDigit(fieldValue)) {
                        return {
                            result: false,
                            errorType: validateItem.type
                        };
                    }
                    break;
                case 'money':
                    if (!isMoney(fieldValue)) {
                        return {
                            result: false,
                            errorType: validateItem.type
                        };
                    }
                    break;
                case 'server':
                    console.warn('定义了server校验类型的表单验证，请使用XFormValidate方法做表单校验');
                    break;
                default:
                    console.warn('uiSchema中定义了一个必能识别的校验类型');
            }
        }
        return {
            result: true,
            errorType: ''
        };
    }

    // 根据updateFields字段来更新
    _updateFieldsData(changeFieldName, changeFieldValue, updateFields) {
        const jsonSchema = this.state.jsonSchema;
        let jsonSchemaProperties = jsonSchema.properties;
        const uiSchema = this.state.uiSchema;
        let fieldName, fieldValue;

        updateFields.map((updateField) => {
            fieldName = updateField;
            fieldValue = jsonSchemaProperties[updateField];
            this._fetchDataFromDataSource(fieldName, fieldValue, Object.assign({}, {
                [changeFieldName]: changeFieldValue,
                changeFieldName: changeFieldName,
                changeFieldValue: changeFieldValue
            }));
        });
    }

    // 根据formData来判断表单各个字段的展示逻辑（field字段联动）
    _updateFieldsShow(uiSchema, formData) {
        let field, showOptions, fieldHidden = false;
        for (field in uiSchema) {
            if (uiSchema.hasOwnProperty(field)) {
                if (typeof uiSchema[field] === 'undefined') {
                    fieldHidden = false;
                } else if (typeof uiSchema[field]['ui:options'] === 'undefined') {
                    fieldHidden = false;
                } else {
                    showOptions = uiSchema[field]['ui:options'].show;
                    // 如果没有show字段证明该字段一直显示
                    if (typeof showOptions === 'undefined') {
                        fieldHidden = false;
                    } else {
                        fieldHidden = this._shouldFieldHidden(uiSchema, showOptions, formData);
                    }
                }

                if (typeof uiSchema[field] === 'undefined') {
                    uiSchema[field] = {classNames: fieldHidden ? XFORM_HIDDEN_CLASS : ''};
                } else if (typeof uiSchema[field].classNames === 'undefined') {
                    uiSchema[field].classNames = (fieldHidden ? XFORM_HIDDEN_CLASS : '');
                } else if (uiSchema[field].classNames && uiSchema[field].classNames.length > 0) {
                    // 防止属性重复添加
                    let classnames = uiSchema[field].classNames.split(' ');
                    if (fieldHidden && classnames.indexOf(XFORM_HIDDEN_CLASS) <= -1) {
                        classnames.push(XFORM_HIDDEN_CLASS);
                    } else if (!fieldHidden && classnames.indexOf(XFORM_HIDDEN_CLASS) > -1) {
                        classnames.splice(classnames.indexOf(XFORM_HIDDEN_CLASS), 1);
                    }
                    uiSchema[field].classNames = classnames.join(' ');
                } else {
                    uiSchema[field].classNames = (fieldHidden ? XFORM_HIDDEN_CLASS : '');
                }
            }
        }

        return uiSchema;
    }

    _shouldFieldHidden(uiSchema, showOptions, formData) {
        let result = true;
        let fieldName;
        showOptions.map((showOption) => {
            fieldName = showOption.field;
            // 如果该关联的字段是隐藏状态，则不应该再判断当前这个showOption的values。隐藏字段不应影响级联关系
            if (typeof uiSchema[fieldName] !== 'undefined') {

                let classNames = uiSchema[fieldName].classNames || '';
                if (classNames.indexOf(XFORM_HIDDEN_CLASS) <= -1) {
                    showOption.values.map((value) => {
                        if (value === formData[fieldName]) {
                            result = false;
                        }
                    });
                }
            } else {
                // 如果showOptions中的show字段在整个schema中不存在，则认为该字段不应有级联关系，应该展示该字段
                result = false;
            }
        });
        return result;
    }

    // 输出给组件外部的formData或bizData，要根据field字段是否隐藏进行过滤
    _filterExportData(uiSchema, formData) {
        let filterFormData = {};
        let fieldName, classnames;
        for (fieldName in formData) {
            if (formData.hasOwnProperty(fieldName)) {
                classnames = [];
                if (uiSchema[fieldName] && uiSchema[fieldName].classNames &&
                    uiSchema[fieldName].classNames.length > 0) {

                    classnames = uiSchema[fieldName].classNames.split(' ');
                }
                if (classnames.indexOf(XFORM_HIDDEN_CLASS) <= -1) {
                    filterFormData[fieldName] = formData[fieldName];
                }
            }
        }
        return filterFormData;
    }

    _handleXFormChange(schema) {
        // 加入任务类型埋点
        if (!isFormDirty) {
            this.logger.logTask('表单完成率');
            this.logger.logTask('表单Dirty率', 'success');
            // 记录xform渲染完成时间，用来计算表单填写计时
            formRenderTime = new Date().getTime();
            isFormDirty = true;
        }

        validateType = 'live';
        const currentFormData = schema.formData;
        const formData = this.state.formData;
        const jsonSchema = this.state.jsonSchema;
        const uiSchema = this.state.uiSchema;
        let bizData = this.state.bizData;
        let changeFieldName = '';
        // 通过比较找出触发onChange的表单域name
        for (let fieldName in currentFormData) {
            if (currentFormData.hasOwnProperty(fieldName)) {
                // 非基本类型要用序列化的数据进行比较，基本类型直接比较
                if (typeof formData[fieldName] !== 'object') {
                    if ((currentFormData[fieldName] !== formData[fieldName])) {
                        changeFieldName = fieldName;
                        break;
                    }
                } else {
                    if (JSON.stringify(currentFormData[fieldName]) !== JSON.stringify(formData[fieldName])) {
                        changeFieldName = fieldName;
                        break;
                    }
                }
            }
        }
        // 如果发现表单没有发生变化，直接return
        if (changeFieldName === '') {
            return;
        }

        // 获取联动后的uiSchema，保证通过_filterExportData输出的formData的正确
        let updateShowUISchema = this._updateFieldsShow(uiSchema, currentFormData);

        // 执行表单校验
        this.validate(currentFormData, changeFieldName);

        // 根据schema设置字段bizData中的displayName
        bizData = this._setAllFieldsDisplayName({jsonSchema, uiSchema, formData: currentFormData, bizData});

        if (typeof bizData !== 'object') {
            this.props.onChange(this._filterExportData(updateShowUISchema, currentFormData), changeFieldName);
        } else {
            this.props.onChange(this._filterExportData(updateShowUISchema, currentFormData), this._filterExportData(updateShowUISchema, bizData), changeFieldName);
        }
        this.setState({
            formData: deepCloneObject(currentFormData),
            bizData: deepCloneObject(bizData)
        }, () => {
            // 检查表单联动数据源更新
            if (uiSchema[changeFieldName] && uiSchema[changeFieldName]['ui:options'] &&
                uiSchema[changeFieldName]['ui:options'].updateFields &&
                uiSchema[changeFieldName]['ui:options'].updateFields.length > 0) {

                this._updateFieldsData(changeFieldName, currentFormData[changeFieldName], uiSchema[changeFieldName]['ui:options'].updateFields);
            }
        });
    }

    _handleXFormSubmit(schema) {
        const bizData = this.state.bizData;
        const uiSchema = this.state.uiSchema;
        // 获取联动后的uiSchema，保证通过_filterExportData输出的formData的正确
        let updateShowUISchema = this._updateFieldsShow(uiSchema, schema.formData);
        validateType = 'submit';
        //提交前校验
        this.validate(schema.formData, 'all', () => {
            if (typeof bizData !== 'object') {
                this.props.onSubmit(this._filterExportData(updateShowUISchema, schema.formData));
            } else {
                this.props.onSubmit(this._filterExportData(updateShowUISchema, schema.formData), this._filterExportData(updateShowUISchema, bizData));
            }
            // 发送表单填写计时数据
            if (!taskSuccess) {
                this.logger.logTime('xform', '表单填写用时', null, new Date().getTime() - formRenderTime);
                this.logger.logTask('表单完成率', 'success', new Date().getTime() - formRenderTime);
                taskSuccess = true;
            }
        }, () => {
            // 发送表单填写计时数据
            this.logger.logTask('表单完成率', 'validate fail');
        });
    }


    validate(formData, changeFieldName, callback, failCallback) {
        if (changeFieldName === 'all') {
            // 完整表单提交校验的场景下才需要进行全局validation属性的校验
            if (this.props.validation(formData, this.state.bizData)) {
                this._validate(formData, changeFieldName, callback, failCallback)
            } else {
                // validate失败后，需要触发失败回调
                if (typeof failCallback === 'function') {
                    failCallback();
                }
            }
        } else {
            this._validate(formData, changeFieldName, callback, failCallback);
        }
    }

    // XForm提交方法，允许通过refs方式访问（由于json-schema要求提交按钮必须在form内，这有很大的局限性，故允许通过调用XFormSubmit来在任意点触发表单提交）
    XFormSubmit() {
        validateType = 'submit';
        const formData = this.state.formData;
        const bizData = this.state.bizData;
        const uiSchema = this.state.uiSchema;
        // 获取联动后的uiSchema，保证通过_filterExportData输出的formData的正确
        let updateShowUISchema = this._updateFieldsShow(uiSchema, formData);
        // 提交前校验
        this.validate(formData, 'all', () => {
            if (typeof bizData !== 'object') {
                this.props.onSubmit(this._filterExportData(updateShowUISchema, formData));
            } else {
                this.props.onSubmit(this._filterExportData(updateShowUISchema, formData), this._filterExportData(updateShowUISchema, bizData));
            }
            // 发送表单填写计时数据
            // 加入任务类型埋点
            if (!taskSuccess) {
                this.logger.logTime('xform', '表单填写用时', null, new Date().getTime() - formRenderTime);
                this.logger.logTask('表单完成率', 'success', new Date().getTime() - formRenderTime);
                taskSuccess = true;
            }
        }, () => {
            this.logger.logTask('表单完成率', 'validate fail');
        });
        this.logger.logEvent('api', 'use', 'XFormSubmit');
    }

    // 获取表单初始FormData
    XFormInitFormData() {
        this.logger.logEvent('api', 'use', 'XFormInitFormData');
        return initFormData;
    }

    // 重置XForm表单，允许通过refs方式访问
    XFormReset() {
        this.setState({
            formData: deepCloneObject(initFormData)
        });
        this.logger.logEvent('api', 'use', 'XFormReset');
    }

    // 设置formData
    XFormSetFormData(formData) {
        this.setState({
            formData: deepCloneObject(formData)
        });
        this.logger.logEvent('api', 'use', 'XFormSetFormData');
    }

    // XForm获取Xform当前的formData的方法，允许通过refs方式访问
    XFormCurrentFormData() {
        const uiSchema = this.state.uiSchema;
        const formData = this.state.formData;
        // 获取联动后的uiSchema，保证通过_filterExportData输出的formData的正确
        let updateShowUISchema = this._updateFieldsShow(uiSchema, formData);
        this.logger.logEvent('api', 'use', 'XFormCurrentFormData');
        return this._filterExportData(updateShowUISchema, formData);
    }

    // XForm获取当前bizData，允许通过refs方式访问
    XFormBizData() {
        const uiSchema = this.state.uiSchema;
        const formData = this.state.formData;
        const bizData = this.state.bizData;
        // 获取联动后的uiSchema，保证通过_filterExportData输出的formData的正确
        let updateShowUISchema = this._updateFieldsShow(uiSchema, formData);
        this.logger.logEvent('api', 'use', 'XFormBizData');
        return this._filterExportData(updateShowUISchema, bizData);
    }

    // XForm表单校验，允许通过refs方式访问（由于json-schema要求提交按钮必须在form内，这有很大的局限性，故允许通过调用XFormValidate来在任意点触发表单校验，之后可以自己实现校验后的处理逻辑）
    XFormValidate(callback, failCallback) {
        validateType = 'submit';
        const formData = this.state.formData;
        this.validate(formData, 'all', () => {
            // 发送表单填写计时数据（由于表单提交行为不可控，故使用表单校验近似作为）
            // 加入任务类型埋点
            if (!taskSuccess) {
                this.logger.logTime('xform', '表单填写用时', null, new Date().getTime() - formRenderTime);
                this.logger.logTask('表单完成率', 'success', new Date().getTime() - formRenderTime);
                taskSuccess = true;
            }
            if (typeof callback === 'function') {
                callback();
            }
        }, () => {
            // 加入任务类型埋点
            this.logger.logTask('表单完成率', 'validate fail');
            if (typeof failCallback === 'function') {
                failCallback();
            }
        });
        this.logger.logEvent('api', 'use', 'XFormValidate');
    }

    // XForm表单同步校验方法，允许通过refs方式访问（这是一个同步校验的方法，无法进行type: 'server'的校验类型）
    // @return boolean校验是否通过
    XFormValidateSync() {
        const uiSchema = this.state.uiSchema;
        const formData = this.state.formData;
        let validateResult = true;
        let fieldName, fieldValue, fieldValidate = [], classNames = '', widgetType = '';
        this.logger.logEvent('api', 'use', 'XFormValidateSync');
        // 用户自定义的validation方法校验不通过则直接校验不通过
        if (!this.props.validation(formData, this.state.bizData)) {
            validateResult = false;
        } else {
            for (fieldName in uiSchema) {
                if (uiSchema.hasOwnProperty(fieldName)) {
                    fieldValue = formData[fieldName];
                    fieldValidate = [];
                    classNames = '';
                    widgetType = '';
                    if (typeof uiSchema[fieldName] !== 'undefined') {
                        fieldValidate = (uiSchema[fieldName]['ui:options'] && uiSchema[fieldName]['ui:options'].validate) || [];
                        classNames = uiSchema[fieldName].classNames || '';
                        widgetType = uiSchema[fieldName]['ui:widget'] || '';
                    }
                    let {result, errorType} = this._validateFieldSync(fieldValidate, fieldValue, classNames, widgetType);
                    if (result) {
                        // 单个字段校验通过，将该fieldName下的_errorType置为空
                        if (typeof uiSchema[fieldName] !== 'undefined') {
                            if (typeof uiSchema[fieldName]['ui:options'] !== 'undefined') {
                                uiSchema[fieldName]['ui:options']._errorType = '';
                            } else {
                                uiSchema[fieldName]['ui:options'] = {_errorType: ''};
                            }
                        }
                        if (debugMode) {
                            console.log('field:' + fieldName + ';errorType=' + uiSchema[fieldName]['ui:options']._errorType);
                        }
                        this.setState({
                            uiSchema: deepCloneObject(uiSchema)
                        });
                    } else {
                        // 单个字段校验不通过，存在errorType，就要更新schema，来展示校验结果
                        if (typeof uiSchema[fieldName] === 'undefined') {
                            uiSchema[fieldName] = {'ui:options': {_errorType: errorType}};
                        } else if (typeof uiSchema[fieldName]['ui:options'] === 'undefined') {
                            uiSchema[fieldName]['ui:options'] = {_errorType: errorType};
                        } else {
                            uiSchema[fieldName]['ui:options']._errorType = errorType;
                        }
                        if (debugMode) {
                            console.log('field:' + fieldName + ';errorType=' + uiSchema[fieldName]['ui:options']._errorType);
                        }
                        this.setState({
                            uiSchema: deepCloneObject(uiSchema)
                        });
                        validateResult = false;
                    }
                }
            }
        }
        if (validateResult) {
            // 发送表单填写计时数据（由于表单提交行为不可控，故使用表单校验近似作为）
                // 加入任务类型埋点
            if (!taskSuccess) {
                this.logger.logTime('xform', '表单填写用时', null, new Date().getTime() - formRenderTime);
                this.logger.logTask('表单完成率', 'success', new Date().getTime() - formRenderTime);
                taskSuccess = true;
            }

        }
        return validateResult;
    }

    // XForm表单数据源更新方法，允许通过refs方式访问（该方法不需要参数，会去更新全部配置了数据源的字段）
    XFormFetchAllFromDataSource() {
        this._getFieldDataFromDataSource();
        this.logger.logEvent('api', 'use', 'XFormFetchAllFromDataSource');
    }

    // XForm表单数据源更新方法，允许通过refs方式访问（该方法需要传入待更新数据源的字段名称）
    XFormFetchFromDataSource(name) {
        if (typeof name === 'string') {
            this._getFieldDataFromDataSource(name);
        }
        this.logger.logEvent('api', 'use', 'XFormFetchFromDataSource');
    }

    render() {
        const {popupContainer, widgets, fields, fieldTemplate, arrayFieldTemplate, objectFieldTemplate, formContext, defaultSubmitButtonComponent, className, disabled, readonly} = this.props;

        let jsonSchema = this.state.jsonSchema;
        let uiSchema = this.state.uiSchema;
        let formData = this.state.formData;
        let bizData = this.state.bizData;

        // 禁用、只读状态
        uiSchema = this._setAllFieldsDisable(bizData, uiSchema, jsonSchema, disabled);
        uiSchema = this._setAllFieldsReadonly(bizData, uiSchema, jsonSchema, readonly);
        // 更新表单联动字段的展示
        uiSchema = this._updateFieldsShow(uiSchema, formData);

        const seqJsonSchema = getOrderJsonSchemaBySequence(jsonSchema, this.state.sequence);
        const seqUiSchema = getOrderSchemaBySequence(uiSchema, this.state.sequence);
        const seqFormData = getOrderSchemaBySequence(formData, this.state.sequence);

        return (
            <div className={XFORM_ROOT_CLASS}>
                <Form
                    noValidate={true}
                    showErrorList={false}
                    schema={deepCloneObject(seqJsonSchema)}
                    uiSchema={deepCloneObject(seqUiSchema)}
                    formData={deepCloneObject(seqFormData)}
                    widgets={widgets}
                    fields={fields}
                    FieldTemplate={fieldTemplate}
                    ArrayFieldTemplate={arrayFieldTemplate}
                    ObjectFieldTemplate={objectFieldTemplate}
                    formContext={Object.assign({}, formContext, {
                        popupContainer,
                        getFieldDataFromDataSource: this._fetchDataFromDataSource
                    })}
                    className={className}
                    onChange={this._handleXFormChange}
                    onSubmit={this._handleXFormSubmit}
                >{this.props.children || defaultSubmitButtonComponent}</Form>
            </div>
        );
    }
}

export default XFormCore;
