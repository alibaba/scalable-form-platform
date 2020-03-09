/**
 * xform基础widget => radio单选按钮组
 */

import './index.less';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Radio} from 'antd';
import classnames from 'classnames';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

export default class CustomRadio extends Component {

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'radio');
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
        let formContext = this.props.formContext;
        let schema = this.props.schema;
        let options = this.props.options,
            value = this.props.value,
            disabled = this.props.disabled,
            readonly = this.props.readonly,
            onChange = this.props.onChange;
        let enumOptions = options.enumOptions || [];
        if (typeof schema.data !== 'undefined' && schema.data.length >= 0) {
            enumOptions = schema.data;
        }
        const labelType = formContext.labelType;
        // 如果labelType为inline则单选、复选默认inline的方式排列；如果labelType为vertical则单选、复选默认vertical方式排列
        let vertical = typeof options.vertical === 'boolean' ? options.vertical : labelType === 'vertical';
        //默认使用普通radio方式
        let style = options.style || 'normal';
        if (style === 'button') {
            //RadioButton类型默认必须是inline的
            vertical = false;
        }

        //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过
        let validateMessage = '';
        let _errorType = options._errorType || '';
        if (_errorType !== '' && typeof options.validate !== 'undefined') {
            validateMessage = this._getValidateMessage(_errorType, options.validate);
        }

        let form = '';
        switch (style) {
            case 'normal':
                form = (
                    <RadioGroup
                        value={value}
                        onChange={(event) => {
                            onChange(event.target.value);
                        }}
                    >
                        {enumOptions.map((enums, index) => {
                            return (
                                <Radio
                                    disabled={disabled}
                                    readOnly={readonly}
                                    key={index}
                                    value={enums.value}
                                >{enums.label}</Radio>
                            );
                        })}
                    </RadioGroup>
                    );
                break;
            case 'button':
                form = (
                    <RadioGroup
                        value={value}
                        onChange={(event) => {
                            onChange(event.target.value);
                        }}
                    >
                        {enumOptions.map((enums, index) => {
                            return (
                                <RadioButton
                                    disabled={disabled}
                                    readOnly={readonly}
                                    key={index}
                                    value={enums.value}
                                >{enums.label}</RadioButton>
                            );
                        })}
                    </RadioGroup>
                );
                break;
            default:
                //什么也不做
                form = '';
        }

        return (
            <div className={classnames({
                'ant-form-item-control': true,
                'xform-custom-widget': true,
                'xform-custom-radio': true,
                'has-error': _errorType !== ''
            })}>
                <div className={classnames({
                    'vertical': vertical
                })}>
                    {form}
                    <div className="ant-form-explain">{validateMessage}</div>
                </div>
            </div>
        );

    }

}
