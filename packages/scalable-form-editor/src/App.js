/**
 * xform-builder app
 * @props: width（指定组件容器宽度） height（指定组件容器高度） platformConfigSupport（是否支持适配端切换，如果设置为true，则顶部工具栏中才会有适配端切换入口） platform（指定表单配置的适配端，对于设置了该属性的情形，会默认采用当前适配端，不允许用户修改） env（指定xform组件当前运行的环境，dev表示开发环境、daily表示日常环境、pre表示预发环境、prod表示生产环境；默认值为生产环境） emptyPlaceholder（配置区域初始空状态占位图，允许自定义风格的占位图） popupContainer（指定浮层渲染容器） bizCode（xform对应的业务场景code） formCode（之前保存的formCode，用来还原表单配置） formType（表单类型 1:模板 2:表单 3:业务字段 4:业务属性） onSubmit（xform配置提交时执行的方法，该方法中会注入提交后返回的formCode） beforeSubmit（xform配置提交前执行的方法，该方法要返回一个boolean类型，如果return false则不执行配置提交） systemFieldEditable（系统字段是否可编辑，默认不能编辑） filterSystemFields（是否过滤系统字段，默认不过滤） commonFieldSupport（是否开启通用字段支持，默认不开启） bizDataSupport（是否开启字段业务属性配置支持，默认不开启） langConfigSupport（是否支持表单多语言配置，默认不开启。开启该特性，需要服务端能够支持多语言配置） supportFieldList（支持的自定义字段配置列表，允许配置自己想要的自定义字段，默认全部支持） supportConfigList（支持的字段配置项列表，允许配置自己想要的字段配置项，默认全部支持） overwriteSchema（用来决定“保存”动作是新增schema还是更新schema，为true表示每次提交都是更新schema，为false表示每次提交都是新增schema） defaultActionButtons（是否使用默认的动作按钮，默认的动作按钮包括预览和保存，可以设置为在一些需要扩展的场景不使用默认内置的动作按钮，默认是启用默认动作按钮）renderActionButtons(自定义渲染组件的动作按钮，适用于在组件下方自定义一些动作按钮的情形) getInstance（暴露的获取组件实例的方法，通过这种方法可以绕开使用React的ref获取实例的方法） registerWidgets（高级用法，相当于二次开发。注册自定义字段，允许通过该方法注册自己业务所需的自定义字段，registerWidgets的数据格式为
 * {
 *      code: 'widget code',    // 自定义字段在XForm里面的注册code值
 *      component: {React Component},
 *      icon: 'xform icon type',
 *      label: 'field label',
 *      schema: {
 *          jsonSchema: {}  // 生成自定义字段的jsonSchema（只需要写properties里面的内容即可）
 *          uiSchema: {}    // 生成自定义字段的uiSchema
 *          formData: {}    // 生成自定义字段的formData
 *      },
 *      configFields: [config field code],  // name和code为默认必带的字段配置项
 *      customConfigFields: [{
 *          code: '',           // 该字段的自定义配置项的code值
 *          schema: {
 *              jsonSchema: {}, // 该字段的自定义配置项的jsonSchema（只需要写properties里面的内容即可）
 *              uiSchema: {},   // 该字段的自定义配置项的uiSchema
 *              formData: {}    // 该字段的自定义配置项的formData
 *          },
 *          configToSchemaConverter: () => {},  // 该配置项的值到自定义字段schema变动的转换方法
 *          schemaToConfigConverter: () => {}   // 从自定义字段的schema中获取该配置项的值的方法
 *      }]
 * }）
 * @states: formSchemaModalVisible（表单Schema预览，给开发者使用） formPreviewModalVisible（表单预览浮层是否可见） formBaseConfigModalVisible（表单属性配置浮层是否可见） formTitle（表单title） formDescription（表单description）
 */


import './App.less';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Button, message} from 'antd';
import classnames from 'classnames';

import {getMessageId} from './i18n/localeMessages';
import {util} from './common/util';
import * as CONST from './common/const';
import actionCreators, {setLogger} from './actionCreator';
import {request} from './common/request';
import ConfigSchema from './configSchema/index';

// app所依赖的所有模块
import FieldPicker from './component/fieldPicker';
import FieldList from './component/fieldList';
import FieldConfig from './component/fieldConfig';
import PlatformPopover from './popover/platform';
import BaseFormConfigPopover from './popover/baseConfig';
import LangConfigPopover from './popover/langConfig';
import MoreFunctionPopover from './popover/moreFunction';
import ViewSchemaModal from './popover/viewSchema';
import PreviewPopover from './popover/preview';
import {getFieldsBySchema} from "./common/fields";
import Logger from './logger';

class App extends PureComponent {
    static propTypes = {
        width: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        height: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        platformConfigSupport: PropTypes.bool,
        platform: PropTypes.oneOf(['laptop', 'mobile', 'both']),
        env: PropTypes.oneOf(['dev', 'prod']),
        previewDomain: PropTypes.string,
        emptyPlaceholder: PropTypes.element,
        popupContainer: PropTypes.func,
        bizCode: PropTypes.string,
        formCode: PropTypes.string,
        formType: PropTypes.oneOf([1, 2, 3, 4]),
        namespace: PropTypes.string.isRequired,
        messages: PropTypes.object.isRequired,
        locale: PropTypes.string.isRequired,
        xformBuilderData: PropTypes.object.isRequired,
        dispatch: PropTypes.func,
        filterSystemFields: PropTypes.bool,
        systemFieldSupport: PropTypes.bool,
        commonFieldSupport: PropTypes.bool,
        bizDataSupport: PropTypes.bool,
        langConfigSupport: PropTypes.bool,
        overwriteSchema: PropTypes.bool,
        supportFieldList: PropTypes.array,
        supportConfigList: PropTypes.array,
        supportLangList: PropTypes.array,
        registerWidgets: PropTypes.array,
        systemTemplate: PropTypes.string,
        commonTemplate: PropTypes.string,
        attributeTemplate: PropTypes.string,
        optionTemplate: PropTypes.string,
        onError: PropTypes.func,
        defaultActionButtons: PropTypes.bool,
        renderActionButtons: PropTypes.func,
        getInstance: PropTypes.func,

        jsonSchema: PropTypes.object,
        uiSchema: PropTypes.object,
        formData: PropTypes.object,
        bizData: PropTypes.object,
        sequence: PropTypes.array,

        componentRecognize: PropTypes.shape({
            enable: PropTypes.bool,
            recognize: PropTypes.func
        })
    };

