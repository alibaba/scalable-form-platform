/**
 * xform基础widget => checkbox复选按钮组
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Checkbox, List} from 'antd-mobile';
import classnames from 'classnames';

import './index.less';

const ListItem = List.Item;
const CheckboxItem = Checkbox.CheckboxItem;

export default class CustomCheckbox extends PureComponent {

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'checkbox');
    }

    getOptionLabel(enumOptions, value) {
        let result = '';
        enumOptions.map((enums) => {
            if (enums.value === value) {
                result = enums.label;
            }
        });
        return result;
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

    // 根据options中的validate字段判断是否必填
    _isFieldRequired(validate) {
        let isFieldRequired = false;
        validate.map((validateItem) => {
            if (validateItem.type === 'empty') {
                isFieldRequired = true;
            }
        });
        return isFieldRequired;
    }

    render() {
        const {schema, options, value, disabled, onChange} = this.props;

        // react-jsonschema-form组件对于array类型的字段会丢失掉required这个props，只能通过自己的逻辑判断来补齐这个逻辑
        let required = false;
        if (typeof options.validate !== 'undefined') {
            required = this._isFieldRequired(options.validate);
        }

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
                'xform-custom-widget': true,
                'xform-custom-checkbox': true,
                'xform-item-has-error': _errorType !== '',
                disabled
            })}>
                <ListItem
                    wrap
                    multipleLine
                    error={_errorType !== ''}
                    extra={value.map((item) => this.getOptionLabel(enumOptions, item)).join(',')}
                ><label className={classnames({
                    required: required
                })}>{schema.title}</label></ListItem>
                {enumOptions.map((enums) => {
                    return (
                        <CheckboxItem
                            key={enums.value}
                            disabled={disabled}
                            checked={value.indexOf(enums.value) > -1}
                            onChange={() => {
                                // 这里react-jsonschema-form的onChange没有对formData进行deepClone会导致组件刷新失败，这里必须要自己进行deepClone。参见https://github.com/mozilla-services/react-jsonschema-form/blob/master/src/components/Form.js#L101
                                let result = [];
                                value.map((item) => result.push(item));
                                if (result.indexOf(enums.value) > -1) {
                                    result.splice(result.indexOf(enums.value), 1);
                                } else {
                                    result.push(enums.value);
                                }
                                onChange(result);
                            }}
                        >{enums.label}</CheckboxItem>
                    );
                })}
                <div className="xform-item-error-explain">{validateMessage}</div>
            </div>
        );
    }
}
