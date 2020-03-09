/**
 * xform基础widget => 日期范围选择器
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {DatePicker, List} from 'antd-mobile';
import classnames from 'classnames';
import moment from 'moment';

import './index.less';
import {getMessageId} from '../i18n/localeMessages';
import utils from '../util';

const ListItem = List.Item;
const DATE_FORMAT = 'YYYY-MM-DD';

export default class CustomDateRangePickerWidget extends PureComponent {

    componentDidMount() {
        window.setTimeout(() => {
            this.updateInitRange();
        }, 0);
        const logger = this.props.formContext.logger;
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
        const {options, schema, required, value, disabled, onChange} = this.props;
        const messages = this.props.formContext && this.props.formContext.messages;
        const placeholder = [messages[getMessageId('xformDefaultStartDatePlaceholder')], messages[getMessageId('xformDefaultEndDatePlaceholder')]];

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

        let form = '', startDate, endDate, defaultStartDate, defaultEndDate;
        if (typeof value === 'object' && value.length > 0) {
            startDate = typeof value[0] !== 'undefined' ? moment(value[0], DATE_FORMAT).toDate() : undefined;
            endDate = typeof value[1] !== 'undefined' ? moment(value[1], DATE_FORMAT).toDate() : undefined;
            if (typeof defaultRange === 'object' && defaultRange.length > 0) {
                defaultStartDate = typeof defaultRange[0] !== 'undefined' ? defaultRange[0].toDate() : undefined;
                defaultEndDate = typeof defaultRange[1] !== 'undefined' ? defaultRange[1].toDate() : undefined;
            }
            form = (
                <div className="date-range-picker-wrapper">
                    <DatePicker
                        mode="date"
                        format={DATE_FORMAT}
                        value={startDate}
                        defaultValue={defaultStartDate}
                        disabled={disabled}
                        onChange={(dateValue) => {
                            let rangeValue = value.slice();
                            rangeValue[0] = utils.formatDate(dateValue, 'yyyy-MM-dd');
                            onChange(rangeValue);
                        }}
                        extra={placeholder[0]}
                        {...options}
                    >
                        <ListItem arrow="horizontal" wrap multipleLine>
                            <label className={classnames({
                                required: required
                            })}>{schema.title}</label>
                        </ListItem>
                    </DatePicker>
                    <DatePicker
                        mode="date"
                        format={DATE_FORMAT}
                        value={endDate}
                        defaultValue={defaultEndDate}
                        disabled={disabled}
                        onChange={(dateValue) => {
                            let rangeValue = value.slice();
                            rangeValue[1] = utils.formatDate(dateValue, 'yyyy-MM-dd');
                            onChange(rangeValue);
                        }}
                        extra={placeholder[1]}
                        {...options}
                    >
                        <ListItem arrow="horizontal" wrap multipleLine>
                            <label className={classnames({
                                required: required
                            })}>{schema.title}</label>
                        </ListItem>
                    </DatePicker>
                </div>
            );
        } else {
            form = (
                <div className="date-range-picker-wrapper">
                    <DatePicker
                        mode="date"
                        format={DATE_FORMAT}
                        defaultValue={defaultStartDate}
                        disabled={disabled}
                        onChange={(dateValue) => {
                            let rangeValue = value.slice();
                            rangeValue[0] = utils.formatDate(dateValue, 'yyyy-MM-dd');
                            onChange(rangeValue);
                        }}
                        extra={placeholder[0]}
                        {...options}
                    >
                        <ListItem arrow="horizontal" wrap multipleLine>
                            <label className={classnames({
                                required: required
                            })}>{schema.title}</label>
                        </ListItem>
                    </DatePicker>
                    <DatePicker
                        mode="date"
                        format={DATE_FORMAT}
                        defaultValue={defaultEndDate}
                        disabled={disabled}
                        onChange={(dateValue) => {
                            let rangeValue = value.slice();
                            rangeValue[1] = utils.formatDate(dateValue, 'yyyy-MM-dd');
                            onChange(rangeValue);
                        }}
                        extra={placeholder[1]}
                        {...options}
                    >
                        <ListItem arrow="horizontal" wrap multipleLine>
                            <label className={classnames({
                                required: required
                            })}>{schema.title}</label>
                        </ListItem>
                    </DatePicker>
                </div>
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
                'xform-custom-widget': true,
                'xform-custom-daterangepicker': true,
                'xform-item-has-error': _errorType !== '',
                disabled
            })}>
                {form}
                <div className="xform-item-error-explain">{validateMessage}</div>
            </div>
        );
    }
}
