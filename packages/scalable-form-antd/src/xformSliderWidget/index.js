/**
 * xform基础widget => slider滑动输入条
 */

import React, {PureComponent} from 'react';
import {Slider} from 'antd';
import classnames from 'classnames';

export default class CustomSlider extends PureComponent {

    constructor(props) {
        super(props);
        this.handleSliderChange = this.handleSliderChange.bind(this);
    }

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'slider');
    }

    handleSliderChange(value) {
        const {onChange} = this.props;
        onChange(value);
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
        const {id, disabled, readonly, options, autofocus, value} = this.props;

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
                'xform-custom-slider': true,
                'has-error': _errorType !== ''
            })}>
                <Slider
                    id={id}
                    range={false}
                    autoFocus={autofocus}
                    disabled={disabled}
                    readOnly={readonly}
                    value={value}
                    onChange={this.handleSliderChange}
                    onAfterChange={this.handleSliderChange}
                    {...options}
                />
                <div className="ant-form-explain">{validateMessage}</div>
            </div>
        );
    }
}
