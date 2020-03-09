/**
 * xform基础widget => DateTimePicker日期时间选择类型
 * @props: schema（format => 'date-time'普通日期时间选择器）
 */

import './index.less';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DatePicker} from 'antd';
import moment from 'moment';
import classnames from 'classnames';

export default class CustomDateTimePickerWidget extends Component {

    componentDidMount() {
        const formContext = this.props.formContext || {};
        const logger = formContext.logger || {};
        logger.logEvent('widget', 'show', 'data-time');
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
        let schema = this.props.schema;
        const options = this.props.options;
        const format = schema.format || 'date-time';
        let value = this.props.value,
            disabled = this.props.disabled,
            onChange = this.props.onChange,
            placeholder = this.props.placeholder;
        let form = '';
        switch (format) {
            case 'date-time':
                if (typeof value !== 'undefined' && value !== '') {
                    form = (
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder={placeholder}
                            disabled={disabled}
                            value={moment(value, 'YYYY-MM-DD HH:mm:ss')}
                            getCalendarContainer={popupContainer}
                            onChange={(date, dateString) => {
                                onChange(dateString);
                            }}
                            {...options}
                        />
                    );
                } else {
                    form = (
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder={placeholder}
                            disabled={disabled}
                            value={undefined}
                            getCalendarContainer={popupContainer}
                            onChange={(date, dateString) => {
                                onChange(dateString);
                            }}
                            {...options}
                        />
                    );
                }
                break;
            default:
            //什么都不做
                form = '';
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
                'xform-custom-datetimepicker': true,
                'has-error': _errorType !== ''
            })}>
                {form}
                <div className="ant-form-explain">{validateMessage}</div>
            </div>
        );

    }
}