    static defaultProps = {
        width: 'auto',
        height: 'auto',
        platformConfigSupport: false,
        env: 'prod',
        previewDomain: 'h5.m.taobao.com',
        popupContainer: () => document.body,
        bizCode: 'common',
        formType: 2,
        filterSystemFields: false,
        systemFieldSupport: false,
        commonFieldSupport: false,
        bizDataSupport: false,
        langConfigSupport: false,
        overwriteSchema: true,
        supportFieldList: [],
        supportConfigList: CONST.CONFIGUEABLE_FIELD_CONFIG_CODE,
        registerWidgets: [],
        defaultActionButtons: true,
        renderActionButtons: null,
        getInstance: () => {},
        componentRecognize: {
            enable: false
        }
    };


    constructor(props) {
        super(props);
        const {formCode, platform} = this.props;
        this.handleFormSave = this.handleFormSave.bind(this);
        this.fetchInitConfig = this.fetchInitConfig.bind(this);
        this.refetchLangConfig = this.refetchLangConfig.bind(this);
        this.fetchSelectedFieldData = this.fetchSelectedFieldData.bind(this);
        this.fetchFieldDataSourceList = this.fetchFieldDataSourceList.bind(this);
        this.fetchFormDataSourceList = this.fetchFormDataSourceList.bind(this);
        this.fetchServerCodeList = this.fetchServerCodeList.bind(this);
        this.updateLangConfigHandler = this.updateLangConfigHandler.bind(this);
        this.updateFieldsHandler = this.updateFieldsHandler.bind(this);
        this.addFieldHandler = this.addFieldHandler.bind(this);
        this.addFieldDataWithIndex = this.addFieldDataWithIndex.bind(this);
        this.changeEditFieldHandler = this.changeEditFieldHandler.bind(this);
        this.deleteEditFieldHandler = this.deleteEditFieldHandler.bind(this);
        this.updateFieldItemHandler = this.updateFieldItemHandler.bind(this);
        this.updateFieldDataHandler = this.updateFieldDataHandler.bind(this);
        this.handleFormSchemaView = this.handleFormSchemaView.bind(this);
        this.handleViewSchemaModalClose = this.handleViewSchemaModalClose.bind(this);
        this.handlePlatformVisibleChange = this.handlePlatformVisibleChange.bind(this);
        this.handlePlatformChange = this.handlePlatformChange.bind(this);
        this.handleFormBaseVisibleChange = this.handleFormBaseVisibleChange.bind(this);
        this.handleLangConfigChange = this.handleLangConfigChange.bind(this);
        this.handleLangConfigVisibleChange = this.handleLangConfigVisibleChange.bind(this);
        this.handleFormBaseChange = this.handleFormBaseChange.bind(this);
        this.handleGlobalConfigChange = this.handleGlobalConfigChange.bind(this);
        this.handleGlobalConfigVisibleChange = this.handleGlobalConfigVisibleChange.bind(this);
        this.handleFormPreview = this.handleFormPreview.bind(this);
        this.handleFormPreviewVisibleChange = this.handleFormPreviewVisibleChange.bind(this);
        this.toggleFullScreen = this.toggleFullScreen.bind(this);
        this.handleCloseFieldConfigPanel = this.handleCloseFieldConfigPanel.bind(this);
        this.renderDefaultActionButtons = this.renderDefaultActionButtons.bind(this);

        this.state = {
            fullscreen: false,  /* 全屏模式 */
            fieldConfigDrawerVisible: false,
            formCode,
            formSchemaModalVisible: false,
            platform: this._isValidPlatform(platform) ? platform : 'laptop',
            platformPopoverVisible: false,
            baseConfigPopoverVisible: false,
            langConfigPopoverVisible: false,
            moreFunctionPopoverVisible: false,
            previewPopoverVisible: false,
            formTitle: '',
            formDescription: '',
            formDataSourceCode: undefined,
            formSchema: {}
        };
        this.instance = {
            handleFormSave: this.handleFormSave
        };
        const logEvent = props.logEvent || (() => {});
        this.logger = new Logger(logEvent);
        setLogger(this.logger);
    }

    componentDidMount() {
        const namespace = this.props.namespace;
        // systemFieldSupport为一个开关属性，用来设置builder是否载入“系统字段”模块
        const systemFieldSupport = this.props.systemFieldSupport;
        // commonFieldSupport为一个开关属性，用来设置builder是否载入“通用字段”模块
        const commonFieldSupport = this.props.commonFieldSupport;
        // bizDataSupport为一个开关属性，用来设置builder是否载入字段“业务属性”配置模块
        const bizDataSupport = this.props.bizDataSupport;
        // langConfigSupport为一个开关属性，用来设置builder是否载入多语言配置的特性
        const langConfigSupport = this.props.langConfigSupport;
        const {formCode} = this.state;
        this.logger.logPageView();
        this.props.getInstance(this.instance);

        // 获取builder的initConfig（包括systemTemplate系统字段、commonTemplate通用模板、attributeTemplate业务属性、optionTemplate选项业务属性）
        this.fetchInitConfig().then((data) => {
            // 从localStorage中获取globalConfig（只需要初始获取一次）
            const globalConfig = util.getXFormLocalStorage() !== null ? util.getXFormLocalStorage() : {
                codeEditable: false,
                fieldPreviewable: false
            };
            this.updateGlobalConfigHandler(globalConfig);
            if (!systemFieldSupport) {
                // 清空系统字段数据
                this.props.dispatch(actionCreators.clearSystemFieldData(namespace));
            }
            if (!commonFieldSupport) {
                // 清空通用字段数据
                this.props.dispatch(actionCreators.clearCommonFieldData(namespace));
            }
            if (!bizDataSupport) {
                // 清空业务属性
                this.props.dispatch(actionCreators.clearBizData(namespace));
                this.props.dispatch(actionCreators.clearOptionBizData(namespace));
            }

            if (!langConfigSupport) {
                // 清空多语言配置数据
                this.props.dispatch(actionCreators.clearLangConfig(namespace));
                this.fetchSelectedFieldData();
            } else {
                // 支持多语言的场景要传入获取到的defaultLang，获取默认语言版本的表单数据
                this.fetchSelectedFieldData({
                    lang: data.defaultLang
                });
            }

            // 获取配置数据源列表数据
            this.fetchFieldDataSourceList();
            // 获取表单配置数据源列表数据
            this.fetchFormDataSourceList();
            // 获取动态校验器列表数据
            this.fetchServerCodeList();
            // 存取表单基础配置
            const {platform} = this.props;
            if (platform) {
                if (data.platform !== platform) {
                    console.warn('[xform-editor]当前编辑的表单所属的适配端和设置的platform属性不匹配，已强制使用设置的platform属性');
                }
                this.setState({
                    formTitle: data.formTitle || '',
                    formDescription: data.formDescription || '',
                    formDataSourceCode: data.formDataSourceCode
                });
            } else {
                this.setState({
                    platform: data.platform || 'laptop',
                    formTitle: data.formTitle || '',
                    formDescription: data.formDescription || '',
                    formDataSourceCode: data.formDataSourceCode
                });
            }

            // 清除正在编辑的字段数据，置editFieldData为null
            this.props.dispatch(actionCreators.updateEditFieldData(null, namespace));
        });

    }

