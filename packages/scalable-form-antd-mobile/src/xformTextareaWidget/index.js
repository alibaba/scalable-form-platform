/**
 * xform基础widget => textarea类型
 */

import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {TextareaItem} from 'antd-mobile';
import classnames from 'classnames';

import './index.less';


export default class CustomTextareaWidget extends PureComponent {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.textarea = null;
    }

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'textarea');
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

    handleChange(value) {
        this.props.onChange(value);
    }

    handleFocus = () => {
        const inputElement = ReactDOM.findDOMNode(this.textArea);
        if (inputElement && inputElement.click) {
            inputElement.click();
        }
        if (inputElement && inputElement.scrollIntoView) {
            inputElement.scrollIntoView();
        }
    };

    //过滤掉react-json-schema中注入option中的属性，防止这部分属性添加到组件上
    _filterSystemOptions(options) {
        const BLACK_LIST = ['enumOptions', 'disabled', 'readonly', 'help'];
        BLACK_LIST.map((name) => {
            if (options.hasOwnProperty(name)) {
                delete options[name];
            }
        });
        return options;
    }

    render() {
        const {schema, options, label, readonly, disabled, required, placeholder, value} = this.props;
        //解析schema中的约定maxlength
        const maxLength = schema.maxLength;

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
                'xform-custom-widget': true,
                'xform-custom-textarea': true,
                'xform-item-has-error': _errorType !== ''
            })}>
                <TextareaItem
                    ref={(textarea) => {
                        this.textarea = textarea;
                    }}
                    title={(<label className={classnames({
                        required: required
                    })}>{label}</label>)}
                    placeholder={placeholder}
                    value={value}
                    editable={!readonly}
                    disabled={disabled}
                    count={maxLength}
                    autoHeight
                    clear
                    error={_errorType !== ''}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    {...otherOptions}
                />
                <div className="xform-item-error-explain">{validateMessage}</div>
            </div>
        );
    }
}
