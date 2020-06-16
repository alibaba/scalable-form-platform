/**
 * xform-builder左侧“字段选择”
 * @props: platform（选中的平台，laptop表示PC端、mobile表示移动端） commonFields（通用field数据） fields（生效field数据，主要用于做添加字段code重复判断） xformBizData（字段业务属性配置数据，主要用于构造自定义字段的fieldData）xformOptionBizData（字段选项业务属性配置数据）  addFieldHandler（添加生效字段处理器）
 */

import './index.less';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Icon, Input, message} from 'antd';
import classnames from 'classnames';

import {getMessageId} from '../../i18n/localeMessages';
import * as CONST from '../../common/const';
import ConfigSchema from '../../configSchema/index';
import customFieldSchema from '../../customFieldSchema/index';
import {util} from '../../common/util';
import CommonFieldOption from './commonFieldOption';
import CustomFieldOption from './customFieldOption';
import './index.less';

const {Search} = Input;

class FieldPicker extends PureComponent {

    static propTypes = {
        platform: PropTypes.oneOf(['laptop', 'mobile', 'both']).isRequired,
        messages: PropTypes.object.isRequired,
        commonFields: PropTypes.array.isRequired,
        fields: PropTypes.array.isRequired,
        xformBizData: PropTypes.array.isRequired,
        xformOptionBizData: PropTypes.array.isRequired,
        addFieldHandler: PropTypes.func.isRequired,
        emptyPlaceholder: PropTypes.element
    };

    constructor(...args) {
        super(...args);
        this.handleKeywordSearch = this.handleKeywordSearch.bind(this);
        this.handleKeywordInputChange = this.handleKeywordInputChange.bind(this);
        this.handleCommonFieldsFoldChange = this.handleCommonFieldsFoldChange.bind(this);
        this.handleCustomFieldsFoldChange = this.handleCustomFieldsFoldChange.bind(this);
        this.handleAddCommonField = this.handleAddCommonField.bind(this);
        this.generateFieldDataFormCommonType = this.generateFieldDataFormCommonType.bind(this);
        this.generateFieldDataFromCustomType = this.generateFieldDataFromCustomType.bind(this);
        this.handleAddCustomField = this.handleAddCustomField.bind(this);
        this.state = {
            keyword: '',            // 可用字段搜索关键词
            searchKeyword: '',      // 用于搜索的关键词
            commonPanelFold: false, // 业务字段是否折叠
            customPanelFold: false  // 自定义字段是否折叠
        };
    }

    // 搜索可用字段
    handleKeywordSearch(keyword) {
        this.setState({
            searchKeyword: keyword
        });
    }

    handleKeywordInputChange(event) {
        const value = event.currentTarget.value;
        this.setState({
            keyword: value
        });
    }

    // 业务字段、自定义字段区域折叠状态变化
    handleCommonFieldsFoldChange() {
        const {commonPanelFold} = this.state;
        this.setState({
            commonPanelFold: !commonPanelFold
        });
    }

    handleCustomFieldsFoldChange() {
        const {customPanelFold} = this.state;
        this.setState({
            customPanelFold: !customPanelFold
        });
    }

    // 添加“通用模板”字段
    handleAddCommonField(event) {
        const code = event.currentTarget.getAttribute('data-code');
        const fieldData = this.generateFieldDataFormCommonType(code);
        if (fieldData !== null) {
            this.props.addFieldHandler(fieldData);
        }
    }

    // 添加“通用字段”
    generateFieldDataFormCommonType(code) {
        const messages = this.props.messages;
        let isDuplicateCode = false;
        this.props.fields.map((field) => {
            if (field.code === code) {
                isDuplicateCode = true;
            }
        });
        if (isDuplicateCode) {
            message.error(messages[getMessageId('fieldPickerDeplicateCodeErrorTip')] + code);
            return null;
        }
        let fieldData = {};
        this.props.commonFields.map((commonField) => {
            if (commonField.code === code) {
                fieldData = commonField;
            }
        });
        return fieldData;
    }

    // 添加“自定义字段”，需要随机生成code
    generateFieldDataFromCustomType(type) {
        const messages = this.props.messages;
        const supportFieldList = this.props.supportFieldList;
        const registerWidgets = this.props.registerWidgets;
        let code;
        let isDuplicateCode = true;
        let fieldData;
        const schema = customFieldSchema.getSchema(messages, registerWidgets, supportFieldList);
        code = util.getRandomString(10);
        isDuplicateCode = false;
        this.props.fields.map((field) => {
            if (field.code === code) {
                isDuplicateCode = true;
            }
        });
        if (isDuplicateCode) {
            message.error(messages[getMessageId('fieldPickerDeplicateCodeErrorTip')] + code);
        } else {
            fieldData = this._fieldDataGenerator(schema[type], code);
            return fieldData;
        }
    }

    // 在字段最后一项添加
    handleAddCustomField(event) {
        let type = event.currentTarget.getAttribute('data-type');
        const fieldData = this.generateFieldDataFromCustomType(type);
        this.props.addFieldHandler(fieldData);
    }