    componentWillReceiveProps(nextProps) {
        const namespace = nextProps.namespace;
        // systemFieldSupport为一个开关属性，用来设置builder是否载入“系统字段”模块
        const systemFieldSupport = nextProps.systemFieldSupport;
        // commonFieldSupport为一个开关属性，用来设置builder是否载入“通用字段”模块
        const commonFieldSupport = nextProps.commonFieldSupport;
        // bizDataSupport为一个开关属性，用来设置builder是否载入字段“业务属性”配置模块
        const bizDataSupport = nextProps.bizDataSupport;
        // langConfigSupport为一个开关属性，用来设置builder是否载入多语言配置的特性
        const langConfigSupport = nextProps.langConfigSupport;
        const bizCode = this.props.bizCode,
            nextBizCode = nextProps.bizCode;
        const formCode = this.props.formCode,
            nextFormCode = nextProps.formCode;
        const formType = this.props.formType,
            nextFormType = nextProps.formType;
        const locale = this.props.locale,
            nextLocale = nextProps.locale;
        const supportLangList = this.props.supportLangList,
            nextSupportLangList = nextProps.supportLangList;
        const systemTemplate = this.props.systemTemplate,
            nextSystemTemplate = nextProps.systemTemplate;
        const commonTemplate = this.props.commonTemplate,
            nextCommonTemplate = nextProps.commonTemplate;
        const attributeTemplate = this.props.attributeTemplate,
            nextAttributeTemplate = nextProps.attributeTemplate;
        const optionTemplate = this.props.optionTemplate,
            nextOptionTemplate = nextProps.optionTemplate;

        if (bizCode !== nextBizCode ||
            formCode !== nextFormCode ||
            formType !== nextFormType ||
            locale !== nextLocale ||
            JSON.stringify(supportLangList) !== JSON.stringify(nextSupportLangList) ||
            systemTemplate !== nextSystemTemplate ||
            commonTemplate !== nextCommonTemplate ||
            attributeTemplate !== nextAttributeTemplate ||
            optionTemplate !== nextOptionTemplate
        ) {
            const newParams = {
                bizCode: nextBizCode,
                formCode: nextFormCode,
                formType: nextFormType,
                locale: nextLocale,
                supportLangList: nextSupportLangList,
                systemTemplate: nextSystemTemplate,
                commonTemplate: nextCommonTemplate,
                attributeTemplate: nextAttributeTemplate,
                optionTemplate: nextOptionTemplate
            };

            this.setState({
                formCode: nextFormCode
            }, () => {
                this.fetchInitConfig(newParams).then((data) => {
                    if ((systemFieldSupport !== this.props.systemFieldSupport) && !systemFieldSupport) {
                        // 清空系统字段
                        this.props.dispatch(actionCreators.clearSystemFieldData(namespace));
                    }
                    if ((bizDataSupport !== this.props.bizDataSupport) && !bizDataSupport) {
                        // 清空业务属性
                        this.props.dispatch(actionCreators.clearBizData(namespace));
                        this.props.dispatch(actionCreators.clearOptionBizData(namespace));
                    }
                    if ((commonFieldSupport !== this.props.commonFieldSupport) && !commonFieldSupport) {
                        // 清空通用字段数据
                        this.props.dispatch(actionCreators.clearCommonFieldData(namespace));
                    }
                    if ((langConfigSupport !== this.props.langConfigSupport) && !langConfigSupport) {
                        // 清空多语言配置数据
                        this.props.dispatch(actionCreators.clearLangConfig(namespace));
                    }

                    if (!langConfigSupport) {
                        // 清除生效字段fields
                        this.props.dispatch(actionCreators.updateFields([], namespace));
                        this.fetchSelectedFieldData(newParams);
                    } else {
                        // 支持多语言的场景要传入获取到的defaultLang，获取默认语言版本的表单数据
                        this.props.dispatch(actionCreators.updateFields([], namespace));
                        this.fetchSelectedFieldData(Object.assign({}, newParams, {
                            lang: data.defaultLang
                        }));
                    }

                    // 获取字段配置数据源列表数据
                    this.fetchFieldDataSourceList();
                    // 获取表单配置数据源列表数据
                    this.fetchFormDataSourceList();
                    // 获取动态校验器列表数据
                    this.fetchServerCodeList();

                    // 存取表单基础配置
                    const {platform} = nextProps;
                    if (platform) {
                        if (data.platform !== platform) {
                            console.warn('[xform-editor]当前编辑的表单所属的适配端和设置的platform属性不匹配，已强制使用设置的platform属性');
                        }
                        this.setState({
                            formTitle: data.formTitle || '',
                            formDescription: data.formDescription || '',
                            formDataSourceCode: data.formDataSourceCode
                        });
                    } else {
                        this.setState({
                            platform: data.platform || 'laptop',
                            formTitle: data.formTitle || '',
                            formDescription: data.formDescription || '',
                            formDataSourceCode: data.formDataSourceCode
                        });
                    }

                    // 清除正在编辑的字段数据，置editFieldData为null
                    this.props.dispatch(actionCreators.updateEditFieldData(null, namespace));
                });
            });
        }
    }

    componentDidCatch(error, info) {
        const {onError} = this.props;
        if (typeof onError === 'function') {
            onError(error, info);
        }
        console.error('[xform-builder] error', error);
    }

    componentWillUnmount() {
        this.props.getInstance(null);
    }

