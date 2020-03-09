/**
 * xform基础widget => 普通label类型组件
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {List} from 'antd-mobile';
import classnames from 'classnames';

import './index.less';

const ListItem = List.Item;

export default class CustomLabelWidget extends PureComponent {

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
        const BLACK_LIST = ['enumOptions', 'disabled', 'readonly', 'help'];
        BLACK_LIST.map((name) => {
            if (options.hasOwnProperty(name)) {
                delete options[name];
            }
        });
        return options;
    }

    render() {
        const {options, label, value, disabled} = this.props;

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
                'xform-custom-label': true,
                'xform-item-has-error': _errorType !== '',
                disabled
            })}>
                <ListItem
                    wrap
                    multipleLine
                    extra={value}
                    {...otherOptions}
                >{label}</ListItem>
                <div className="xform-item-error-explain">{validateMessage}</div>
            </div>
        );
    }
}
