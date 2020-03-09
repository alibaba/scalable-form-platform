/**
 * xform基础widget => checkbox复选按钮组
 */

import './index.less';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Checkbox} from 'antd';
import classnames from 'classnames';

const CheckboxGroup = Checkbox.Group;

export default class CustomCheckbox extends Component {

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'checkbox');
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

    _getEnumsFromNameList(enumOptions, enumNames) {
        let result = [];
        // 容错代码：当formData传递的为空字符串时也能正确解析
        if (typeof enumNames === 'undefined' || (typeof enumNames === 'string')) {
            enumNames = [];
        }
        enumNames.map((name) => {
            enumOptions.map((enumOption) => {
                if (enumOption.label === name) {
                    result.push(enumOption.value);
                }
            });
        });
        return result;
    }

    _getEnumNamesFromValueList(enumOptions, enums) {
        let result = [];
        // 容错代码：当formData传递的为空字符串时也能正确解析
        if (typeof enums === 'undefined' || (typeof enums === 'string')) {
            enums = [];
        }
        enums.map((value) => {
            enumOptions.map((enumOption) => {
                if (enumOption.value === value) {
                    result.push(enumOption.label);
                }
            });
        });
        return result;
    }

    render() {
        const formContext = this.props.formContext;
        let schema = this.props.schema;
        let options = this.props.options,
            value = this.props.value,
            disabled = this.props.disabled,
            onChange = this.props.onChange;
        let enumOptions = options.enumOptions || [];
        let enums = [], enumNames = [];
        if (typeof schema.data !== 'undefined' && schema.data.length >= 0) {
            enumOptions = schema.data;
        }
        const labelType = formContext.labelType;
        // 如果labelType为inline则单选、复选默认inline的方式排列；如果labelType为vertical则单选、复选默认vertical方式排列
        let vertical = typeof options.vertical === 'boolean' ? options.vertical : labelType === 'vertical';

        enumOptions.map((enumsOption) => {
            enums.push(enumsOption.value);
            enumNames.push(enumsOption.label);
        });

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
                'xform-custom-checkbox': true,
                'has-error': _errorType !== ''
            })}>
                <div className={classnames({
                    'vertical': vertical
                })}>
                    <CheckboxGroup
                        disabled={disabled}
                        value={this._getEnumNamesFromValueList(enumOptions, value)}
                        options={enumNames}
                        onChange={(checkedList) => {
                            onChange(this._getEnumsFromNameList(enumOptions, checkedList));
                        }}
                    />
                    <div className="ant-form-explain">{validateMessage}</div>
                </div>
            </div>
        );

    }

}