    // 表单“schema预览”操作
    handleFormSchemaView() {
        const {formTitle, formDescription} = this.state;
        const xformBuilderData = this.props.xformBuilderData;
        let jsonSchema = {}, uiSchema = {},
            formData = {}, bizData = {}, sequence = [];
        let formSchema = {};
        let requiredField = [];
        // 解析xformBuilderData，提取预览xform数据
        xformBuilderData.fields.map((field) => {
            let bizData = field.bizData;
            bizData[field.code].type = field.type;
            bizData[field.code].fieldType = field.fieldType;
            if (field.required) {
                requiredField.push(field.code);
            }
            jsonSchema = Object.assign({}, jsonSchema, field.jsonSchema);
            uiSchema = Object.assign({}, uiSchema, field.uiSchema);
            formData = Object.assign({}, formData, field.formData);
            bizData = Object.assign({}, bizData, bizData);
            sequence.push(field.code);
        });
        jsonSchema = {
            title: formTitle,
            description: formDescription,
            type: 'object',
            required: requiredField,
            properties: jsonSchema
        };
        formSchema = {
            jsonSchema,
            uiSchema,
            formData,
            bizData,
            sequence
        };
        this.setState({
            formSchemaModalVisible: true,
            formSchema
        });
    }

    handleViewSchemaModalClose() {
        this.setState({
            formSchemaModalVisible: false
        });
    }

    // 表单配置“预览”操作
    handleFormPreview() {
        const {env, customGateway, customInterfaces, messages, registerWidgets, supportFieldList} = this.props;
        const {formTitle, formDescription, platform, formDataSourceCode} = this.state;
        const xformBuilderData = this.props.xformBuilderData;
        const fieldsData = (xformBuilderData && xformBuilderData.fields) || [];
        let jsonSchema = {}, uiSchema = {},
            formData = {}, bizData = {}, sequence = [];
        let formSchema = {}, formDataFromDataSource = {};
        let requiredField = [];

        const configSchema = ConfigSchema.getDefaultConfig(messages, registerWidgets, supportFieldList);
        let configPlatform;
        let hasUnsupportedField = false;

        // 解析xformBuilderData，提取预览xform数据
        fieldsData.map((field) => {
            let bizData = field.bizData;
            configPlatform = configSchema[field.type].platform || [];
            // 判断当前字段是否支持当前平台
            if (field.fieldType !== 'system' && !util._isInConfigPlatform(configPlatform, platform)) {
                hasUnsupportedField = true;
            }
            bizData[field.code].type = field.type;
            bizData[field.code].fieldType = field.fieldType;
            if (field.required) {
                requiredField.push(field.code);
            }
            jsonSchema = Object.assign({}, jsonSchema, field.jsonSchema);
            uiSchema = Object.assign({}, uiSchema, field.uiSchema);
            formData = Object.assign({}, formData, field.formData);
            bizData = Object.assign({}, bizData, bizData);
            sequence.push(field.code);
        });
        jsonSchema = {
            title: formTitle,
            description: formDescription,
            type: 'object',
            required: requiredField,
            properties: jsonSchema
        };
        formSchema = {
            jsonSchema,
            uiSchema,
            formData,
            bizData,
            sequence
        };

        if (hasUnsupportedField) {
            switch (platform) {
                case 'laptop':
                    message.error(messages[getMessageId('xformHasLaptopNotSupportFieldTip')]);
                    break;
                case 'mobile':
                    message.error(messages[getMessageId('xformHasMobileNotSupportFieldTip')]);
                    break;
                case 'both':
                    message.error(messages[getMessageId('xformHasBothNotSupportFieldTip')]);
                    break;
            }
        }

        // 如果表单配置了表单数据源，则在预览时，要请求数据源接口，并将数据源返回数据填充到预览表单中。如果表单没有配置formDataSourceCode，则服务端会返回null
        if (typeof formDataSourceCode !== 'undefined' && formDataSourceCode !== null) {
            request.fetch(request.getInterface('dataSourceServerUrl', customInterfaces, env), {
                sourceCode: formDataSourceCode,
                params: Object.assign({}, formData),
                stringifyParams: JSON.stringify(Object.assign({}, formData))
            }, customGateway, env).then((data) => {
                if (data && data.data && typeof data.data.formDataMap === 'object') {
                    formDataFromDataSource = data.data.formDataMap;
                    formSchema.formData = {
                        ...formData,
                        ...formDataFromDataSource
                    };
                }
                this.setState({
                    previewPopoverVisible: true,
                    formSchema
                });
            }).catch((data) => {
                this.logger.logException('xformBuilder.dataSourceServerUrl', true);
                message.error(messages[getMessageId('xformGetFormDataSourceErrorTip')] + data.message);
                this.setState({
                    previewPopoverVisible: true,
                    formSchema
                });
            });
        } else {
            this.setState({
                previewPopoverVisible: true,
                formSchema
            });
        }
    }

    handleFormPreviewVisibleChange(visible) {
        if (visible) {
            this.handleFormPreview();
        } else {
            this.setState({
                previewPopoverVisible: false
            });
        }
    }

