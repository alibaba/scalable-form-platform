/**
 * xform基础widget => radio单选按钮组
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Radio, List, SegmentedControl} from 'antd-mobile';
import classnames from 'classnames';

import './index.less';

const RadioItem = Radio.RadioItem;
const ListItem = List.Item;

export default class CustomRadio extends PureComponent {

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'radio');
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

    render() {
        const {schema, label, required, options, value, disabled, onChange} = this.props;

        let enums = schema.enum || [];
        let enumNames = schema.enumNames || [];
        let enumOptions = [];
        enums.map((item, index) => {
            enumOptions.push({
                label: enumNames[index],
                value: enums[index]
            });
        });
        if (typeof schema.data !== 'undefined' && schema.data.length >= 0) {
            schema.data.map((schemaItem) => {
                enums.push(schemaItem.value);
                enumNames.push(schemaItem.label);
            });
            enumOptions = schema.data;
        }


        //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过
        let validateMessage = '';
        let _errorType = options._errorType || '';
        if (_errorType !== '' && typeof options.validate !== 'undefined') {
            validateMessage = this._getValidateMessage(_errorType, options.validate);
        }

        // 根据选项数量多少决定移动端组件展示
        if (enums.length <= 2) {
            return (
                <div className={classnames({
                    'xform-custom-widget': true,
                    'xform-custom-radio-button': true,
                    'xform-item-has-error': _errorType !== '',
                    disabled
                })}>
                    <ListItem
                        wrap
                        multipleLine
                        extra={(
                            <SegmentedControl
                                tintColor="#3296FA"
                                values={enumNames}
                                selectedIndex={enums.indexOf(value)}
                                disabled={disabled}
                                onChange={(event) => {
                                    if (typeof event.nativeEvent !== 'undefined') {
                                        onChange(enums[event.nativeEvent.selectedSegmentIndex]);
                                    } else {
                                        onChange(enums[event.selectedSegmentIndex]);
                                    }
                                }}
                                {...options}
                            />
                        )}
                    ><label className={classnames({
                        required: required
                    })}>{label}</label></ListItem>
                    <div className="xform-item-error-explain">{validateMessage}</div>
                </div>
            );
        } else {
            return (
                <div className={classnames({
                    'xform-custom-widget': true,
                    'xform-custom-radio': true,
                    'xform-item-has-error': _errorType !== '',
                    disabled
                })}>
                    <ListItem
                        wrap
                        multipleLine
                        error={_errorType !== ''}
                        extra={this.getOptionLabel(enumOptions, value)}
                    ><label className={classnames({
                        required: required
                    })}>{label}</label></ListItem>
                    {enumOptions.map((enums) => {
                        return (
                            <RadioItem
                                className={classnames({
                                    "xform-radio-item": true,
                                    "checked": value === enums.value
                                })}
                                key={enums.value}
                                checked={value === enums.value}
                                disabled={disabled}
                                onChange={() => {
                                    onChange(enums.value);
                                }}
                            >{enums.label}</RadioItem>
                        );
                    })}
                    <div className="xform-item-error-explain">{validateMessage}</div>
                </div>
            );
        }
    }
}
