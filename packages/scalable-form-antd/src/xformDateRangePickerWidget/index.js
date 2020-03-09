/**
 * xform基础widget => DateRangePicker日期区间选择类型
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DatePicker} from 'antd';
import moment from 'moment';
import classnames from 'classnames';

import './index.less';
import {getMessageId} from '../i18n/localeMessages';

const {RangePicker} = DatePicker;
const DATE_FORMAT = 'YYYY-MM-DD';

export default class CustomDateRangePickerWidget extends Component {

    componentDidMount() {
        window.setTimeout(() => {
            this.updateInitRange();
        }, 0);
        const formContext = this.props.formContext || {};
        const logger = formContext.logger || {};
        logger.logEvent('widget', 'show', 'date-range');
    }

    updateInitRange = () => {
        const { options, onChange } = this.props;
        const { initRange } = options;
        let defaultRange, needInitChange = true;
        switch (initRange) {
            case 'beforeweek':
                defaultRange = [moment().subtract(7, 'days'), moment()];
                break;
            case 'beforemonth':
                defaultRange = [moment().subtract(1, 'months'), moment()];
                break;
            case 'beforeyear':
                defaultRange = [moment().subtract(1, 'years'), moment()];
                break;
            case 'afterweek':
                defaultRange = [moment(), moment().add(7, 'days')];
                break;
            case 'aftermonth':
                defaultRange = [moment(), moment().add(1, 'months')];
                break;
            case 'afteryear':
                defaultRange = [moment(), moment().add(1, 'years')];
                break;
            default:
                needInitChange = false;
        }
        if (needInitChange) {
            const dateString = [defaultRange[0].format(DATE_FORMAT), defaultRange[1].format(DATE_FORMAT)];
            onChange(dateString);
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
        const options = this.props.options;
        let value = this.props.value,
            disabled = this.props.disabled,
            onChange = this.props.onChange,
            placeholder = this.props.placeholder || [messages[getMessageId('xformDefaultStartDatePlaceholder')], messages[getMessageId('xformDefaultEndDatePlaceholder')]];

        const { initRange } = options;
        let defaultRange;
        switch (initRange) {
            case 'beforeweek':
                defaultRange = [moment().subtract(7, 'days'), moment()];
                break;
            case 'beforemonth':
                defaultRange = [moment().subtract(1, 'months'), moment()];
                break;
            case 'beforeyear':
                defaultRange = [moment().subtract(1, 'years'), moment()];
                break;
            case 'afterweek':
                defaultRange = [moment(), moment().add(7, 'days')];
                break;
            case 'aftermonth':
                defaultRange = [moment(), moment().add(1, 'months')];
                break;
            case 'afteryear':
                defaultRange = [moment(), moment().add(1, 'years')];
                break;
        }

        let form = '';
        // ant组件的数据结构，点击clear时返回value = ['', '']
        if (typeof value === 'object' && value.length === 2 && (value[0] !== '' && value[1] !== '')) {
            form = (
                <RangePicker
                    placeholder={placeholder}
                    disabled={disabled}
                    defaultValue={defaultRange}
                    format={DATE_FORMAT}
                    value={[moment(value[0], DATE_FORMAT), moment(value[1], DATE_FORMAT)]}
                    getCalendarContainer={popupContainer}
                    onChange={(date, dateString) => {
                        onChange(dateString);
                    }}
                    {...options}
                />
            );
        } else {
            form = (
                <RangePicker
                    placeholder={placeholder}
                    disabled={disabled}
                    defaultValue={defaultRange}
                    format={DATE_FORMAT}
                    getCalendarContainer={popupContainer}
                    onChange={(date, dateString) => {
                        onChange(dateString);
                    }}
                    {...options}
                />
            );
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
                'xform-custom-daterangepicker': true,
                'has-error': _errorType !== ''
            })}>
                {form}
                <div className="ant-form-explain">{validateMessage}</div>
            </div>
        );

    }
}