    // 表单配置“保存”操作
    handleFormSave() {
        const {env, messages, registerWidgets, supportFieldList, langConfigSupport, customGateway, customInterfaces, beforeSubmit, onSubmit, xformBuilderData, bizCode, formType, overwriteSchema} = this.props;
        const {formTitle, formDescription, formDataSourceCode, platform, formCode} = this.state;
        const fieldsData = (xformBuilderData && xformBuilderData.fields) || [];
        const langs = (xformBuilderData && xformBuilderData.langs) || {};
        let jsonSchema = {}, uiSchema = {}, formData = {}, bizData = {};
        let sequence = [];
        let requiredField = [];
        let submitParams = {};

        const configSchema = ConfigSchema.getDefaultConfig(messages, registerWidgets, supportFieldList);
        let configPlatform;
        let hasUnsupportedField = false;

        // 解析xformBuilderData，提取预览xform数据
        fieldsData.map((field) => {
            sequence.push(field.code);
            let fieldBizData = field.bizData;
            configPlatform = configSchema[field.type].platform || [];
            // 判断当前字段是否支持当前平台
            if (field.fieldType !== 'system' && !util._isInConfigPlatform(configPlatform, platform)) {
                hasUnsupportedField = true;
            }
            fieldBizData[field.code].type = field.type;
            // 根据formType，需要对fields中的fieldType进行修正。formType = 1（配置系统字段，fieldType = system） formType = 3（配置通用字段，fieldType = common）,formType为其他值时不修正fieldType
            if (formType === 1) {
                fieldBizData[field.code].fieldType = 'system';
            } else if (formType === 3) {
                fieldBizData[field.code].fieldType = 'common';
            } else {
                fieldBizData[field.code].fieldType = field.fieldType;
            }
            if (field.required) {
                requiredField.push(field.code);
            }
            jsonSchema = Object.assign({}, jsonSchema, field.jsonSchema);
            uiSchema = Object.assign({}, uiSchema, field.uiSchema);
            formData = Object.assign({}, formData, field.formData);
            bizData = Object.assign({}, bizData, fieldBizData);
        });
        jsonSchema = {
            title: formTitle,
            description: formDescription,
            type: 'object',
            required: requiredField,
            properties: jsonSchema
        };

        // 判断是否存在当前端不支持的字段，如果存在不允许提交
        if (hasUnsupportedField) {
            if (platform === 'laptop') {
                message.error(messages[getMessageId('xformHasLaptopNotSupportFieldTip')]);
            } else if (platform === 'mobile') {
                message.error(messages[getMessageId('xformHasMobileNotSupportFieldTip')]);
            }
            return;
        }

        // 执行beforeSubmit，判断下是否提交到服务端
        if (typeof beforeSubmit === 'function' && !beforeSubmit({ jsonSchema, uiSchema, formData, bizData, sequence })) {
            return;
        }
        if (overwriteSchema && (typeof formCode === 'string' && formCode !== '')) {
            // 编辑保存
            if (langConfigSupport) {
                submitParams = {
                    langConfig: JSON.stringify(langs.langs),
                    configVersion: 'v2',
                    platform,
                    formDataSourceCode,
                    formCode: formCode,
                    schemaContent: JSON.stringify({
                        jsonSchema: jsonSchema,
                        uiSchema: uiSchema,
                        formData: formData,
                        bizData: bizData,
                        sequence: sequence
                    })
                }
            } else {
                submitParams = {
                    platform,
                    formDataSourceCode,
                    formCode: formCode,
                    schemaContent: JSON.stringify({
                        jsonSchema: jsonSchema,
                        uiSchema: uiSchema,
                        formData: formData,
                        bizData: bizData,
                        sequence: sequence
                    })
                };
            }

            request.fetch(request.getInterface('updateFieldsData', customInterfaces, env), submitParams, customGateway, env, {
                type: 'POST'
            }).then((data) => {
                this.setState({
                    formCode: data.formCode
                }, () => {
                    // 重新获取多语言配置
                    this.refetchLangConfig({
                        formCode: data.formCode
                    });
                });
                if (typeof onSubmit === 'function') {
                    onSubmit(data.formCode, { jsonSchema, uiSchema, formData, bizData, sequence });
                }
            }).catch((data) => {
                this.logger.logException('xformBuilder.updateForm', true);
                message.error(messages[getMessageId('xformUpdateSchemaErrorTip')] + data.message);
            });
        } else {
            // 新建保存
            if (langConfigSupport) {
                submitParams = {
                    langConfig: JSON.stringify(langs.langs),
                    configVersion: 'v2',
                    fromFormCode: formCode,
                    platform,
                    formDataSourceCode,
                    bizCode: bizCode,
                    formType: formType,
                    schemaContent: JSON.stringify({
                        jsonSchema: jsonSchema,
                        uiSchema: uiSchema,
                        formData: formData,
                        bizData: bizData,
                        sequence: sequence
                    })
                };
            } else {
                submitParams = {
                    platform,
                    formDataSourceCode,
                    bizCode: bizCode,
                    formType: formType,
                    schemaContent: JSON.stringify({
                        jsonSchema: jsonSchema,
                        uiSchema: uiSchema,
                        formData: formData,
                        bizData: bizData,
                        sequence: sequence
                    })
                };
            }
            const saveFieldsData = () => new Promise((resolve, reject) => {
                if(env === 'dev'){
                    resolve({"formCode": "DEV_NEW"});
                }else{
                    request.fetch(request.getInterface('saveFieldsData', customInterfaces, env), submitParams, customGateway, env, {
                        type: 'POST'
                    }).then(resolve).catch(reject);
                }
            });
            saveFieldsData().then((data) => {
                // 新建表单，需要将formCode更新为当前创建的formCode
                if(data.formCode !== 'DEV_NEW'){
                    this.setState({
                        formCode: data.formCode
                    }, () => {
                        this.refetchLangConfig({
                            formCode: data.formCode
                        });
                    });
                }
                if (typeof onSubmit === 'function') {
                    onSubmit(data.formCode, { jsonSchema, uiSchema, formData, bizData, sequence });
                }
            }).catch((data) => {
                this.logger.logException('xformBuilder.saveForm', true);
                message.error(messages[getMessageId('xformSaveSchemaErrorTip')] + data.message);
            });
        }
    }

    fetchInitConfig(combineParams = {}) {
        const {messages, bizCode, locale, systemFieldSupport, commonFieldSupport, bizDataSupport, langConfigSupport, supportLangList, systemTemplate, commonTemplate, attributeTemplate, optionTemplate, env, namespace, customInterfaces, customGateway, formCode} = this.props;

        const params = {
            env,
            namespace,
            bizCode,
            locale,
            formCode,
            systemFieldSupport,
            commonFieldSupport,
            bizDataSupport,
            langConfigSupport,
            supportLangList,
            systemTemplate,
            commonTemplate,
            attributeTemplate,
            optionTemplate,
            customInterfaces,
            customGateway
        };
        return new Promise((resolve, reject) => {
            this.props.dispatch(actionCreators.fetchInitConfig(Object.assign({}, params, combineParams), messages, resolve, reject));
        });
    }

    // 更新多语言的langs配置
    refetchLangConfig(combineParams = {}) {
        const {messages, bizCode, locale, systemFieldSupport, commonFieldSupport, bizDataSupport, langConfigSupport, supportLangList, systemTemplate, commonTemplate, attributeTemplate, optionTemplate, env, namespace, customInterfaces, customGateway, formCode, xformBuilderData} = this.props;

        const currentLang = xformBuilderData.langs.currentLang;
        const params = {
            env,
            namespace,
            bizCode,
            locale,
            formCode,
            systemFieldSupport,
            commonFieldSupport,
            bizDataSupport,
            langConfigSupport,
            supportLangList,
            systemTemplate,
            commonTemplate,
            attributeTemplate,
            optionTemplate,
            customInterfaces,
            customGateway
        };
        this.props.dispatch(actionCreators.refetchLangConfig(Object.assign({}, params, combineParams), messages, currentLang));
    }

