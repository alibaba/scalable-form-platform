/**
 * xform基础widget => 数字选择器类型
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {List, Stepper} from 'antd-mobile';
import classnames from 'classnames';

import './index.less';

const ListItem = List.Item;

export default class CustomNumberWidget extends PureComponent {

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
        const BLACK_LIST = ['enumOptions', 'disabled', 'readonly'];
        BLACK_LIST.map((name) => {
            if (options.hasOwnProperty(name)) {
                delete options[name];
            }
        });
        return options;
    }

    render() {
        const {options, schema, label, required, readonly, disabled, onChange, value} = this.props;
        const max = typeof schema.maximum !== 'undefined' ? schema.maximum : Infinity;
        const min = typeof schema.minimum !== 'undefined' ? schema.minimum : -Infinity;
        const step = typeof schema.multipleOf !== 'undefined' ? schema.multipleOf : 1;

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
                'xform-custom-widget': true,
                'xform-custom-number-input': true,
                'xform-item-has-error': _errorType !== '',
                disabled
            })}>
                <ListItem
                    wrap
                    multipleLine
                    extra={<Stepper
                        style={{ width: '100%', minWidth: '100px' }}
                        showNumber
                        max={max}
                        min={min}
                        step={step}
                        value={value}
                        disabled={disabled}
                        readOnly={readonly}
                        onChange={(value) => {
                            onChange(value);
                        }}
                        {...otherOptions}
                    />}
                ><label className={classnames({
                    required: required
                })}>{label}</label></ListItem>
                <div className="xform-item-error-explain">{validateMessage}</div>
            </div>
        );
    }
}
