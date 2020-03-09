/**
 * xform基础widget => switch开关组件
 */

import React, {PureComponent} from 'react';
import {Switch} from 'antd';
import classnames from 'classnames';

export default class CustomSwitch extends PureComponent {

    constructor(props) {
        super(props);
        this.handleSwitchChange = this.handleSwitchChange.bind(this);
    }

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'switch');
    }

    handleSwitchChange(checked) {
        const {onChange} = this.props;
        onChange(checked);
    }

    //过滤掉react-json-schema中注入option中的属性，防止这部分属性添加到组件上
    _filterSystemOptions(options) {
        const BLACK_LIST = ['enumOptions', 'disabled', 'readonly', 'help', 'emptyValue'];
        BLACK_LIST.map((name) => {
            if (options.hasOwnProperty(name)) {
                delete options[name];
            }
        });
        return options;
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
        const {id, disabled, readonly, value, options, autofocus} = this.props;
        let {_errorType, validate, ...otherOptions} = options;
        otherOptions = this._filterSystemOptions(otherOptions);

        //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过
        let validateMessage = '';
        _errorType = _errorType || '';
        if (_errorType !== '' && typeof validate !== 'undefined') {
            validateMessage = this._getValidateMessage(_errorType, validate);
        }

        return (
            <div className={classnames({
                'ant-form-item-control': true,
                'xform-custom-widget': true,
                'xform-custom-switch': true,
                'has-error': _errorType !== ''
            })}>
                <Switch
                    id={id}
                    autoFocus={autofocus}
                    disabled={disabled}
                    readOnly={readonly}
                    checked={value}
                    onChange={this.handleSwitchChange}
                    {...otherOptions}
                />
                <div className="ant-form-explain">{validateMessage}</div>
            </div>
        );
    }
}