    // 获取生效字段初始field数据
    fetchSelectedFieldData(combineParams = {}) {
        const {messages, bizCode, formType, systemFieldSupport, filterSystemFields, langConfigSupport, customInterfaces, customGateway, namespace, env} = this.props;
        const {formCode} = this.state;
        const params = {
            env,
            namespace,
            bizCode,
            formCode,
            formType,
            customInterfaces,
            customGateway,
            langConfigSupport,
            systemFieldSupport,
            jsonSchema: this.props.jsonSchema || null,
            uiSchema: this.props.uiSchema || null,
            formData: this.props.formData || null,
            bizData: this.props.bizData || null,
            sequence: this.props.sequence || null
        };
        this.props.dispatch(actionCreators.fetchSelectedFieldData(Object.assign({}, params, combineParams), filterSystemFields, messages));
    }

    // 获取配置数据源列表（字段级别的数据源列表）
    fetchFieldDataSourceList() {
        const messages = this.props.messages;
        const {customInterfaces, customGateway, namespace, env} = this.props;

        this.props.dispatch(actionCreators.fetchFieldDataSourceList({ customInterfaces, customGateway, namespace, env }, messages, namespace));
    }

    // 获取配置数据源列表（表单级别的数据源列表）
    fetchFormDataSourceList() {
        const messages = this.props.messages;
        const {customInterfaces, customGateway, namespace, env} = this.props;

        this.props.dispatch(actionCreators.fetchFormDataSourceList({ customInterfaces, customGateway, namespace, env }, messages, namespace));
    }

    // 获取动态校验器列表
    fetchServerCodeList() {
        const messages = this.props.messages;
        const {customInterfaces, customGateway, namespace, env} = this.props;

        this.props.dispatch(actionCreators.fetchServerCodeList({ customInterfaces, customGateway, namespace, env }, messages));
    }

    updateGlobalConfigHandler(globalConfig) {
        const namespace = this.props.namespace;
        this.props.dispatch(actionCreators.updateGlobalConfig(globalConfig, namespace));
    }

    updateLangConfigHandler(langConfig) {
        const namespace = this.props.namespace;
        this.props.dispatch(actionCreators.updateLangConfig(langConfig, namespace));
    }

    // 更新整个fields数据（这里面的逻辑要慎重！！）
    updateFieldsHandler(fields) {
        const namespace = this.props.namespace;
        this.props.dispatch(actionCreators.updateFields(fields, namespace));
    }

    // 点击字段选择中的“通用模板”或“自定义类型”添加生效字段
    addFieldHandler(fieldData) {
        const namespace = this.props.namespace;
        this.props.dispatch(actionCreators.addSelectedFieldData(fieldData, namespace));
    }

    // 在生效字段中索引为index的位置增加“通用模板”或“自定义类型”字段
    addFieldDataWithIndex(fieldData, index) {
        const namespace = this.props.namespace;
        this.props.dispatch(actionCreators.addFieldDataWithIndex(fieldData, index, namespace));
    }

    // 点击“生效字段”handler
    changeEditFieldHandler(fieldData) {
        const namespace = this.props.namespace;
        const {fullscreen} = this.state;
        if (!fullscreen) {
            this.setState({
                fieldConfigDrawerVisible: true
            });
        }
        this.props.dispatch(actionCreators.updateEditFieldData(fieldData, namespace));
    }

    // 删除“生效字段”handler
    deleteEditFieldHandler(code) {
        const namespace = this.props.namespace;
        this.props.dispatch(actionCreators.deleteSelectedFieldData(code, namespace));
    }

    // 更新“生效字段”中某一个字段的数据（不更新编辑中的字段数据）
    updateFieldItemHandler(code, fieldData) {
        const namespace = this.props.namespace;
        this.props.dispatch(actionCreators.updateSelectedFieldItemData(code, fieldData, namespace));
    }

    // 更新“生效字段”handler
    updateFieldDataHandler(code, fieldData) {
        const namespace = this.props.namespace;
        this.props.dispatch(actionCreators.updateEditFieldData(fieldData, namespace));
        this.props.dispatch(actionCreators.updateSelectedFieldItemData(code, fieldData, namespace));
    }

    // 切换表单适应端（PC、移动端或两者）
    handlePlatformChange(platform) {
        this.setState({
            platformPopoverVisible: false,
            platform
        });
    }

    handlePlatformVisibleChange(visible) {
        this.setState({
            platformPopoverVisible: visible
        });
    }

    // 输入“标题设置”浮层
    handleFormBaseChange(formData) {
        this.setState({
            formTitle: formData.formTitle,
            formDescription: formData.formDesc
        });
    }

    handleFormBaseVisibleChange(visible) {
        this.setState({
            baseConfigPopoverVisible: visible
        });
    }

    // “更多功能”浮层
    handleGlobalConfigChange(formData) {
        // 更新globalConfig的localStorage
        const globalConfigData = {
            codeEditable: formData.codeEditable,
            fieldPreviewable: formData.fieldPreviewable
        };
        util.setXFormLocalStorage(globalConfigData);
        this.updateGlobalConfigHandler(globalConfigData);
        this.setState({
            formDataSourceCode: formData.formDataSourceCode
        });
    }

    handleDetectSuccess = (schema) => {
        console.warn('success in detect, get schema: ', schema);
        const {systemFieldSupport, filterSystemFields, namespace, xformBuilderData} = this.props;
        const data = getFieldsBySchema(schema);
        if (data && data.fields) {
            const originFieldsData = (xformBuilderData && xformBuilderData.fields) || [];
            // 获得原始system字段
            const originSystemFieldsData = originFieldsData.filter((originField) => {
                return originField.fieldType === 'system';
            });
            // 合并识别结果和系统system字段
            let fields = [...originSystemFieldsData, ...data.fields];
            if (!systemFieldSupport || filterSystemFields) {
                fields = fields.filter((field) => {
                    return field.fieldType !== 'system';
                });
            }
            this.props.dispatch({
                type: CONST.XFORM_BUILDER_INIT_FIELDS,
                data: fields,
                namespace
            });
        }
    };

    handleGlobalConfigVisibleChange(visible) {
        this.setState({
            moreFunctionPopoverVisible: visible
        });
    }

