/**
 * xform基础widget => 评分组件
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {Rate} from 'antd';

export default class CustomRate extends PureComponent {

    constructor(props) {
        super(props);
        this.handleRateNumberChange = this.handleRateNumberChange.bind(this);
        this.handleRateHoverChange = this.handleRateHoverChange.bind(this);
        this.getRateNumberFromValue = this.getRateNumberFromValue.bind(this);
        this.getRateLabelFromValue = this.getRateLabelFromValue.bind(this);
        this.getEnumOptions = this.getEnumOptions.bind(this);
        this.state = {
            currentRateLabel: this.getRateLabelFromValue(props.value)
        };
    }

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'rate');
    }

    handleRateHoverChange(number) {
        if (!number) {
            return;
        }
        const enumOptions = this.getEnumOptions();
        const currentEnumItem = enumOptions[number - 1];
        this.setState({
            currentRateLabel: currentEnumItem.label
        });
    }

    handleRateNumberChange(number) {
        const {onChange} = this.props;
        const enumOptions = this.getEnumOptions();
        const currentEnumItem = enumOptions[number - 1];
        this.setState({
            currentRateLabel: currentEnumItem.label
        });
        onChange(currentEnumItem.value);
    }

    getRateLabelFromValue(value) {
        const enumOptions = this.getEnumOptions();
        let result = '';
        enumOptions.map((enums) => {
            if (enums.value === value) {
                result = enums.label;
            }
        });
        return result;
    }

    getRateNumberFromValue(value) {
        const enumOptions = this.getEnumOptions();
        let result = '';
        enumOptions.map((enums, number) => {
            if (enums.value === value) {
                result = number + 1;
            }
        });
        return result;
    }

    getEnumOptions() {
        const {schema, options} = this.props;
        let enumOptions = options.enumOptions || [];
        if (typeof schema.data !== 'undefined' && schema.data.length >= 0) {
            enumOptions = schema.data;
        }
        return enumOptions;
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
        const {schema, options, value, disabled, readonly} = this.props;
        const {currentRateLabel} = this.state;
        let enumOptions = options.enumOptions || [];
        if (typeof schema.data !== 'undefined' && schema.data.length >= 0) {
            enumOptions = schema.data;
        }

        //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过
        let validateMessage = '';
        const _errorType = options._errorType || '';
        if (_errorType !== '' && typeof options.validate !== 'undefined') {
            validateMessage = this._getValidateMessage(_errorType, options.validate);
        }

        return (
            <div className={classnames({
                'ant-form-item-control': true,
                'xform-custom-widget': true,
                'xform-custom-rate': true,
                'has-error': _errorType !== ''
            })}>
                <div>
                    <Rate
                        count={enumOptions.length}
                        disabled={disabled}
                        readOnly={readonly}
                        value={this.getRateNumberFromValue(value)}
                        onHoverChange={this.handleRateHoverChange}
                        onChange={this.handleRateNumberChange}
                    />
                    <span>{currentRateLabel}</span>
                </div>
                <div className="ant-form-explain">{validateMessage}</div>
            </div>
        );

    }
}
