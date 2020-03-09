/**
 * xform基础widget => 复选下拉框选择器组件
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Select} from 'antd';
import classnames from 'classnames';

import {getMessageId} from '../i18n/localeMessages';

const Option = Select.Option;
const ALL_VALUE = 'all';

export default class CustomMultiSelect extends Component {

    constructor(props) {
        super(props);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'multi-select');
    }

    handleSelectChange(selectedValue, allValues) {
        let {value, onChange} = this.props;
        const emptyValue = [];
        // !!!兼容旧数据（旧的multiSelect类型字段模板formData值是""，后面才改成[]）
        if (typeof value === 'undefined' || value === '') {
            value = [];
        }
        value = value.filter((item) => allValues.indexOf(item) > -1);
        if (value.length === allValues.length) {
            value.push(ALL_VALUE);
        }
        // 增加了一个“全选”
        if (value.indexOf(ALL_VALUE) <= -1 && selectedValue.indexOf(ALL_VALUE) > -1) {
            onChange(allValues);
        } else if (value.indexOf(ALL_VALUE) > -1 && selectedValue.indexOf(ALL_VALUE) <= -1) {
            onChange(emptyValue);
        } else {
            if (selectedValue.indexOf(ALL_VALUE) > -1) {
                selectedValue.splice(selectedValue.indexOf(ALL_VALUE), 1)
                onChange(selectedValue);
            } else {
                onChange(selectedValue);
            }
        }
    }

    _getValidateMessage(errorType, validate) {
        let errorMessage = '';
        validate.map((validateItem) => {
            if (validateItem.type === errorType) {
                errorMessage = validateItem.message;
                return false;
            }
        });
        return errorMessage;
    }

    render() {
        const popupContainer = this.props.formContext && this.props.formContext.popupContainer;
        const messages = this.props.formContext && this.props.formContext.messages;
        const {schema, id, options, disabled, readonly, autofocus, placeholder} = this.props;

        let {value} = this.props;

        // enumOptions会由react-jsonschema-form注入到组件的options中 https://github.com/mozilla-services/react-jsonschema-form#custom-widget-components note
        let enumOptions = options.enumOptions || [];
        if (typeof schema.data !== 'undefined' && schema.data.length >= 0) {
            enumOptions = schema.data;
        }

        // !!!兼容旧数据（旧的multiSelect类型字段模板formData值是""，后面才改成[]）
        if (typeof value === 'undefined' || value === '') {
            value = [];
        }

        // 根据value和enumOptions来判断是否需要添加“全选”
        value = value.filter((item) => {
            let result = false;
            enumOptions.map((enums) => {
                if (enums.value === item) {
                    result = true;
                }
            });
            return result;
        });

        // 当value值为非空数组时，要自动判断是否添加“全选”
        if (value.length > 0 && value.length === enumOptions.map((enums) => enums.value).length) {
            value.push(ALL_VALUE);
        }

        // 如果选项为空时，不添加“全选”按钮
        let checkAllOptions = '';
        if (enumOptions.length > 0) {
            checkAllOptions = (
                <Option key="all" label={messages[getMessageId('xformCheckAllLabel')]} value={ALL_VALUE}>
                    {messages[getMessageId('xformCheckAllLabel')]}
                </Option>
            );
        }

        // 对于value值为空数组的情况，value的值传入undefined，这样才能显示组件的placeholder
        if (value && value.length <= 0) {
            value = undefined;
        }

        //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过
        let validateMessage = '';
        let _errorType = options._errorType || '';
        if (_errorType !== '' && typeof options.validate !== 'undefined') {
            validateMessage = this._getValidateMessage(_errorType, options.validate);
        }

        return (
            <div className={classnames({
                'ant-form-item-control': true,
                'xform-custom-widget': true,
                'xform-custom-multiple-select': true,
                'has-error': _errorType !== ''
            })}>
                <Select
                    id={id}
                    value={value}
                    disabled={disabled}
                    readonly={readonly}
                    mode="multiple"
                    onChange={(value) => {
                        this.handleSelectChange(value, enumOptions.map((enums) => enums.value));
                    }}
                    autoFocus={autofocus}
                    placeholder={placeholder}
                    optionFilterProp="label"
                    optionLabelProp="label"
                    getPopupContainer={popupContainer}
                    {...options}
                >
                    {checkAllOptions}
                    {enumOptions.map((enums, index) => {
                        return (
                            <Option
                                key={index}
                                value={enums.value}
                                label={enums.label}
                            >{enums.label}</Option>
                        );
                    })}
                </Select>
                <div className="ant-form-explain">{validateMessage}</div>
            </div>
        );
    }
}