    // 切换多语言配置
    handleLangConfigChange(langConfig, isSwitchCurrentLang = false) {
        const namespace = this.props.namespace;
        this.updateLangConfigHandler(langConfig);
        if (isSwitchCurrentLang) {
            // 切换当前配置的语言，需要重新获取新语言下的表单字段
            this.fetchSelectedFieldData({
                lang: langConfig.currentLang
            });
            // 切换语言后要清除正在编辑的字段数据，置editFieldData为null
            this.props.dispatch(actionCreators.updateEditFieldData(null, namespace));
        }
    }

    handleLangConfigVisibleChange(visible) {
        this.setState({
            langConfigPopoverVisible: visible
        });
    }

    renderDefaultActionButtons() {
        const {messages} = this.props;
        return (
            <div className="app-xform-builder-action">
                <Button
                    type="primary"
                    onClick={this.handleFormSave}
                >{messages[getMessageId('xformSaveButton')]}</Button>
            </div>
        );
    }

    toggleFullScreen() {
        const {fullscreen} = this.state;
        this.setState({
            fullscreen: !fullscreen
        });
    }

    handleCloseFieldConfigPanel(event) {
        event.stopPropagation();
        this.setState({
            fieldConfigDrawerVisible: false
        });
    }

    _getLangNameFromLocale(langs, locale) {
        let result = '';
        langs.map((lang) => {
            if (lang.locale === locale) {
                result = lang.name;
            }
        });
        return result;
    }

    // 初始校验用户传入的platform属性是否合法
    _isValidPlatform(platform) {
        const platforms = ['laptop', 'mobile', 'both'];
        if (platforms.indexOf(platform) > -1) {
            return true;
        } else {
            if (typeof platform !== 'undefined') {
                console.warn('[xform-editor]传入的platform属性不合法，必须为laptop、mobile或both');
            }
            return false;
        }
    }

