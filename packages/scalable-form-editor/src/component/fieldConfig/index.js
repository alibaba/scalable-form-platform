/**
 * xform-builder右侧“字段属性设置”
 * @props: xformBizData（业务属性配置数据） xformOptionBizData（字段业务属性配置数据） editFieldData（编辑状态field数据） fields（生效字段field数据，用于进行code非重复校验） updateFieldDataHandler（更新编辑过的editFieldData处理器） updateFieldItemHandler（更新某个code对应的字段数据，但是不更新editFieldData） systemFieldEditable（系统字段是否可编辑，默认不能编辑）
 * @states: unfoldIndex（下拉框设置里面展开的项，默认展开第一项，-1表示没有展开的项） fieldShowConfig（字段级联配置， fieldShowConfig的数据格式为{beneathFields: [], showConfig: [{name: '选项一', code: 'option1', show: [fieldCode1, fieldCode2]}]}，其中beneathFields中存储的是当前编辑的field下面的字段数据，因为字段级联配置只会选择编辑字段下面的字段关联） showConfigModalVisible（字段级联配置浮层是否可见） currentEditShowOptionCode（字段级联配置中当前编辑态的字段选项code） updateConfigModalVisible（数据源级联配置浮层是否可见） dataSourceFieldList（当前编辑字段后面的配置了数据源的字段列表） fieldUpdateDataSourceConfig（当前字段的级联数据源配置数据）
 */

import './index.less';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {If, Then, Else} from 'react-if';
import {Icon, Button, Row, Col, Modal, Checkbox, Popconfirm, message} from 'antd';
import classnames from 'classnames';

import * as CONST from '../../common/const';
import {util} from '../../common/util';
import {getMessageId} from '../../i18n/localeMessages';
import FieldOptionList from '../fieldOptionList/';
import ConfigSchema from '../../configSchema/index';
import customFieldSchema from '../../customFieldSchema/index';
import XForm from 'scalable-form-antd';

class FieldConfig extends Component {
    static propTypes = {
        globalConfig: PropTypes.shape({
            codeEditable: PropTypes.bool.isRequired,
            fieldPreviewable: PropTypes.bool.isRequired
        }).isRequired,
        messages: PropTypes.object.isRequired,
        popupContainer: PropTypes.func.isRequired,
        xformBizData: PropTypes.array.isRequired,
        xformOptionBizData: PropTypes.array.isRequired,
        fields: PropTypes.array.isRequired,
        emptyPlaceholder: PropTypes.element,
        updateFieldDataHandler: PropTypes.func.isRequired,
        updateFieldItemHandler: PropTypes.func.isRequired,
        systemFieldEditable: PropTypes.bool
    };

    static defaultProps = {
        systemFieldEditable: false
    };

    constructor(...args) {
        super(...args);
        this.toggleBlockFoldChange = this.toggleBlockFoldChange.bind(this);
        this.schema2ConfigFormDataConverter = this.schema2ConfigFormDataConverter.bind(this);
        this.configFormData2schemaConvertor = this.configFormData2schemaConvertor.bind(this);
        this.handleUpdateFieldSchemaData = this.handleUpdateFieldSchemaData.bind(this);
        this.handleUpdateBizData = this.handleUpdateBizData.bind(this);
        this.handleFieldShowConfigModalOpen = this.handleFieldShowConfigModalOpen.bind(this);
        this.generateFieldShowConfig = this.generateFieldShowConfig.bind(this);
        this.handleEditOptionChange = this.handleEditOptionChange.bind(this);
        this.judgeCheckStatus = this.judgeCheckStatus.bind(this);
        this.toggleShowFieldChange = this.toggleShowFieldChange.bind(this);
        this.handleShowConfigModalConfirm = this.handleShowConfigModalConfirm.bind(this);
        this.handleFieldUpdateModalOpen = this.handleFieldUpdateModalOpen.bind(this);
        this.generateFieldsWithDataSource = this.generateFieldsWithDataSource.bind(this);
        this.judgeUpdateDataSourceCheckStatus = this.judgeUpdateDataSourceCheckStatus.bind(this);
        this.toggleUpdateDataSourceChange = this.toggleUpdateDataSourceChange.bind(this);
        this.updateDataSourceConfigConfirm = this.updateDataSourceConfigConfirm.bind(this);
        this._clearFieldShow = this._clearFieldShow.bind(this);
        this.handleClearFieldShow = this.handleClearFieldShow.bind(this);
        this._clearFieldUpdate = this._clearFieldUpdate.bind(this);
        this.handleClearFieldUpdate = this.handleClearFieldUpdate.bind(this);
        this.handleClearAll = this.handleClearAll.bind(this);

        this.state = {
            basicBlockFold: false,
            advancedBlockFold: false,
            optionBlockFold: false,
            cascadeBlockFold: false,
            fieldShowConfig: {
                beneathFields: [],
                showConfig: []
            },
            showConfigModalVisible: false,
            currentEditShowOptionCode: '',
            updateConfigModalVisible: false,
            fieldUpdateDataSourceConfig: [],
            dataSourceFieldList: []
        };
    }

    toggleBlockFoldChange(block) {
        const {basicBlockFold, advancedBlockFold, optionBlockFold, cascadeBlockFold} = this.state;
        switch (block) {
            case 'basic':
                this.setState({
                    basicBlockFold: !basicBlockFold
                });
                break;
            case 'advance':
                this.setState({
                    advancedBlockFold: !advancedBlockFold
                });
                break;
            case 'option':
                this.setState({
                    optionBlockFold: !optionBlockFold
                });
                break;
            case 'cascade':
                this.setState({
                    cascadeBlockFold: !cascadeBlockFold
                });
                break;
            default:
                console.warn('[xform-editor]不能识别的字段配置block类型', block);
        }
    }

