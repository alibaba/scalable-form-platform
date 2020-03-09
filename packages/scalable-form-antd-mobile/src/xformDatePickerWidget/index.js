/**
 * xform基础widget => DatePicker日期选择类型
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {DatePicker, List} from 'antd-mobile';
import classnames from 'classnames';
import {If, Then, Else} from 'react-if';

import './index.less';
import utils from '../util';

const ListItem = List.Item;

export default class CustomDatePickerWidget extends PureComponent {

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'date');
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
        const {options, label, required, value, disabled, onChange, placeholder} = this.props;

        //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过
        let validateMessage = '';
        let _errorType = options._errorType || '';
        if (_errorType !== '' && typeof options.validate !== 'undefined') {
            validateMessage = this._getValidateMessage(_errorType, options.validate);
        }

        return (
            <div className={classnames({
                'xform-custom-widget': true,
                'xform-custom-datepicker': true,
                'xform-item-has-error': _errorType !== '',
                disabled
            })}>
                <If condition={typeof value !== 'undefined' && value !== ''}>
                    <Then>
                    <DatePicker
                        mode="date"
                        format="YYYY-MM-DD"
                        value={new Date(value.replace(/-/g, '/'))}
                        disabled={disabled}
                        onChange={(value) => {
                            onChange(utils.formatDate(value, 'yyyy-MM-dd'));
                        }}
                        extra={placeholder}
                        {...options}
                    >
                        <ListItem arrow="horizontal" wrap multipleLine>
                            <label className={classnames({
                                required: required
                            })}>{label}</label>
                        </ListItem>
                    </DatePicker>
                    </Then>
                    <Else>{() => {
                        return (
                            <DatePicker
                                mode="date"
                                format="YYYY-MM-DD"
                                disabled={disabled}
                                onChange={(value) => {
                                    onChange(utils.formatDate(value, 'yyyy-MM-dd'));
                                }}
                                extra={placeholder}
                                {...options}
                            >
                                <ListItem arrow="horizontal" wrap multipleLine>
                                    <label className={classnames({
                                        required: required
                                    })}>{label}</label>
                                </ListItem>
                            </DatePicker>
                        );
                    }}</Else>
                </If>
                <div className="ant-form-explain">{validateMessage}</div>
            </div>
        );
    }
}