    render() {
        const {fullscreen, platform, platformPopoverVisible, langConfigPopoverVisible, baseConfigPopoverVisible, moreFunctionPopoverVisible, formSchemaModalVisible, previewPopoverVisible, formSchema, formTitle, formDescription, formDataSourceCode, fieldConfigDrawerVisible} = this.state;
        const {width, height, platformConfigSupport, xformBuilderData, registerWidgets, locale, messages, emptyPlaceholder, popupContainer, supportFieldList, supportConfigList, langConfigSupport, customInterfaces, customGateway, customUploadRequest, onImagePreview, defaultActionButtons, renderActionButtons} = this.props;
        const systemFieldEditable = this.props.systemFieldEditable;
        const langs = (xformBuilderData && xformBuilderData.langs) || {};
        const globalConfig = (xformBuilderData && xformBuilderData.globalConfig) || {};
        const formDataSourceList = (xformBuilderData && xformBuilderData.formDataSource) || [];

        return (
            <div
                className={classnames({
                    'app-xform-builder': true,
                    fullscreen
                })}
                style={{
                    width: fullscreen ? '100%' : (width !== 'auto' ? width : '100%'),
                    height: '100%'
                }}
            >
                <div className="app-xform-builder-header">
                    <ul className="opt-front-list">
                        {platformConfigSupport && <PlatformPopover
                            messages={messages}
                            popupContainer={popupContainer}
                            visible={platformPopoverVisible}
                            platform={platform}
                            platformChangeHandler={this.handlePlatformChange}
                            platformVisibleChangeHandler={this.handlePlatformVisibleChange}
                        >
                            {(() => {
                                switch (platform) {
                                    case 'laptop':
                                        return (<li className="opt-item" onClick={() => { this.handlePlatformVisibleChange(true); }}>
                                            <i className="opt-icon xform-iconfont">&#xe842;</i>
                                            <span className="opt-name">{messages[getMessageId('xformChangePlatformPCName')]}</span>
                                        </li>);
                                    case 'mobile':
                                        return (<li className="opt-item" onClick={() => { this.handlePlatformVisibleChange(true); }}>
                                        <i className="opt-icon xform-iconfont">&#xe7b2;</i>
                                        <span className="opt-name">{messages[getMessageId('xformChangePlatformMobileName')]}</span>
                                    </li>);
                                    case 'both':
                                        return (<li className="opt-item" onClick={() => { this.handlePlatformVisibleChange(true); }}>
                                            <i className="opt-icon xform-iconfont">&#xe683;</i>
                                            <span className="opt-name">{messages[getMessageId('xformChangePlatformBothName')]}</span>
                                        </li>);
                                    default:
                                        return (<li className="opt-item" onClick={() => { this.handlePlatformVisibleChange(true); }}>
                                        <i className="opt-icon xform-iconfont">&#xe842;</i>
                                        <span className="opt-name">{messages[getMessageId('xformChangePlatformOptName')]}</span>
                                    </li>);
                                }
                            })()}

                        </PlatformPopover>}
                        {langConfigSupport && <LangConfigPopover
                            messages={messages}
                            popupContainer={popupContainer}
                            visible={langConfigPopoverVisible}
                            langConfig={xformBuilderData.langs}
                            langConfigChangeHandler={this.handleLangConfigChange}
                            langConfigVisibleChangeHandler={this.handleLangConfigVisibleChange}
                        >
                            <li className="opt-item">
                                <i className="opt-icon xform-iconfont">&#xe781;</i>
                                {(() => {
                                    if (langs.currentLang !== '') {
                                        return <span className="opt-name">
                                            {this._getLangNameFromLocale(langs.langs, langs.currentLang)}
                                        </span>
                                    } else {
                                        return <span className="opt-name">{messages[getMessageId('xformChangeLangOptName')]}</span>
                                    }
                                })()}
                            </li>
                        </LangConfigPopover>}
                        <BaseFormConfigPopover
                            messages={messages}
                            popupContainer={popupContainer}
                            visible={baseConfigPopoverVisible}
                            formData={{
                                formTitle,
                                formDesc: formDescription
                            }}
                            visibleChangeHandler={this.handleFormBaseVisibleChange}
                            formDataChangeHandler={this.handleFormBaseChange}
                        >
                            <li className="opt-item">
                                <i className="opt-icon xform-iconfont">&#xe7f4;</i>
                                <span className="opt-name">{messages[getMessageId('xformSaveFormTitleOptName')]}</span>
                            </li>
                        </BaseFormConfigPopover>
                        <MoreFunctionPopover
                            messages={messages}
                            popupContainer={popupContainer}
                            visible={moreFunctionPopoverVisible}
                            formDataSourceList={formDataSourceList}
                            formData={{
                                ...globalConfig,
                                formDataSourceCode
                            }}
                            formDataChangeHandler={this.handleGlobalConfigChange}
                            moreFunctionVisibleChangeHandler={this.handleGlobalConfigVisibleChange}
                            viewSchemaClickHandler={() => {
                                this.setState({
                                    moreFunctionPopoverVisible: false
                                });
                                this.handleFormSchemaView();
                            }}
                            componentRecognize={this.props.componentRecognize}
                            onDetectSuccess={this.handleDetectSuccess}
                            customUploadRequest={customUploadRequest}
                        >
                            <li className="opt-item">
                                <i className="opt-icon xform-iconfont">&#xe7fc;</i>
                                <span className="opt-name">{messages[getMessageId('xformMoreOptName')]}</span>
                            </li>
                        </MoreFunctionPopover>
                    </ul>
                    <ul className="opt-rear-list">
                        <PreviewPopover
                            {...this.props}
                            messages={messages}
                            popupContainer={popupContainer}
                            visible={previewPopoverVisible}
                            visibleChangeHandler={this.handleFormPreviewVisibleChange}
                            platform={platform}
                            formSchema={formSchema}
                            registerWidgets={registerWidgets}
                        >
                            <li className="opt-item">
                                <i className="opt-icon xform-iconfont">&#xe78f;</i>
                                <span className="opt-name">{messages[getMessageId('xformPreviewOptName')]}</span>
                            </li>
                        </PreviewPopover>
                        <li className="opt-item" onClick={this.toggleFullScreen}>
                            {(() => {
                                if (fullscreen) {
                                    return (
                                        <div>
                                            <i className="opt-icon xform-iconfont">&#xe67c;</i>
                                            <span className="opt-name">{messages[getMessageId('xformNoFullScreenOptName')]}</span>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div>
                                            <i className="opt-icon xform-iconfont">&#xe67b;</i>
                                            <span className="opt-name">{messages[getMessageId('xformFullScreenOptName')]}</span>
                                        </div>
                                    );
                                }
                            })()}
                        </li>
                    </ul>
                </div>

                <div className="app-xform-builder-panel">
                    <div className="field-picker-panel" style={{
                        height: !fullscreen && typeof height === 'number' ? height : 'auto'
                    }}>
                        <FieldPicker
                            platform={platform}
                            messages={messages}
                            popupContainer={popupContainer}
                            registerWidgets={registerWidgets}
                            locale={locale}
                            customInterfaces={customInterfaces}
                            customGateway={customGateway}
                            customUploadRequest={customUploadRequest}
                            onImagePreview={onImagePreview}
                            supportFieldList={supportFieldList}
                            supportConfigList={supportConfigList}
                            emptyPlaceholder={emptyPlaceholder}
                            commonFields={xformBuilderData.commonFields}
                            fields={xformBuilderData.fields}
                            xformBizData={xformBuilderData.xformBizData}
                            xformOptionBizData={xformBuilderData.xformOptionBizData}
                            addFieldHandler={this.addFieldHandler}
                        />
                    </div>
                    <div className="field-list-panel" style={{
                        height: !fullscreen && typeof height === 'number' ? height : 'auto'
                    }}>
                        <FieldList
                            globalConfig={globalConfig}
                            platform={platform}
                            messages={messages}
                            popupContainer={popupContainer}
                            registerWidgets={registerWidgets}
                            locale={locale}
                            customInterfaces={customInterfaces}
                            customGateway={customGateway}
                            customUploadRequest={customUploadRequest}
                            onImagePreview={onImagePreview}
                            systemFieldEditable={systemFieldEditable}
                            editFieldData={xformBuilderData.editFieldData}
                            supportFieldList={supportFieldList}
                            supportConfigList={supportConfigList}
                            emptyPlaceholder={emptyPlaceholder}
                            fields={JSON.parse(JSON.stringify(xformBuilderData.fields))}
                            changeEditFieldHandler={this.changeEditFieldHandler}
                            deleteEditFieldHandler={this.deleteEditFieldHandler}
                            addFieldsHandler={this.addFieldDataWithIndex}
                            updateFieldsHandler={this.updateFieldsHandler}
                            updateFieldItemHandler={this.updateFieldItemHandler}
                        />
                    </div>
                    <div className="field-config-drawer-panel" style={{
                        width: (fullscreen || fieldConfigDrawerVisible) ? 380 : 0,
                        height: !fullscreen && typeof height === 'number' ? height : 'auto',
                        display: (fullscreen || fieldConfigDrawerVisible) ? 'block': 'none'
                    }}>
                        <FieldConfig
                            globalConfig={globalConfig}
                            messages={messages}
                            popupContainer={popupContainer}
                            registerWidgets={registerWidgets}
                            locale={locale}
                            customInterfaces={customInterfaces}
                            customGateway={customGateway}
                            customUploadRequest={customUploadRequest}
                            onImagePreview={onImagePreview}
                            systemFieldEditable={systemFieldEditable}
                            supportFieldList={supportFieldList}
                            supportConfigList={supportConfigList}
                            emptyPlaceholder={emptyPlaceholder}
                            dataSource={xformBuilderData.dataSource}
                            serverCode={xformBuilderData.serverCode}
                            fields={xformBuilderData.fields}
                            editFieldData={xformBuilderData.editFieldData}
                            xformBizData={xformBuilderData.xformBizData}
                            xformOptionBizData={xformBuilderData.xformOptionBizData}
                            updateFieldDataHandler={this.updateFieldDataHandler}
                            updateFieldItemHandler={this.updateFieldItemHandler}
                        />
                        {!fullscreen && <i className="xform-iconfont close-icon" onClick={this.handleCloseFieldConfigPanel}>&#xe600;</i>}
                    </div>
                </div>

                {(() => {
                    if (defaultActionButtons && renderActionButtons === null) {
                        return this.renderDefaultActionButtons();
                    } else {
                        if (typeof renderActionButtons === 'function') {
                            return renderActionButtons(
                                this.handleFormSave
                            );
                        } else {
                            return null;
                        }
                    }
                })()}

                {formSchemaModalVisible && <ViewSchemaModal messages={messages} popupContainer={popupContainer} visible={formSchemaModalVisible} formSchema={formSchema} modalCloseHandler={this.handleViewSchemaModalClose} />}

            </div>
        );
    }
}

export default App;
