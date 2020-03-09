/**
 * xform基础widget => 带suggest功能的select选择器组件
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {AutoComplete} from 'antd';
import classnames from 'classnames';

const Option = AutoComplete.Option;

export default class CustomSuggestSelect extends Component {

    constructor(props) {
        super(props);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleKeywordChange = this.handleKeywordChange.bind(this);
        this.timer = null;
        this.state = {
            value: props.value
        };
    }

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'suggest-select');
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({
                value: nextProps.value
            });
        }
    }

    handleSelectChange(value) {
        const {onChange} = this.props;
        this.setState({
            value
        });
        onChange(value);
    }

    handleKeywordChange(fieldCode, value) {
        const {schema, onChange} = this.props;
        const getFieldDataFromDataSource = this.props.formContext && this.props.formContext.getFieldDataFromDataSource;
        if (this.timer !== null) {
            window.clearTimeout(this.timer);
            this.timer = window.setTimeout(() => {
                if (typeof getFieldDataFromDataSource === 'function') {
                    // 注意这里必须先调用onChange属性之后才能再去触发数据源更新，否则value的值不会更新
                    onChange(value);
                    getFieldDataFromDataSource(fieldCode, schema, {
                        suggestKeyword: value
                    }, false, true);
                }
            }, 200);
        } else {
            this.timer = window.setTimeout(() => {
                if (typeof getFieldDataFromDataSource === 'function') {
                    onChange(value);
                    getFieldDataFromDataSource(fieldCode, schema, {
                        suggestKeyword: value
                    }, false, true);
                }
            }, 200);
        }
        this.setState({
            value
        });
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
        const {schema, id, options, disabled, readonly, autofocus, placeholder} = this.props;

        // 对于value值为空字符串的情况，value的值传入undefined，这样才能显示组件的placeholder
        let {value} = this.state;
        if (value === '') {
            value = undefined;
        }
        // enumOptions会由react-jsonschema-form注入到组件的options中 https://github.com/mozilla-services/react-jsonschema-form#custom-widget-components note
        let enumOptions = options.enumOptions || [];
        if (typeof schema.data !== 'undefined' && schema.data.length >= 0) {
            enumOptions = schema.data;
        }

        // 这个idPrefix决定所有字段的id的前缀，与react-jsonschema-form组件中的idPrefix属性相同https://github.com/mozilla-services/react-jsonschema-form#id-prefix
        const idPrefix = 'root';
        const fieldCode = id.slice(idPrefix.length + 1);

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
                'xform-custom-suggest-select': true,
                'has-error': _errorType !== ''
            })}>
                <AutoComplete
                    defaultActiveFirstOption={false}
                    filterOption={false}
                    value={value}
                    disabled={disabled}
                    readonly={readonly}
                    onSearch={(value) => {
                        this.handleKeywordChange(fieldCode, value);
                    }}
                    onSelect={this.handleSelectChange}
                    autoFocus={autofocus}
                    placeholder={placeholder}
                    getPopupContainer={popupContainer}
                    {...options}
                >
                    {enumOptions.map((enums) => {
                        return <Option key={enums.value} value={enums.value}>{enums.label}</Option>
                    })}
                </AutoComplete>
                <div className="ant-form-explain">{validateMessage}</div>
            </div>
        );
    }
}
