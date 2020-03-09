/**
 * xform基础widget => 普通文本框类型
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input} from 'antd';
import classnames from 'classnames';

let onComposition = false;

// cited from: https://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome
const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

export default class CustomInputWidget extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleComposition = this.handleComposition.bind(this);
        this._handleFieldValueChange = this._handleFieldValueChange.bind(this);
        this.timer = null;
        this.value = props.value;
        this.state = {
            value: props.value
        };
    }

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'input');
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.value = nextProps.value;
            this.setState({
                value: nextProps.value
            });
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

    handleChange(event) {
        const value = event.currentTarget.value;
        this.value = value;
        this.setState({
            value
        });
        if (!onComposition) {
            if (this.timer !== null) {
                window.clearTimeout(this.timer);
                this.timer = window.setTimeout(() => {
                    this._handleFieldValueChange(this.value);
                }, 100);
            } else {
                this.timer = window.setTimeout(() => {
                    this._handleFieldValueChange(this.value);
                }, 100);
            }
        }
    }

    handleComposition  = (event) => {
        const value = event.currentTarget.value;
        if (event.type === 'compositionend') {
            console.log('compositionend triggered!');
            onComposition = false;
            // fixed for Chrome v53+ and detect all Chrome
            // https://chromium.googlesource.com/chromium/src/
            // +/afce9d93e76f2ff81baaa088a4ea25f67d1a76b3%5E%21/
            if (event.target instanceof HTMLInputElement && isChrome) {
                // fire onChange
                this._handleFieldValueChange(value);
            }
        } else {
            onComposition = true;
        }
    }

    _handleFieldValueChange(value) {
        const {onChange} = this.props;
        this.setState({
            value
        }, () => {
            onChange(value);
        });
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

    render() {
        let schema = this.props.schema;
        let options = this.props.options;
        let readonly = this.props.readonly,
            autofocus = this.props.autofocus,
            disabled = this.props.disabled,
            placeholder = this.props.placeholder,
            value = this.state.value;
        //解析schema中的约定maxlength
        const maxLength = schema.maxLength;
        const minLength = schema.minLength;
        //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过
        let validateMessage = '';
        let {_errorType, validate, ...otherOptions} = options;
        otherOptions = this._filterSystemOptions(otherOptions);
        _errorType = _errorType || '';

        if (_errorType !== '' && typeof validate !== 'undefined') {
            validateMessage = this._getValidateMessage(_errorType, validate);
        }

        return (
            <div className={classnames({
                'ant-form-item-control': true,
                'xform-custom-widget': true,
                'xform-custom-input': true,
                'has-error': _errorType !== ''
            })}>
                <Input
                    type="text"
                    maxLength={maxLength || Infinity}
                    minLength={minLength || 0}
                    placeholder={placeholder}
                    value={value}
                    readOnly={readonly}
                    disabled={disabled}
                    autoFocus={autofocus}
                    onChange={this.handleChange}
                    onCompositionStart={this.handleComposition}
                    onCompositionUpdate={this.handleComposition}
                    onCompositionEnd={this.handleComposition}
                    {...otherOptions}
                />
                <div className="ant-form-explain">{validateMessage}</div>
            </div>
        );
    }
}
