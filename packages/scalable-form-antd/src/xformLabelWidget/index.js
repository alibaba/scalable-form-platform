/**
 * xform基础widget => 普通label类型组件
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class CustomLabelWidget extends Component {

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'label');
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
        const value = this.props.value;
        const options = this.props.options;

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
                'xform-custom-label': true,
                'has-error': _errorType !== ''
            })}>
                <div {...otherOptions} dangerouslySetInnerHTML={{__html: value}} />
                <div className="ant-form-explain">{validateMessage}</div>
            </div>
        );
    }
}
