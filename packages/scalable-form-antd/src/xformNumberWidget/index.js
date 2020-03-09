/**
 * xform基础widget => 数字选择器类型
 */

import './index.less';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {InputNumber} from 'antd';
import classnames from 'classnames';

export default class CustomNumberWidget extends Component {

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'number');
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


    //过滤掉react-json-schema中注入option中的属性，防止这部分属性添加到组件上
    _filterSystemOptions(options) {
        const BLACK_LIST = ['enumOptions', 'disabled', 'readonly', 'emptyValue'];
        BLACK_LIST.map((name) => {
            if (options.hasOwnProperty(name)) {
                delete options[name];
            }
        });
        return options;
    }

    render() {
        let options = this.props.options;
        let schema = this.props.schema,
            readonly = this.props.readonly,
            autofocus = this.props.autofocus,
            onChange = this.props.onChange,
            disabled = this.props.disabled,
            value = this.props.value;
        let max = (typeof schema.maximum === 'number') ? schema.maximum : Infinity;
        let min = (typeof schema.minimum === 'number') ? schema.minimum : -Infinity;
        let step = schema.multipleOf || 1;
        //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过
        let validateMessage = '';
        let {_errorType, validate, ...otherOptions} = options;
        otherOptions = this._filterSystemOptions(otherOptions);
        _errorType = _errorType || '';
        if (_errorType !== '' && typeof validate !== 'undefined') {
            validateMessage = this._getValidateMessage(_errorType, validate);
        }

        return (
            <div className={classnames({
                'ant-form-item-control': true,
                'xform-custom-widget': true,
                'xform-custom-number-input': true,
                'has-error': _errorType !== ''
            })}>
                <InputNumber
                    max={max}
                    min={min}
                    step={step}
                    value={value}
                    disabled={disabled}
                    readOnly={readonly}
                    autoFocus={autofocus}
                    onChange={(value) => {
                        onChange(value);
                    }}
                    {...otherOptions}
                />
                <div className="ant-form-explain">{validateMessage}</div>
            </div>
        );
    }
}