    // 根据随机生成的code、xformBizData从customFieldSchema生成生效字段的fieldData
    _fieldDataGenerator(fieldData, code) {
        const xformBizData = this.props.xformBizData;
        const xformOptionBizData = this.props.xformOptionBizData;
        // 这里要注意对customFieldSchema做clone，否则会出现修改schema配置本身
        let resultData = Object.assign({}, fieldData);
        let bizData = {}, optionBizData = {};
        let resultBizData, index;
        xformBizData.map((item) => {
            bizData = Object.assign({}, bizData, item.formData);
        });
        xformOptionBizData.map((item) => {
            optionBizData = Object.assign({}, optionBizData, item.formData);
        });
        if ((fieldData.jsonSchema.enum && fieldData.jsonSchema.enum.length >= 0) && (fieldData.jsonSchema.enumNames && fieldData.jsonSchema.enumNames.length >= 0)) {
            let enums = fieldData.jsonSchema.enum;
            let enumNames = fieldData.jsonSchema.enumNames;
            resultBizData = Object.assign({}, bizData, {
                [CONST.XFORM_OPTION_BIZ_NAME]: {}
            });
            for (index = 0; index < enums.length; index++) {
                resultBizData[CONST.XFORM_OPTION_BIZ_NAME][enums[index]] = Object.assign({}, optionBizData, {
                    name: enumNames[index],
                    code: enums[index]
                });
            }
        } else {
            resultBizData = bizData;
        }
        resultData.code = code;
        resultData.jsonSchema = {
            [code]: fieldData.jsonSchema
        };
        resultData.uiSchema = {
            [code]: fieldData.uiSchema
        };
        resultData.formData = {
            [code]: fieldData.formData
        };
        resultData.bizData = {
            [code]: resultBizData
        };
        return resultData;
    }

    // 根据字段的label值与关键词的前端匹配来筛选配置列表
    _filterListItemByLabel(list, keyword) {
        return list.filter((listItem) => {
            return listItem.label.indexOf(keyword) > -1;
        });
    }


    render() {
        const {messages, platform ,supportFieldList, registerWidgets, emptyPlaceholder} = this.props;
        const commonFields = this.props.commonFields;
        const {keyword, searchKeyword, commonPanelFold, customPanelFold} = this.state;
        let configFields = [];
        let configValue, configPlatform;
        // 遍历configSchema
        const configSchema = ConfigSchema.getDefaultConfig(messages, registerWidgets, supportFieldList);
        Object.keys(configSchema).map((key) => {
            configValue = configSchema[key];
            configPlatform = configValue.platform || [];
            // 根据当前用户选择的配置端来过滤出来支持的配置字段类型
            if (util._isInConfigPlatform(configPlatform, platform)) {
                configFields.push({
                    icon: configValue.icon,
                    label: configValue.label,
                    type: key
                });
            }
        });

        // 根据关键词进行列表选项过滤
        const filterCommonFields = this._filterListItemByLabel(commonFields, searchKeyword);
        const filterCustomFields = this._filterListItemByLabel(configFields, searchKeyword);


        return (
            <div className="app-xform-builder-field-picker-wrapper">
                <Search className="field-search-box" placeholder={messages[getMessageId('fieldPickerKeywordSearchPlaceholder')]} onSearch={this.handleKeywordSearch} value={keyword} onChange={this.handleKeywordInputChange} />
                {(() => {
                    if (filterCommonFields.length <= 0 && filterCustomFields.length <= 0) {
                        return emptyPlaceholder || (
                            <div className="empty-box">
                                <Icon className="empty-icon" type="inbox" />
                                <span className="empty-tip">
                                    {messages[getMessageId('fieldConfigEmptyTip')]}
                                </span>
                            </div>
                        );
                    } else {
                        return (
                            <div>
                                {filterCommonFields.length > 0 && <div className="common-field-template">
                                    <div
                                        className={classnames({
                                            'field-panel': true,
                                            fold: commonPanelFold
                                        })}
                                        onClick={this.handleCommonFieldsFoldChange}
                                    >
                                        <i className="xform-iconfont icon">&#xe8ec;</i>
                                        <span className="template-title">
                                            {messages[getMessageId('fieldPickerCommonTitle')]}
                                        </span>
                                    </div>
                                    {
                                        !commonPanelFold && <ul className="template-list">
                                            {filterCommonFields.map((field, index) => {
                                                return (
                                                    <li key={field.code} className="common-type">
                                                        <CommonFieldOption
                                                            index={index}
                                                            field={field}
                                                            addCommonFieldHandler={this.handleAddCommonField}
                                                            generateFieldData={this.generateFieldDataFormCommonType}
                                                        />
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    }
                                </div>}

                                {filterCustomFields.length > 0 && <div className="custom-field-template">
                                    <div
                                        className={classnames({
                                            'field-panel': true,
                                            fold: customPanelFold
                                        })}
                                        onClick={this.handleCustomFieldsFoldChange}
                                    >
                                        <i className="xform-iconfont icon">&#xe8ec;</i>
                                        <span className="template-title">
                                            {messages[getMessageId('fieldPickerCustomTitle')]}
                                        </span>
                                    </div>
                                    {
                                        !customPanelFold && <ul className="template-list">
                                            {filterCustomFields.map((field, index) => {
                                                return (
                                                    <li key={field.type} className="template-type">
                                                        <CustomFieldOption
                                                            index={index}
                                                            field={field}
                                                            addCustomFieldHandler={this.handleAddCustomField}
                                                            generateFieldData={this.generateFieldDataFromCustomType}
                                                        />
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    }
                                </div>}
                            </div>
                        );
                    }
                })()}

            </div>
        );
    }
}

export default FieldPicker;