    // 从field schema中提取“字段属性设置”
    schema2ConfigFormDataConverter(editFieldData, formData) {
        const registerWidgets = this.props.registerWidgets;
        let resultData = {};
        let jsonSchemaContent = editFieldData.jsonSchema[editFieldData.code];
        let uiSchemaContent = editFieldData.uiSchema[editFieldData.code];
        // 判断uniqueItems为boolean类型用来兼容uploader和file类型数据uniqueItems未设置的旧数据
        if (jsonSchemaContent.type === 'array' && typeof jsonSchemaContent.uniqueItems === 'boolean' && !jsonSchemaContent.uniqueItems) {
            jsonSchemaContent = jsonSchemaContent.items;
            uiSchemaContent = uiSchemaContent.items;
        }
        let formDataValue = editFieldData.formData[editFieldData.code];
        let bizDataContent = editFieldData.bizData[editFieldData.code];
        Object.keys(formData).map((key) => {
            let validators;
            // 根据不同的key，从editFieldData中提取相应的值
            switch (key) {
                case 'code':
                    resultData[key] = editFieldData.code;
                    break;
                case 'name':
                    resultData[key] = editFieldData.label;
                    break;
                case 'placeholder':
                    if (typeof uiSchemaContent['ui:placeholder'] !== 'undefined') {
                        resultData[key] = uiSchemaContent['ui:placeholder'];
                    } else {
                        resultData[key] = '';
                    }
                    break;
                case 'value':
                    resultData[key] = editFieldData.formData[editFieldData.code];
                    break;
                case 'description':
                    if (typeof uiSchemaContent['ui:help'] !== 'undefined') {
                        resultData[key] = uiSchemaContent['ui:help'];
                    } else {
                        resultData[key] = '';
                    }
                    break;
                case 'dataSource':
                    if (typeof jsonSchemaContent.dataSource !== 'undefined') {
                        resultData[key] = jsonSchemaContent.dataSource;
                    } else {
                        resultData[key] = '';
                    }
                    break;
                case 'server':
                    // 动态校验器
                    validators = [];
                    let validateCode = '';
                    if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
                        if (typeof uiSchemaContent['ui:options'].validate !== 'undefined') {
                            validators = uiSchemaContent['ui:options'].validate;
                            validators.map((validator) => {
                                if (validator.type === 'server') {
                                    validateCode = validator.validateCode;
                                }
                            });
                            resultData[key] = validateCode;
                        } else {
                            resultData[key] = '';
                        }
                    } else {
                        resultData[key] = '';
                    }
                    break;
                case 'validate':
                    // 校验器
                    validators = [];
                    let validatorType = '';
                    if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
                        if (typeof uiSchemaContent['ui:options'].validate !== 'undefined') {
                            validators = uiSchemaContent['ui:options'].validate;
                            validators.map((validator) => {
                                if (validator.type !== 'empty' && validator.type !== 'server') {
                                    validatorType = validator.type;
                                }
                            });
                            resultData[key] = validatorType;
                        } else {
                            resultData[key] = '';
                        }
                    } else {
                        resultData[key] = '';
                    }
                    break;
                case 'maxLength':
                    if (typeof jsonSchemaContent.maxLength !== 'undefined') {
                        resultData[key] = jsonSchemaContent.maxLength;
                    } else {
                        resultData[key] = 100000;
                    }
                    break;
                case 'maximum':
                    if (typeof jsonSchemaContent.maximum !== 'undefined') {
                        resultData[key] = jsonSchemaContent.maximum;
                    } else {
                        resultData[key] = '';
                    }
                    break;
                case 'minimum':
                    if (typeof jsonSchemaContent.minimum !== 'undefined') {
                        resultData[key] = jsonSchemaContent.minimum;
                    } else {
                        resultData[key] = '';
                    }
                    break;
                case 'groupName':
                    if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
                        if (typeof uiSchemaContent['ui:options'].groupName !== 'undefined') {
                            resultData[key] = uiSchemaContent['ui:options'].groupName;
                        } else {
                            resultData[key] = '';
                        }
                    } else {
                        resultData[key] = '';
                    }
                    break;
                case 'uploadType':
                    // 图片上传组件配置（picture或picture-inline或picture-card）
                    if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
                        if (typeof uiSchemaContent['ui:options'].uploadType !== 'undefined') {
                            resultData[key] = uiSchemaContent['ui:options'].uploadType;
                        } else {
                            resultData[key] = 'picture';
                        }
                    } else {
                        resultData[key] = 'picture';
                    }
                    break;
                case 'maxFileSize':
                    if (typeof jsonSchemaContent.maxFileSize !== 'undefined') {
                        resultData[key] = jsonSchemaContent.maxFileSize;
                    } else {
                        resultData[key] = 0;
                    }
                    break;
                case 'maxFileNum':
                    if (typeof jsonSchemaContent.maxFileNum !== 'undefined') {
                        resultData[key] = jsonSchemaContent.maxFileNum;
                    } else {
                        resultData[key] = 0;
                    }
                    break;
                case 'templateFileUrl':
                    // 模板文件上传
                    if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
                        if (typeof uiSchemaContent['ui:options'].templateFileUrl !== 'undefined') {
                            resultData[key] = uiSchemaContent['ui:options'].templateFileUrl;
                        } else {
                            resultData[key] = [];
                        }
                    } else {
                        resultData[key] = [];
                    }
                    break;
                case 'exampleImageUrl':
                    // 示例图片上传
                    if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
                        if (typeof uiSchemaContent['ui:options'].exampleImageUrl !== 'undefined') {
                            resultData[key] = uiSchemaContent['ui:options'].exampleImageUrl;
                        } else {
                            resultData[key] = [];
                        }
                    } else {
                        resultData[key] = [];
                    }
                    break;
                case 'selectLeafOnly':
                    // 树选择器是否允许选择父节点
                    if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
                        if (typeof uiSchemaContent['ui:options'].selectLeafOnly !== 'undefined') {
                            resultData[key] = uiSchemaContent['ui:options'].selectLeafOnly;
                        } else {
                            resultData[key] = false;
                        }
                    } else {
                        resultData[key] = false;
                    }
                    break;
                case 'treeCheckStrictly':
                    // 多选树选择器父子节点选择是否关联
                    if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
                        if (typeof uiSchemaContent['ui:options'].treeCheckStrictly !== 'undefined') {
                            resultData[key] = uiSchemaContent['ui:options'].treeCheckStrictly;
                        } else {
                            resultData[key] = false;
                        }
                    } else {
                        resultData[key] = false;
                    }
                    break;
                case 'initRange':
                    // 日期范围组件默认值配置
                    if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
                        if (typeof uiSchemaContent['ui:options'].initRange !== 'undefined') {
                            resultData[key] = uiSchemaContent['ui:options'].initRange;
                        } else {
                            resultData[key] = undefined;
                        }
                    } else {
                        resultData[key] = undefined;
                    }
                    break;
                case 'cascade':
                    jsonSchemaContent = editFieldData.jsonSchema[editFieldData.code];
                    // 字段层叠配置（如果是对字段设置了字段层叠，则jsonSchema一定是array类型）
                    resultData[key] = (jsonSchemaContent.type === 'array' && !jsonSchemaContent.uniqueItems);
                    break;
                case 'require':
                    resultData[key] = editFieldData.required;
                    break;
                case 'hidden':
                    resultData[key] = uiSchemaContent['ui:widget'] === 'hidden';
                    break;
                case 'disabled':
                    if (typeof uiSchemaContent['ui:disabled'] !== 'undefined') {
                        resultData[key] = uiSchemaContent['ui:disabled'];
                    } else {
                        resultData[key] = false;
                    }
                    break;
                default:
                    console.log('configSchema中获取到不能识别的字段设置，请注意是否传入了自定义配置项的处理方法');
            }
            // 插入自定义配置项处理
            registerWidgets.map((widget) => {
                if (widget.customConfigFields && widget.customConfigFields.length > 0) {
                    widget.customConfigFields.map((fieldObject) => {
                        if (fieldObject.code === key) {
                            resultData[key] = fieldObject.schemaToConfigConverter(editFieldData);
                        }
                    });
                }
            });
        });
        return resultData;
    }

    configFormData2schemaConvertor(editFieldData, formData) {
        const messages = this.props.messages;
        const supportFieldList = this.props.supportFieldList;
        const registerWidgets = this.props.registerWidgets;
        let hasServerValidator, hasEmptyValidator;
        const ValidateMessage = {
            empty: messages[getMessageId('fieldConfigEmptyValidateTip')],
            email: messages[getMessageId('fieldConfigEmailValidateTip')],
            url: messages[getMessageId('fieldConfigUrlValidateTip')],
            telephone: messages[getMessageId('fieldConfigTelValidateTip')],
            id: messages[getMessageId('fieldConfigIdValidateTip')],
            digit: messages[getMessageId('fieldConfigDigitValidateTip')],
            money: messages[getMessageId('fieldConfigMoneyValidateTip')],
            server: messages[getMessageId('fieldConfigServerValidateTip')]
        };
        let resultData = Object.assign({}, editFieldData);
        const schema = customFieldSchema.getSchema(messages, registerWidgets, supportFieldList);
        Object.keys(formData).map((key) => {
            let validators;
            let jsonSchemaContent = resultData.jsonSchema[resultData.code];
            let uiSchemaContent = resultData.uiSchema[resultData.code];
            let fieldType = jsonSchemaContent.type, fieldUniqueItems = jsonSchemaContent.uniqueItems;
            if (fieldType === 'array' && !fieldUniqueItems) {
                jsonSchemaContent = jsonSchemaContent.items;
                uiSchemaContent = uiSchemaContent.items;
            }
            let formDataValue = resultData.formData[resultData.code];
            let bizDataContent = resultData.bizData[resultData.code];
            switch (key) {
                case 'code':
                    const newCode = formData.code;
                    jsonSchemaContent = resultData.jsonSchema[resultData.code];
                    uiSchemaContent = resultData.uiSchema[resultData.code];
                    if (resultData.code === newCode) {
                        break;
                    }
                    let isDuplicate = false;
                    this.props.fields.map((field) => {
                        if (field.code === newCode) {
                            isDuplicate = true;
                        }
                    });
                    if (isDuplicate) {
                        message.error(messages[getMessageId('fieldConfigDuplicateCodeErrorTip')]);
                    } else {
                        // 更新editFieldData中的code相关字段
                        resultData.code = newCode;
                        resultData.jsonSchema = {
                            [newCode]: jsonSchemaContent
                        };
                        resultData.uiSchema = {
                            [newCode]: uiSchemaContent
                        };
                        resultData.formData = {
                            [newCode]: formDataValue
                        };
                        resultData.bizData = {
                            [newCode]: bizDataContent
                        };
                    }
                    break;
                case 'name':
                    const newLabel = formData.name;
                    if (resultData.label === newLabel) {
                        break;
                    }
                    resultData.label = newLabel;
                    // 这里数据格式有冗余了，可以不定义这个title的，因为title和label是相同的
                    resultData.jsonSchema[resultData.code].title = newLabel;
                    break;
                case 'placeholder':
                    if (uiSchemaContent['ui:placeholder'] === formData.placeholder) {
                        break;
                    }
                    uiSchemaContent['ui:placeholder'] = formData.placeholder;
                    if (fieldType === 'array' && !fieldUniqueItems) {
                        resultData.uiSchema[resultData.code].items = uiSchemaContent;
                    } else {
                        resultData.uiSchema[resultData.code] = uiSchemaContent;
                    }
                    break;
                case 'value':
                    if (formDataValue === formData.value) {
                        break;
                    }
                    // 默认值如果被设置为undefined（单选并且点击右侧“清除”的叉号的场景，要设置为空字符串；多选场景依旧设置为空数组）
                    if (typeof formData.value !== 'undefined') {
                        if (fieldType === 'array' && !fieldUniqueItems) {
                            resultData.formData[resultData.code] = [formData.value];
                        } else {
                            resultData.formData[resultData.code] = formData.value;
                        }
                    } else {
                        resultData.formData[resultData.code] = '';
                    }
                    break;
                case 'description':
                    if (uiSchemaContent['ui:help'] === formData.description) {
                        break;
                    }
                    uiSchemaContent['ui:help'] = formData.description;
                    if (fieldType === 'array' && !fieldUniqueItems) {
                        resultData.uiSchema[resultData.code].items = uiSchemaContent;
                    } else {
                        resultData.uiSchema[resultData.code] = uiSchemaContent;
                    }
                    break;
                case 'dataSource':
                    if (jsonSchemaContent.dataSource === formData.dataSource) {
                        break;
                    }
                    if (formData.dataSource !== '') {
                        jsonSchemaContent.dataSource = formData.dataSource;
                    } else {
                        // 配置数据源后点击预览，以引用的方式传入XForm组件的jsonSchema被组件内部修改加入了data。由于线上老数据中很多都含有data，故这个逻辑先保留
                        delete jsonSchemaContent.data;
                        delete jsonSchemaContent.dataSource;
                    }
                    if (fieldType === 'array' && !fieldUniqueItems) {
                        resultData.uiSchema[resultData.code].items = uiSchemaContent;
                    } else {
                        resultData.uiSchema[resultData.code] = uiSchemaContent;
                    }
                    break;
                case 'server':
                    let validateCode = '';
                    let serverValidatorIndex = 0;
                    validators = [];
                    hasServerValidator = false;

                    // 对于校验类的配置，设置为层叠配置的字段也仍旧是对字段整体进行校验配置，而不是对被层叠的字段本身做校验
                    uiSchemaContent = resultData.uiSchema[resultData.code];

                    if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
                        if (typeof uiSchemaContent['ui:options'].validate !== 'undefined') {
                            validators = uiSchemaContent['ui:options'].validate;
                            validators.map((validate, index) => {
                                if (validate.type === 'server') {
                                    validateCode = validate.validateCode;
                                    hasServerValidator = true;
                                    serverValidatorIndex = index;
                                }
                            });
                        }
                    }
                    if (validateCode === formData.server) {
                        break;
                    }
                    if (typeof uiSchemaContent['ui:options'] === 'undefined') {
                        uiSchemaContent['ui:options'] = {
                            validate: [{
                                type: 'server',
                                validateCode: validateCode,
                                message: ValidateMessage.server
                            }]
                        };
                    } else {
                        if (formData.server !== '') {
                            if (hasServerValidator) {
                                uiSchemaContent['ui:options'].validate[serverValidatorIndex].validateCode = formData.server;
                            } else {
                                if (typeof uiSchemaContent['ui:options'].validate !== 'undefined') {
                                    uiSchemaContent['ui:options'].validate.push({
                                        type: 'server',
                                        validateCode: formData.server,
                                        message: ValidateMessage.server
                                    });
                                } else {
                                    uiSchemaContent['ui:options'].validate = [{
                                        type: 'server',
                                        validateCode: formData.server,
                                        message: ValidateMessage.server
                                    }];
                                }
                            }
                        } else {
                            // 清除server validator
                            if (hasServerValidator) {
                                uiSchemaContent['ui:options'].validate.splice(serverValidatorIndex, 1);
                                if (uiSchemaContent['ui:options'].validate.length <= 0) {
                                    delete uiSchemaContent['ui:options'].validate;
                                }
                            }
                        }
                    }

                    resultData.uiSchema[resultData.code] = uiSchemaContent;
                    break;
                case 'validate':
                    let validatorType = '';
                    let serverValidator;
                    let emptyValidator;
                    // 对于校验类的配置，设置为层叠配置的字段也仍旧是对字段整体进行校验配置，而不是对被层叠的字段本身做校验
                    uiSchemaContent = resultData.uiSchema[resultData.code];
                    validators = [];
                    hasEmptyValidator = false;
                    hasServerValidator = false;
                    if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
                        if (typeof uiSchemaContent['ui:options'].validate !== 'undefined') {
                            validators = uiSchemaContent['ui:options'].validate;
                            validators.map((validate) => {
                                if (validate.type === 'empty') {
                                    hasEmptyValidator = true;
                                    emptyValidator = validate;
                                } else if (validate.type === 'server') {
                                    hasServerValidator = true;
                                    serverValidator = validate;
                                } else {
                                    validatorType = validate.type;
                                }
                            });
                        }
                    }
                    if (validatorType === formData.validate) {
                        break;
                    }
                    if (typeof uiSchemaContent['ui:options'] === 'undefined') {
                        uiSchemaContent['ui:options'] = {
                            validate: [{
                                type: formData.validate,
                                message: ValidateMessage[formData.validate]
                            }]
                        };
                    } else {
                        let updatedValidators = [];
                        if (formData.validate !== '') {
                            if (hasEmptyValidator && typeof emptyValidator !== 'undefined') {
                                updatedValidators.push(emptyValidator);
                            }
                            if (hasServerValidator && typeof serverValidator !== 'undefined') {
                                updatedValidators.push(serverValidator);
                            }
                            updatedValidators.push({
                                type: formData.validate,
                                message: ValidateMessage[formData.validate]
                            });
                        } else {
                            // 清除校验器
                            if (hasEmptyValidator && typeof emptyValidator !== 'undefined') {
                                updatedValidators.push(emptyValidator);
                            }
                            if (hasServerValidator && typeof serverValidator !== 'undefined') {
                                updatedValidators.push(serverValidator);
                            }
                        }
                        uiSchemaContent['ui:options'].validate = updatedValidators;
                        if (updatedValidators.length <= 0) {
                            delete uiSchemaContent['ui:options'].validate;
                        }
                    }

                    resultData.uiSchema[resultData.code] = uiSchemaContent;
                    break;
                case 'maxLength':
                    if (jsonSchemaContent.maxLength === formData.maxLength) {
                        break;
                    }
                    jsonSchemaContent.maxLength = formData.maxLength;
                    if (fieldType === 'array' && !fieldUniqueItems) {
                        resultData.jsonSchema[resultData.code].items = jsonSchemaContent;
                    } else {
                        resultData.jsonSchema[resultData.code] = jsonSchemaContent;
                    }
                    break;
                case 'maximum':
                    if (jsonSchemaContent.maximum === formData.maximum) {
                        break;
                    }
                    jsonSchemaContent.maximum = formData.maximum;
                    if (fieldType === 'array' && !fieldUniqueItems) {
                        resultData.jsonSchema[resultData.code].items = jsonSchemaContent;
                    } else {
                        resultData.jsonSchema[resultData.code] = jsonSchemaContent;
                    }
                    break;
                case 'minimum':
                    if (jsonSchemaContent.minimum === formData.minimum) {
                        break;
                    }
                    jsonSchemaContent.minimum = formData.minimum;
                    if (fieldType === 'array' && !fieldUniqueItems) {
                        resultData.jsonSchema[resultData.code].items = jsonSchemaContent;
                    } else {
                        resultData.jsonSchema[resultData.code] = jsonSchemaContent;
                    }
                    break;
                case 'groupName':
                    let groupName;
                    if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
                        if (typeof uiSchemaContent['ui:options'].groupName !== 'undefined') {
                            groupName = uiSchemaContent['ui:options'].groupName;
                        }
                    }
                    if (groupName === formData.groupName) {
                        break;
                    }
                    if (typeof uiSchemaContent['ui:options'] === 'undefined') {
                        uiSchemaContent['ui:options'] = {
                            groupName: formData.groupName
                        };
                    } else {
                        uiSchemaContent['ui:options'].groupName = formData.groupName;
                    }
                    if (fieldType === 'array' && !fieldUniqueItems) {
                        resultData.uiSchema[resultData.code].items = uiSchemaContent;
                    } else {
                        resultData.uiSchema[resultData.code] = uiSchemaContent;
                    }
                    break;
                case 'uploadType':
                    // 图片上传方式配置
                    let uploadType;
                    if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
                        if (typeof uiSchemaContent['ui:options'].uploadType !== 'undefined') {
                            uploadType = uiSchemaContent['ui:options'].uploadType;
                        }
                    }
                    if (uploadType === formData.uploadType) {
                        break;
                    }
                    if (typeof uiSchemaContent['ui:options'] === 'undefined') {
                        uiSchemaContent['ui:options'] = {
                            uploadType: formData.uploadType
                        };
                    } else {
                        uiSchemaContent['ui:options'].uploadType = formData.uploadType;
                    }
                    if (fieldType === 'array' && !fieldUniqueItems) {
                        resultData.uiSchema[resultData.code].items = uiSchemaContent;
                    } else {
                        resultData.uiSchema[resultData.code] = uiSchemaContent;
                    }
                    break;
                case 'maxFileSize':
                    if (jsonSchemaContent.maxFileSize === formData.maxFileSize) {
                        break;
                    }
                    jsonSchemaContent.maxFileSize = formData.maxFileSize;
                    if (fieldType === 'array' && !fieldUniqueItems) {
                        resultData.jsonSchema[resultData.code].items = jsonSchemaContent;
                    } else {
                        resultData.jsonSchema[resultData.code] = jsonSchemaContent;
                    }
                    break;
                case 'maxFileNum':
                    if (jsonSchemaContent.maxFileNum === formData.maxFileNum) {
                        break;
                    }
                    jsonSchemaContent.maxFileNum = formData.maxFileNum;
                    if (fieldType === 'array' && !fieldUniqueItems) {
                        resultData.jsonSchema[resultData.code].items = jsonSchemaContent;
                    } else {
                        resultData.jsonSchema[resultData.code] = jsonSchemaContent;
                    }
                    break;
                case 'templateFileUrl':
                    // 模板文件配置
                    let templateFileUrl = [];
                    if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
                        if (typeof uiSchemaContent['ui:options'].templateFileUrl !== 'undefined') {
                            templateFileUrl = uiSchemaContent['ui:options'].templateFileUrl;
                        }
                    }
                    if (JSON.stringify(templateFileUrl) === JSON.stringify(formData.templateFileUrl)) {
                        break;
                    }
                    if (typeof uiSchemaContent['ui:options'] === 'undefined') {
                        uiSchemaContent['ui:options'] = {
                            templateFileUrl: formData.templateFileUrl
                        };
                    } else {
                        uiSchemaContent['ui:options'].templateFileUrl = formData.templateFileUrl;
                    }
                    if (fieldType === 'array' && !fieldUniqueItems) {
                        resultData.uiSchema[resultData.code].items = uiSchemaContent;
                    } else {
                        resultData.uiSchema[resultData.code] = uiSchemaContent;
                    }
                    break;
                case 'exampleImageUrl':
                    // 示例图片配置
                    let exampleImageUrl = [];
                    if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
                        if (typeof uiSchemaContent['ui:options'].exampleImageUrl !== 'undefined') {
                            exampleImageUrl = uiSchemaContent['ui:options'].exampleImageUrl;
                        }
                    }
                    if (JSON.stringify(exampleImageUrl) === JSON.stringify(formData.exampleImageUrl)) {
                        break;
                    }
                    if (typeof uiSchemaContent['ui:options'] === 'undefined') {
                        uiSchemaContent['ui:options'] = {
                            exampleImageUrl: formData.exampleImageUrl
                        };
                    } else {
                        uiSchemaContent['ui:options'].exampleImageUrl = formData.exampleImageUrl;
                    }
                    if (fieldType === 'array' && !fieldUniqueItems) {
                        resultData.uiSchema[resultData.code].items = uiSchemaContent;
                    } else {
                        resultData.uiSchema[resultData.code] = uiSchemaContent;
                    }
                    break;
                case 'selectLeafOnly':
                    // 树选择器是否允许选择父节点
                    let selectLeafOnly = false;
                    if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
                        if (typeof uiSchemaContent['ui:options'].selectLeafOnly !== 'undefined') {
                            selectLeafOnly = uiSchemaContent['ui:options'].selectLeafOnly;
                        }
                    }
                    if (selectLeafOnly === formData.selectLeafOnly) {
                        break;
                    }
                    if (typeof uiSchemaContent['ui:options'] === 'undefined') {
                        uiSchemaContent['ui:options'] = {
                            selectLeafOnly: formData.selectLeafOnly
                        };
                    } else {
                        uiSchemaContent['ui:options'].selectLeafOnly = formData.selectLeafOnly;
                    }
                    if (fieldType === 'array' && !fieldUniqueItems) {
                        resultData.uiSchema[resultData.code].items = uiSchemaContent;
                    } else {
                        resultData.uiSchema[resultData.code] = uiSchemaContent;
                    }
                    break;
                case 'treeCheckStrictly':
                    // 多选树选择器父子节点选择是否关联
                    let treeCheckStrictly = false;
                    if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
                        if (typeof uiSchemaContent['ui:options'].treeCheckStrictly !== 'undefined') {
                            treeCheckStrictly = uiSchemaContent['ui:options'].treeCheckStrictly;
                        }
                    }
                    if (treeCheckStrictly === formData.treeCheckStrictly) {
                        break;
                    }
                    if (typeof uiSchemaContent['ui:options'] === 'undefined') {
                        uiSchemaContent['ui:options'] = {
                            treeCheckStrictly: formData.treeCheckStrictly
                        };
                    } else {
                        uiSchemaContent['ui:options'].treeCheckStrictly = formData.treeCheckStrictly;
                    }
                    if (fieldType === 'array' && !fieldUniqueItems) {
                        resultData.uiSchema[resultData.code].items = uiSchemaContent;
                    } else {
                        resultData.uiSchema[resultData.code] = uiSchemaContent;
                    }
                    break;
                case 'initRange':
                    // 日期范围选择器默认值配置
                    let initRange;
                    if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
                        if (typeof uiSchemaContent['ui:options'].initRange !== 'undefined') {
                            initRange = uiSchemaContent['ui:options'].initRange;
                        }
                    }
                    if (initRange === formData.initRange) {
                        break;
                    }
                    if (typeof uiSchemaContent['ui:options'] === 'undefined') {
                        uiSchemaContent['ui:options'] = {
                            initRange: formData.initRange
                        };
                    } else {
                        uiSchemaContent['ui:options'].initRange = formData.initRange;
                    }
                    if (fieldType === 'array' && !fieldUniqueItems) {
                        resultData.uiSchema[resultData.code].items = uiSchemaContent;
                    } else {
                        resultData.uiSchema[resultData.code] = uiSchemaContent;
                    }
                    break;
                case 'cascade':
                    let cascade = false;
                    jsonSchemaContent = resultData.jsonSchema[resultData.code];
                    uiSchemaContent = resultData.uiSchema[resultData.code];
                    if (jsonSchemaContent.type === 'array' && !jsonSchemaContent.uniqueItems) {
                        cascade = true;
                    }
                    if (cascade === formData.cascade) {
                        return;
                    }
                    if (formData.cascade) {
                        jsonSchemaContent = {
                            type: 'array',
                            title: jsonSchemaContent.title,
                            items: Object.assign({}, jsonSchemaContent, {default: formDataValue})
                        };
                        // 要删除掉items中的title字段
                        delete jsonSchemaContent.items.title;
                        uiSchemaContent = {
                            items: uiSchemaContent
                        };
                        resultData.jsonSchema[resultData.code] = jsonSchemaContent;
                        resultData.uiSchema[resultData.code] = uiSchemaContent;
                        resultData.formData[resultData.code] = (formDataValue !== '') ? [formDataValue] : [''];
                    } else {
                        jsonSchemaContent.items.title = jsonSchemaContent.title;
                        jsonSchemaContent = jsonSchemaContent.items;
                        uiSchemaContent = uiSchemaContent.items;
                        resultData.jsonSchema[resultData.code] = jsonSchemaContent;
                        resultData.uiSchema[resultData.code] = uiSchemaContent;
                        resultData.formData[resultData.code] = (formDataValue.length > 0) ? formDataValue[0] : '';
                    }
                    break;
                case 'require':
                    if (resultData.required === formData.require) {
                        break;
                    }
                    // 对于校验类的配置，设置为层叠配置的字段也仍旧是对字段整体进行校验配置，而不是对被层叠的字段本身做校验
                    uiSchemaContent = resultData.uiSchema[resultData.code];
                    resultData.required = formData.require;
                    if (formData.require) {
                        // 添加必填校验
                        if (typeof uiSchemaContent === 'undefined') {
                            uiSchemaContent = {'ui:options': {validate: [
                                {
                                    type: 'empty',
                                    message: ValidateMessage.empty
                                }
                            ]}};
                        } else if (typeof uiSchemaContent['ui:options'] === 'undefined') {
                            uiSchemaContent['ui:options'] = {validate: [
                                {
                                    type: 'empty',
                                    message: ValidateMessage.empty
                                }
                            ]};
                        } else if (typeof uiSchemaContent['ui:options'].validate === 'undefined'){
                            uiSchemaContent['ui:options'].validate = [{
                                type: 'empty',
                                message: ValidateMessage.empty
                            }];
                        } else {
                            uiSchemaContent['ui:options'].validate.push({
                                type: 'empty',
                                message: ValidateMessage.empty
                            });
                        }
                    } else {
                        // 取消必填校验
                        if (uiSchemaContent['ui:options'].validate.length <= 1) {
                            delete uiSchemaContent['ui:options'].validate;
                        } else {
                            uiSchemaContent['ui:options'].validate.map((validate, index) => {
                                if (validate.type === 'empty') {
                                    uiSchemaContent['ui:options'].validate.splice(index, 1);
                                }
                            });
                        }
                    }

                    resultData.uiSchema[resultData.code] = uiSchemaContent;
                    break;
                case 'hidden':
                    let fieldHidden = (uiSchemaContent['ui:widget'] === 'hidden');
                    if (fieldHidden === formData.hidden) {
                        break;
                    }
                    if (formData.hidden) {
                        // 添加字段隐藏
                        uiSchemaContent['ui:widget'] = 'hidden';
                    } else {
                        // 取消字段隐藏
                        if (typeof schema[resultData.type].uiSchema['ui:widget'] !== 'undefined') {
                            uiSchemaContent['ui:widget'] =
                                schema[resultData.type].uiSchema['ui:widget'];
                        } else {
                            delete uiSchemaContent['ui:widget'];
                        }
                    }
                    if (fieldType === 'array' && !fieldUniqueItems) {
                        resultData.uiSchema[resultData.code].items = uiSchemaContent;
                    } else {
                        resultData.uiSchema[resultData.code] = uiSchemaContent;
                    }
                    break;
                case 'disabled':
                    let fieldDisabled = uiSchemaContent['ui:disabled'];
                    if (fieldDisabled === formData.disabled) {
                        break;
                    }
                    uiSchemaContent['ui:disabled'] = formData.disabled;
                    if (fieldType === 'array' && !fieldUniqueItems) {
                        resultData.uiSchema[resultData.code].items = uiSchemaContent;
                    } else {
                        resultData.uiSchema[resultData.code] = uiSchemaContent;
                    }
                    break;
                default:
                    console.log('configSchema中获取到不能识别的字段设置，请注意是否传入了相应的自定义字段处理方法');
            }
            // 插入自定义配置项处理
            registerWidgets.map((widget) => {
                if (widget.customConfigFields && widget.customConfigFields.length > 0) {
                    widget.customConfigFields.map((fieldObject) => {
                        if (fieldObject.code === key) {
                            resultData = fieldObject.configToSchemaConverter(resultData, formData[fieldObject.code]);
                        }
                    });
                }
            });
        });
        return resultData;
    }

    // 更新表单field配置
    handleUpdateFieldSchemaData(formData) {
        const editFieldData = this.props.editFieldData;
        const code = editFieldData.code;
        let fieldData = this.configFormData2schemaConvertor(editFieldData, formData);
        this.props.updateFieldDataHandler(code, fieldData);
    }

    // 更新表单field的业务属性配置
    handleUpdateBizData(formData) {
        const editFieldData = this.props.editFieldData;
        const code = editFieldData.code;
        let fieldData = Object.assign({}, editFieldData);
        fieldData.bizData[code] = formData;
        this.props.updateFieldDataHandler(code, fieldData);
    }

    // “字段级联”配置浮层打开
    handleFieldShowConfigModalOpen() {
        const config = this.generateFieldShowConfig();
        this.setState({
            fieldShowConfig: config,
            currentEditShowOptionCode: config.showConfig[0].code,
            showConfigModalVisible: true
        });
    }

    // 获取“字段级联”配置数据并保存在state中
    generateFieldShowConfig() {
        let config = {
            beneathFields: [],
            showConfig: []
        };
        const {messages, fields, editFieldData} = this.props;
        const editFieldCode = editFieldData.code;
        let fieldEnumsData = [], fieldEnumNamesData = [];
        let index;
        let editFieldJsonSchema;
        // 注意array类型的jsonSchema数据格式多一层"items"
        if (editFieldData.jsonSchema[editFieldCode].type === 'array') {
            editFieldJsonSchema = editFieldData.jsonSchema[editFieldCode].items;
        } else {
            editFieldJsonSchema = editFieldData.jsonSchema[editFieldCode];
        }
        if (typeof editFieldJsonSchema.enum !== 'undefined' &&
            typeof editFieldJsonSchema.enumNames !== 'undefined') {

            fieldEnumsData = editFieldJsonSchema.enum;
            fieldEnumNamesData = editFieldJsonSchema.enumNames;
        } else if (editFieldData.type === 'booleanCheckbox' || editFieldData.type === 'booleanSwitch') {
            // 对于“单项复选”、“开关”类型组件也可以进行级联配置，要做一个特殊处理
            fieldEnumsData = [true, false];
            fieldEnumNamesData = [messages[getMessageId('booleanCheckboxCheckedStatus')], messages[getMessageId('booleanCheckboxUncheckedStatus')]];
        }
        for (index = 0; index < fieldEnumsData.length; index++) {
            config.showConfig.push({
                name: fieldEnumNamesData[index],
                code: fieldEnumsData[index],
                show: []
            });
        }

        fields.map((field, fieldIndex) => {
            const fieldUiSchemaContent = field.uiSchema[field.code];
            let fieldShowOptions = [];
            if (typeof fieldUiSchemaContent['ui:options'] !== 'undefined') {
                if (typeof fieldUiSchemaContent['ui:options'].show !== 'undefined') {
                    fieldShowOptions = fieldUiSchemaContent['ui:options'].show;
                }
            }
            fieldShowOptions.map((showOption) => {
                if (showOption.field === editFieldCode) {
                    showOption.values.map((value) => {
                        config.showConfig.map((showOptionConfig, showConfigIndex) => {
                            if (showOptionConfig.code === value) {
                                config.showConfig[showConfigIndex].show.push(field.code);
                            }
                        });
                    });
                }
            });

            // beneathFields中存放的字段不应包括当前编辑的字段
            if (field.code === editFieldCode) {
                config.beneathFields = fields.slice(fieldIndex + 1);
            }
        });
        return config;
    }

    // 字段级联配置中编辑中的字段选项code变化
    handleEditOptionChange(event) {
        const optionCode = event.currentTarget.getAttribute('data-optionCode');
        let currentOptionCode = optionCode;
        if (optionCode === 'true') {
            currentOptionCode = true;
        } else if (optionCode === 'false') {
            currentOptionCode = false;
        } else {
            currentOptionCode = optionCode;
        }

        this.setState({
            currentEditShowOptionCode: currentOptionCode
        });
    }

    // 字段级联配置中判断选项关联的字段是否选中
    judgeCheckStatus(code) {
        let result = false;
        const currentOptionCode = this.state.currentEditShowOptionCode;
        const fieldShowConfig = this.state.fieldShowConfig;
        fieldShowConfig.showConfig.map((showConfigItem) => {
            if (showConfigItem.code === currentOptionCode) {
                result = showConfigItem.show.indexOf(code) > -1;
            }
        });
        return result;
    }

    // 字段级联配置中选项关联的字段选中状态变化处理器
    toggleShowFieldChange(event) {
        const fieldCode = event.currentTarget.getAttribute('data-fieldCode');
        const currentOptionCode = this.state.currentEditShowOptionCode;
        const fieldShowConfig = this.state.fieldShowConfig;
        fieldShowConfig.showConfig.map((showConfigItem, index) => {
            if (showConfigItem.code === currentOptionCode) {
                const fieldCodeIndex = showConfigItem.show.indexOf(fieldCode);
                if (fieldCodeIndex > -1) {
                    fieldShowConfig.showConfig[index].show.splice(fieldCodeIndex, 1);
                } else {
                    fieldShowConfig.showConfig[index].show.push(fieldCode);
                }
            }
        });
        this.setState({
            fieldShowConfig
        });
    }

    // 确认字段级联配置（点击字段级联配置浮层上的确认按钮）
    handleShowConfigModalConfirm() {
        const editFieldData = this.props.editFieldData;
        const fieldShowConfig = this.state.fieldShowConfig;
        const beneathFields = fieldShowConfig.beneathFields;
        const showConfig = fieldShowConfig.showConfig;
        let checkEditCodeResult;
        beneathFields.map((field) => {
            let fieldUiSchemaContent = field.uiSchema[field.code];
            if (typeof fieldUiSchemaContent['ui:options'] !== 'undefined') {
                if (typeof fieldUiSchemaContent['ui:options'].show !== 'undefined') {
                    // 如果该字段下已经有级联的关联关系，只清除掉与当前编辑的字段code相关的级联内容
                    checkEditCodeResult = this._hasEditFieldCode(fieldUiSchemaContent['ui:options'].show, editFieldData.code);
                    if (checkEditCodeResult.result) {
                        fieldUiSchemaContent['ui:options'].show.splice(checkEditCodeResult.index, 1);
                    }
                } else {
                    fieldUiSchemaContent['ui:options'].show = [];
                }
            } else {
                fieldUiSchemaContent['ui:options'] = {show: []};
            }
            showConfig.map((showConfigItem) => {
                if (showConfigItem.show.indexOf(field.code) > -1) {
                    checkEditCodeResult = this._hasEditFieldCode(fieldUiSchemaContent['ui:options'].show, editFieldData.code);
                    if (checkEditCodeResult.result) {
                        fieldUiSchemaContent['ui:options'].show[checkEditCodeResult.index].values.push(showConfigItem.code);
                    } else {
                        fieldUiSchemaContent['ui:options'].show.push({
                            field: editFieldData.code,
                            values: [showConfigItem.code]
                        });
                    }
                }
            });
            // 这里在editFieldData字段下面的所有字段都可能会被更新一次，组件可能会被多次刷新
            if (fieldUiSchemaContent['ui:options'].show.length > 0) {
                field.uiSchema[field.code] = fieldUiSchemaContent;
                this.props.updateFieldItemHandler(field.code, field);
            } else {
                // 如果当前字段下的show的配置项为空数组，则要清除掉该配置项（否则在级联配置下面的字段因为匹配不到任何选项code值，永远不展示！）
                delete fieldUiSchemaContent['ui:options'].show;
                if (Object.keys(fieldUiSchemaContent['ui:options']).length <= 0) {
                    delete fieldUiSchemaContent['ui:options'];
                }
                field.uiSchema[field.code] = fieldUiSchemaContent;
                this.props.updateFieldItemHandler(field.code, field);
            }
        });
        this.setState({
            showConfigModalVisible: false
        });
    }

    _hasEditFieldCode(fieldShowOptions, editFieldCode) {
        let result = {
            result: false,
            index: 0
        };
        fieldShowOptions.map((option, index) => {
            if (option.field === editFieldCode) {
                result = {
                    result: true,
                    index: index
                };
            }
        });
        return result;
    }

    // 数据源级联配置浮层展示
    handleFieldUpdateModalOpen() {
        const editFieldData = this.props.editFieldData;
        const uiSchemaContent = editFieldData.uiSchema[editFieldData.code];
        let updateFields = [];
        if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
            if (typeof uiSchemaContent['ui:options'].updateFields !== 'undefined') {
                updateFields = uiSchemaContent['ui:options'].updateFields;
            }
        }
        this.setState({
            dataSourceFieldList: this.generateFieldsWithDataSource(),
            fieldUpdateDataSourceConfig: updateFields,
            updateConfigModalVisible: true
        });
    }

    // 获取配置了数据源的字段列表，字段必须在当前编辑的字段的后面（数据源联动配置用）
    generateFieldsWithDataSource() {
        const fields = this.props.fields;
        const editFieldData = this.props.editFieldData;
        const code = editFieldData.code;
        let editFieldIndex = 0;
        let fieldList = [];
        let jsonSchemaContent;
        fields.map((field, index) => {
            if (field.code === code) {
                editFieldIndex = index;
            }
        });
        fields.slice(editFieldIndex + 1).map((field) => {
            jsonSchemaContent = field.jsonSchema[field.code];
            if (typeof jsonSchemaContent.dataSource !== 'undefined' && jsonSchemaContent.dataSource !== '') {
                fieldList.push(field);
            }
        });
        return fieldList;
    }

    // 数据源级联配置浮层中字段选中状态判断逻辑
    judgeUpdateDataSourceCheckStatus(code) {
        const updateFields = this.state.fieldUpdateDataSourceConfig;
        return updateFields.indexOf(code) > -1;
    }

    // 数据源级联配置变化处理器
    toggleUpdateDataSourceChange(event) {
        const fieldCode = event.currentTarget.getAttribute('data-fieldCode');
        let updateFields = this.state.fieldUpdateDataSourceConfig;
        if (updateFields.indexOf(fieldCode) > -1) {
            updateFields.splice(updateFields.indexOf(fieldCode), 1);
        } else {
            updateFields.push(fieldCode);
        }
        this.setState({
            fieldUpdateDataSourceConfig: updateFields
        });
    }

    // 确认数据源级联配置（点击数据源级联配置浮层的“确定”按钮）
    updateDataSourceConfigConfirm() {
        const updateFields = this.state.fieldUpdateDataSourceConfig;
        const editFieldData = this.props.editFieldData;
        const editFieldCode = editFieldData.code;
        let fieldData = Object.assign({}, editFieldData);
        let uiSchemaContent = fieldData.uiSchema[fieldData.code];
        if (typeof updateFields !== 'undefined' && updateFields.length > 0) {
            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
                uiSchemaContent['ui:options'].updateFields = updateFields;
            } else {
                uiSchemaContent['ui:options'] = {updateFields: updateFields};
            }
        } else {
            // 如果取消掉了数据源级联配置，删除掉updateFields
            if (typeof uiSchemaContent['ui:options'] !== 'undefined' &&
                typeof uiSchemaContent['ui:options'].updateFields !== 'undefined') {

                delete uiSchemaContent['ui:options'].updateFields;
            }
        }
        fieldData.uiSchema[fieldData.code] = uiSchemaContent;
        this.props.updateFieldDataHandler(editFieldCode, fieldData);
        this.setState({
            updateConfigModalVisible: false
        });
    }

    // 清除某个字段的级联配置
    _clearFieldShow(field) {
        const fields = this.props.fields;
        const code = field.code;
        fields.map((field, index) => {
            let uiSchemaContent = field.uiSchema[field.code];
            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
                if (typeof uiSchemaContent['ui:options'].show !== 'undefined') {
                    let checkEditCodeIndex = this._hasEditFieldCode(uiSchemaContent['ui:options'].show, code);
                    if (checkEditCodeIndex.result) {
                        uiSchemaContent['ui:options'].show.splice(checkEditCodeIndex.index, 1);
                        if (uiSchemaContent['ui:options'].show.length <= 0) {
                            delete uiSchemaContent['ui:options'].show;
                        }
                    }
                }
            }
            field.uiSchema[field.code] = uiSchemaContent;
            this.props.updateFieldItemHandler(field.code, field);
        });
    }

    // 清除当前编辑字段的字段级联配置
    handleClearFieldShow() {
        const editFieldData = this.props.editFieldData;
        this._clearFieldShow(editFieldData);
    }

    // 清除某个字段的数据级联
    _clearFieldUpdate(field) {
        const code = field.code;
        let fieldData = Object.assign({}, field);
        let uiSchemaContent = fieldData.uiSchema[fieldData.code];
        if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
            if (typeof uiSchemaContent['ui:options'].updateFields !== 'undefined') {
                delete uiSchemaContent['ui:options'].updateFields;
            }
        }
        fieldData.uiSchema[fieldData.code] = uiSchemaContent;
        this.props.updateFieldItemHandler(code, fieldData);
    }

    // 清除当前编辑字段的数据级联配置
    handleClearFieldUpdate() {
        const editFieldData = this.props.editFieldData;
        this._clearFieldUpdate(editFieldData);
    }

    // 清除表单中全部级联相关的配置（这个功能是为了重置一些联动配置错误的历史数据）
    handleClearAll() {
        const messages = this.props.messages;
        const fields = this.props.fields;
        let uiSchemaContent;
        fields.map((field) => {
            uiSchemaContent = field.uiSchema[field.code];
            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
                if (typeof uiSchemaContent['ui:options'].show !== 'undefined') {
                    delete uiSchemaContent['ui:options'].show;
                }
                if (typeof uiSchemaContent['ui:options'].updateFields !== 'undefined') {
                    delete uiSchemaContent['ui:options'].updateFields;
                }
                field.uiSchema[field.code] = uiSchemaContent;
                this.props.updateFieldItemHandler(field.code, field);
            }
        });
        message.success(messages[getMessageId('fieldConfigClearConfigSuccessTip')]);
    }

    // 根据basicConfigFields或advanceConfigFields过滤待渲染的配置字段(对于jsonSchema的特殊处理)
    _filterJSONSchemaConfigFields(configSchema, configFields = []) {
        let resultSchema = {...configSchema};
        resultSchema.properties = {};
        Object.keys(configSchema.properties).map((configCode) => {
            if (configFields.indexOf(configCode) > -1) {
                resultSchema.properties[configCode] = configSchema.properties[configCode];
            }
        });
        return resultSchema;
    }

    // 根据basicConfigFields或advanceConfigFields过滤待渲染的配置字段
    _filterConfigFields(configSchema, configFields = []) {
        let resultSchema = {};
        Object.keys(configSchema).map((configCode) => {
            if (configFields.indexOf(configCode) > -1) {
                resultSchema[configCode] = configSchema[configCode];
            }
        });
        return resultSchema;
    }

    render() {
        const {globalConfig, customInterfaces, customGateway, customUploadRequest, onImagePreview, xformBizData, xformOptionBizData, editFieldData, dataSource, serverCode, updateFieldDataHandler, messages, locale, supportFieldList, supportConfigList, registerWidgets, emptyPlaceholder, popupContainer} = this.props;
        const basicConfigFields = CONST.XFORM_CONFIG_FIELDS.basic;
        const advanceConfigFields = CONST.XFORM_CONFIG_FIELDS.advance;
        let configSchemaData, hasItemSetting, hasShowConfigButton, fieldShowConfigButton = '';
        let basicConfigXForm = '', advanceConfigXForm = '', bizConfigXForm = '', listItemConfig = '', cascadeConfig = '';
        let bizConfigJsonSchema = {}, bizConfigUiSchema = {}, bizConfigFormData = {};
        const configSchema = ConfigSchema.getConfig(dataSource, serverCode, messages, registerWidgets, supportFieldList);
        const xformCustomWidgets = util.getXFormCustomWidgets(registerWidgets);
        let configSchemaJsonSchema, editFieldJsonSchema;
        if (editFieldData !== null) {
            if (configSchema.hasOwnProperty(editFieldData.type)) {
                configSchemaData = configSchema[editFieldData.type];
                hasItemSetting = configSchemaData.hasItemSetting;
                hasShowConfigButton = configSchemaData.hasShowConfigButton;
                configSchemaJsonSchema = configSchemaData.jsonSchema;
                // 如果一个配置类型有“下拉框选项设置”，则要把当前已经配置了的选项写入configSchema的默认值的jsonSchema中
                if (hasItemSetting && editFieldData.fieldType !== 'system') {
                    try {
                        // 注意array类型的jsonSchema数据格式多一层"items"
                        if (editFieldData.jsonSchema[editFieldData.code].type === 'array') {
                            editFieldJsonSchema = editFieldData.jsonSchema[editFieldData.code].items;
                        } else {
                            editFieldJsonSchema = editFieldData.jsonSchema[editFieldData.code];
                        }
                        configSchemaJsonSchema.properties.value.enum = editFieldJsonSchema.enum;
                        configSchemaJsonSchema.properties.value.enumNames = editFieldJsonSchema.enumNames;
                    } catch (e) {
                        console.warn('[xform-editor]配置类型（' + editFieldData.fieldType + '）configSchema中默认值配置类型错误：缺少enum和enumName');
                    }
                }
                // 根据配置的supportConfigList属性，将没有在supportConfigList中的配置项设置为ui:widget: hidden，这样就隐藏了该配置项(注意：字段“名称”配置项不能被隐藏)
                Object.keys(configSchemaJsonSchema.properties).map((configCode) => {
                    if (CONST.CONFIGUEABLE_FIELD_CONFIG_CODE.indexOf(configCode) > -1 && supportConfigList.indexOf(configCode) <= -1) {
                        if (typeof configSchemaData.uiSchema[configCode] !== 'undefined') {
                            configSchemaData.uiSchema[configCode]['ui:widget'] = 'hidden';
                        } else {
                            configSchemaData.uiSchema[configCode] = {
                                'ui:widget': 'hidden'
                            };
                        }
                    }
                    // 如果是业务字段，字段的编码字段不可修改(configSchema里面一定有uiSchema的code字段，可以放心修改)
                    if (editFieldData.fieldType === 'common') {
                        configSchemaData.uiSchema['code']['ui:disabled'] = true;
                    }
                    // 配置了Code模式才能展示编码字段
                    if (!globalConfig.codeEditable) {
                        configSchemaData.uiSchema['code']['ui:widget'] = 'hidden';
                    }
                });
                basicConfigXForm = (
                    <XForm
                        customInterfaces={customInterfaces}
                        customGateway={customGateway}
                        customUploadRequest={customUploadRequest}
                        onImagePreview={onImagePreview}
                        locale={locale}
                        labelType="vertical"
                        alignType="vertical"
                        registerWidgets={xformCustomWidgets}
                        disabled={!this.props.systemFieldEditable && editFieldData.fieldType === 'system'} // “系统”类型字段不能更改配置
                        jsonSchema={this._filterJSONSchemaConfigFields(configSchemaJsonSchema, basicConfigFields)}
                        uiSchema={this._filterConfigFields(configSchemaData.uiSchema, basicConfigFields)}
                        formData={this.schema2ConfigFormDataConverter(editFieldData, this._filterConfigFields(configSchemaData.formData, basicConfigFields))}
                        onChange={(formData) => {
                            this.handleUpdateFieldSchemaData(formData);
                        }}
                    />
                );

                advanceConfigXForm = (
                    <XForm
                        customInterfaces={customInterfaces}
                        customGateway={customGateway}
                        customUploadRequest={customUploadRequest}
                        onImagePreview={onImagePreview}
                        locale={locale}
                        labelType="vertical"
                        alignType="vertical"
                        registerWidgets={xformCustomWidgets}
                        disabled={!this.props.systemFieldEditable && editFieldData.fieldType === 'system'} // “系统”类型字段不能更改配置
                        jsonSchema={this._filterJSONSchemaConfigFields(configSchemaJsonSchema, advanceConfigFields)}
                        uiSchema={this._filterConfigFields(configSchemaData.uiSchema, advanceConfigFields)}
                        formData={this.schema2ConfigFormDataConverter(editFieldData, this._filterConfigFields(configSchemaData.formData, advanceConfigFields))}
                        onChange={(formData) => {
                            this.handleUpdateFieldSchemaData(formData);
                        }}
                    />
                );

                // 获取字段业务属性配置xform
                xformBizData.map((field) => {
                    bizConfigJsonSchema = Object.assign({}, bizConfigJsonSchema, field.jsonSchema);
                    bizConfigUiSchema = Object.assign({}, bizConfigUiSchema, field.uiSchema);
                    bizConfigFormData = Object.assign({}, bizConfigFormData, field.formData);
                });
                bizConfigJsonSchema = {
                    title: '',
                    type: 'object',
                    properties: bizConfigJsonSchema
                };
                // 从当前编辑的field数据中提取出bizData作为bizConfigXForm的formData，如果editFieldData中有些业务属性字段没有，默认使用xformBizData中的默认formData值
                if (typeof editFieldData.bizData !== 'undefined') {
                    bizConfigFormData = Object.assign({}, bizConfigFormData,
                        editFieldData.bizData[editFieldData.code]);
                }
                bizConfigXForm = (
                    <XForm
                        customInterfaces={customInterfaces}
                        customGateway={customGateway}
                        customUploadRequest={customUploadRequest}
                        onImagePreview={onImagePreview}
                        locale={locale}
                        labelType="vertical"
                        alignType="vertical"
                        registerWidgets={xformCustomWidgets}
                        jsonSchema={bizConfigJsonSchema}
                        uiSchema={bizConfigUiSchema}
                        formData={bizConfigFormData}
                        onChange={(formData) => {
                            this.handleUpdateBizData(formData);
                        }}
                    />
                );

                // 获取“高级设置”数据（系统字段类型不展示这部分内容）
                if (editFieldData.fieldType !== 'system') {
                    // 只有有选项配置的字段才有“字段级联”按钮
                    if (hasShowConfigButton) {
                        fieldShowConfigButton = (
                            <Button
                                type="primary"
                                onClick={this.handleFieldShowConfigModalOpen}
                            >
                                {messages[getMessageId('fieldConfigShowConfigTitle')]}
                            </Button>
                        );
                    } else {
                        fieldShowConfigButton = '';
                    }
                    cascadeConfig = (
                        <div className="cascade-config">
                            <div className="cascade-config-panel">
                                {fieldShowConfigButton}
                                <Button
                                    type="primary"
                                    onClick={this.handleFieldUpdateModalOpen}
                                >
                                    {messages[getMessageId('fieldConfigUpdateFieldConfigTitle')]}
                                </Button>
                                <Popconfirm
                                    title={messages[getMessageId('fieldConfigClearPopconfirmTitle')]}
                                    onConfirm={this.handleClearAll}
                                    getPopupContainer={popupContainer}
                                >
                                    <a href="javascript:;">
                                        {messages[getMessageId('fieldConfigClearConfigTitle')]}
                                    </a>
                                </Popconfirm>
                            </div>
                        </div>
                    );
                }

                // 获取“下拉框选项设置”数据（系统类型字段不展示这部分内容）
                if (hasItemSetting && editFieldData.fieldType !== 'system') {
                    listItemConfig = (
                        <FieldOptionList
                            globalConfig={globalConfig}
                            messages={messages}
                            registerWidgets={registerWidgets}
                            updateFieldDataHandler={updateFieldDataHandler}
                            editFieldData={editFieldData}
                            xformOptionBizData={xformOptionBizData}
                            customInterfaces={customInterfaces}
                            customGateway={customGateway}
                            customUploadRequest={customUploadRequest}
                            onImagePreview={onImagePreview}
                            locale={locale}
                        />
                    );
                }

            } else {
                console.warn('[xform-editor]未在configSchema中找到对应的类型配置');
            }
        }

        const {basicBlockFold, advancedBlockFold, optionBlockFold, cascadeBlockFold, showConfigModalVisible, fieldShowConfig, currentEditShowOptionCode, updateConfigModalVisible, dataSourceFieldList} = this.state;
        const beneathFields = fieldShowConfig.beneathFields;
        const showConfig = fieldShowConfig.showConfig;
        return (
            <div className="app-xform-builder-field-config-wrapper">
                {(() => {
                    if (editFieldData !== null) {
                        return (
                            <div className="field-config-block">
                                <div className={classnames({
                                    'field-config-block-item': true,
                                    fold: basicBlockFold
                                })}>
                                    <div className="field-config-block-header" onClick={() => {
                                        this.toggleBlockFoldChange('basic');
                                    }}>
                                        <i className="xform-iconfont expand-icon">&#xe8ec;</i>
                                        <span>{messages[getMessageId('fieldConfigBoxBasicTitle')]}</span>
                                    </div>
                                    {!basicBlockFold && <div className="field-config-block-content">
                                        {basicConfigXForm}
                                    </div>}
                                </div>
                                {listItemConfig !== '' && <div className={classnames({
                                    'field-config-block-item': true,
                                    fold: optionBlockFold
                                })}>
                                    <div className="field-config-block-header" onClick={() => {
                                        this.toggleBlockFoldChange('option');
                                    }}>
                                        <i className="xform-iconfont expand-icon">&#xe8ec;</i>
                                        <span>{messages[getMessageId('fieldConfigBoxOptionTitle')]}</span>
                                    </div>
                                    {!optionBlockFold && <div className="field-config-block-content">
                                        {listItemConfig}
                                    </div>}
                                </div>}
                                <div className={classnames({
                                    'field-config-block-item': true,
                                    fold: advancedBlockFold
                                })}>
                                    <div className="field-config-block-header" onClick={() => {
                                        this.toggleBlockFoldChange('advance');
                                    }}>
                                        <i className="xform-iconfont expand-icon">&#xe8ec;</i>
                                        <span>{messages[getMessageId('fieldConfigBoxAdvanceTitle')]}</span>
                                    </div>
                                    {!advancedBlockFold && <div className="field-config-block-content">
                                        {advanceConfigXForm}
                                        {bizConfigXForm}
                                    </div>}
                                </div>
                                {editFieldData.fieldType !== 'system' && <div className={classnames({
                                    'field-config-block-item': true,
                                    fold: cascadeBlockFold
                                })}>
                                    <div className="field-config-block-header" onClick={() => {
                                        this.toggleBlockFoldChange('cascade');
                                    }}>
                                        <i className="xform-iconfont expand-icon">&#xe8ec;</i>
                                        <span>{messages[getMessageId('fieldConfigBoxCascadeTitle')]}</span>
                                    </div>
                                    {!cascadeBlockFold && <div className="field-config-block-content">
                                        {cascadeConfig}
                                    </div>}
                                </div>}
                            </div>
                        );
                    } else {
                        return emptyPlaceholder || (
                            <div className="empty-box">
                                <Icon className="empty-icon" type="inbox" />
                                <span className="empty-tip">
                                    {messages[getMessageId('fieldConfigEmptyTip')]}
                                </span>
                            </div>
                        );
                    }
                })()}
                <If condition={showConfigModalVisible}>
                    <Then>
                        <Modal
                            title={messages[getMessageId('showConfigModalTitle')]}
                            visible={showConfigModalVisible}
                            onOk={this.handleShowConfigModalConfirm}
                            onCancel={() => {
                                this.setState({
                                    showConfigModalVisible: false
                                });
                            }}
                            footer={[
                                <Button
                                    type="primary"
                                    onClick={this.handleShowConfigModalConfirm}
                                >
                                    {messages[getMessageId('showConfigModalConfirm')]}
                                </Button>,
                                <Button
                                    type="ghost"
                                    onClick={() => {
                                        this.setState({
                                            showConfigModalVisible: false
                                        });
                                    }}
                                >
                                    {messages[getMessageId('showConfigModalCancel')]}
                                </Button>,
                                <Popconfirm
                                    title={messages[getMessageId('showConfigModalClearConfirmTitle')]}
                                    onConfirm={() => {
                                        this.handleClearFieldShow();
                                        message.success(messages[getMessageId('showConfigModalClearSuccessTip')]);
                                        this.setState({
                                            showConfigModalVisible: false
                                        });
                                    }}
                                    getPopupContainer={popupContainer}
                                >
                                    <Button
                                        type="ghost"
                                    >
                                        {messages[getMessageId('showConfigModalClear')]}
                                    </Button>
                                </Popconfirm>
                            ]}
                            maskClosable={false}
                            wrapClassName="app-xform-builder-show-config-modal"
                            getContainer={popupContainer}
                        >
                            <Row gutter={16}>
                                <Col span={8}>
                                    <p className="show-config-title">
                                        {messages[getMessageId('showConfigModalOptionTitle')]}
                                    </p>
                                    <div className="show-config-option-list">
                                        <ul>
                                            {showConfig.map((showConfigItem, index) => {
                                                return (
                                                    <li
                                                        className={classnames({
                                                            'show-config-option-item': true,
                                                            current: currentEditShowOptionCode === showConfigItem.code
                                                        })}
                                                        data-optionCode={showConfigItem.code}
                                                        onClick={this.handleEditOptionChange}
                                                        key={index}
                                                    >{showConfigItem.name}</li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </Col>
                                <Col span={16}>
                                    <p className="show-config-title">
                                        {messages[getMessageId('showConfigModalShowOptionTitle')]}
                                    </p>
                                    <div className="show-field-list">
                                        <If condition={beneathFields.length > 0}>
                                            <Then>
                                                <ul>
                                                    {beneathFields.map((field, index) => {
                                                        return (
                                                            <li
                                                                className="show-field-item"
                                                                key={index}
                                                                data-fieldCode={field.code}
                                                                onClick={this.toggleShowFieldChange}
                                                            >
                                                                <label>{field.label}</label>
                                                                <Checkbox
                                                                    className="checkbox"
                                                                    checked={this.judgeCheckStatus(field.code)} />
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </Then>
                                            <Else>
                                                {() => {
                                                    return (
                                                        <p className="empty">
                                                            {messages[getMessageId('showConfigModalEmptyShowOption')]}
                                                        </p>
                                                    );
                                                }}
                                            </Else>
                                        </If>
                                    </div>
                                </Col>
                            </Row>
                        </Modal>
                    </Then>
                </If>
                <If condition={updateConfigModalVisible}>
                    <Then>
                        <Modal
                            title={messages[getMessageId('updateFieldConfigModalTitle')]}
                            visible={updateConfigModalVisible}
                            maskClosable={false}
                            onOk={this.updateDataSourceConfigConfirm}
                            onCancel={() => {
                                this.setState({
                                    updateConfigModalVisible: false
                                });
                            }}
                            footer={[
                                <Button
                                    type="primary"
                                    onClick={this.updateDataSourceConfigConfirm}
                                >{messages[getMessageId('updateFieldConfigModalConfirm')]}</Button>,
                                <Button
                                    type="ghost"
                                    onClick={() => {
                                        this.setState({
                                            updateConfigModalVisible: false
                                        });
                                    }}
                                >
                                    {messages[getMessageId('updateFieldConfigModalCancel')]}
                                </Button>,
                                <Popconfirm
                                    title={messages[getMessageId('updateFieldConfigModalClearConfirmTitle')]}
                                    onConfirm={() => {
                                        this.handleClearFieldUpdate();
                                        message.error(messages[getMessageId('updateFieldConfigModalClearSuccessTip')]);
                                        this.setState({
                                            updateConfigModalVisible: false
                                        });
                                    }}
                                    getPopupContainer={popupContainer}
                                >
                                    <Button
                                        type="ghost"
                                    >{messages[getMessageId('updateFieldConfigModalClear')]}</Button>
                                </Popconfirm>
                            ]}
                            wrapClassName="app-xform-builder-update-dataSource-config-modal"
                            getContainer={popupContainer}
                        >
                            <p className="update-dataSource-config-title">
                                {messages[getMessageId('updateFieldConfigModalOption')]}
                            </p>
                            <div className="update-dataSource-list">
                                <If condition={dataSourceFieldList.length > 0}>
                                    <Then>
                                        <ul>
                                            {dataSourceFieldList.map((field, index) => {
                                                return (
                                                    <li className="update-dataSource-item"
                                                        key={index}
                                                        data-fieldCode={field.code}
                                                        onClick={this.toggleUpdateDataSourceChange}
                                                    >
                                                        <label>{field.label}</label>
                                                        <Checkbox
                                                            className="checkbox"
                                                            checked={this.judgeUpdateDataSourceCheckStatus(field.code)} />
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </Then>
                                    <Else>{() => {
                                        return (
                                            <p className="empty">
                                                {messages[getMessageId('updateFieldConfigModalEmptyOption')]}
                                            </p>
                                        );
                                    }}</Else>
                                </If>
                            </div>
                        </Modal>
                    </Then>
                </If>
            </div>
        );
    }
}

export default FieldConfig;
