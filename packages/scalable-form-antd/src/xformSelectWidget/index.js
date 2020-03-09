/**
 * xform基础widget => select选择器组件
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Select} from 'antd';
import classnames from 'classnames';

const Option = Select.Option;

export default class CustomSelect extends Component {

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'select');
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
        const {schema, id, options, disabled, readonly, autofocus, placeholder, onChange} = this.props;

        // 对于value值为空字符串的情况，value的值传入undefined，这样才能显示组件的placeholder
        let {value} = this.props;
        if (value === '') {
            value = undefined;
        }

        // enumOptions会由react-jsonschema-form注入到组件的options中 https://github.com/mozilla-services/react-jsonschema-form#custom-widget-components note
        let enumOptions = options.enumOptions || [];
        if (typeof schema.data !== 'undefined' && schema.data.length >= 0) {
            enumOptions = schema.data;
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
                'xform-custom-select': true,
                'has-error': _errorType !== ''
            })}>
                <Select
                    id={id}
                    allowClear
                    value={value}
                    showSearch
                    disabled={disabled}
                    readonly={readonly}
                    onChange={(value) => {
                        onChange(value);
                    }}
                    autoFocus={autofocus}
                    placeholder={placeholder}
                    optionFilterProp="label"
                    optionLabelProp="label"
                    getPopupContainer={popupContainer}
                    {...options}
                >
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
