/**
 * xform基础widget => sliderRange滑动区域输入条
 */

import React, {PureComponent} from 'react';
import {Range, List} from 'antd-mobile';
import classnames from 'classnames';

import './index.less';

const ListItem = List.Item;

export default class CustomSliderRange extends PureComponent {

    constructor(props) {
        super(props);
        this.handleSliderChange = this.handleSliderChange.bind(this);
    }

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'sliderRange');
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
        const {id, disabled, readonly, options, schema, required} = this.props;
        let {value} = this.props;

        if (typeof value === 'undefined' || value === '') {
            value = [];
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
                'xform-custom-slider-range': true,
                'has-error': _errorType !== '',
                disabled
            })}>
                <ListItem
                    wrap
                    multipleLine
                    error={_errorType !== ''}
                    extra={value.join(',')}
                ><label className={classnames({
                    required: required
                })}>{schema.title}</label></ListItem>
                <div className="xform-slider-range-wrapper">
                    <Range
                        id={id}
                        disabled={disabled}
                        readOnly={readonly}
                        value={value}
                        onChange={this.handleSliderChange}
                        onAfterChange={this.handleSliderChange}
                        {...options}
                    />
                </div>
                <div className="ant-form-explain">{validateMessage}</div>
            </div>
        );
    }
}
