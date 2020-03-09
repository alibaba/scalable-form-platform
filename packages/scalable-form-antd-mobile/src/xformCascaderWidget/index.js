/**
 * xform基础widget => cascader级联选择组件
 */

import React, {PureComponent} from 'react';
import {Picker, List} from 'antd-mobile';
import classnames from 'classnames';

import './index.less';

const ListItem = List.Item;

export default class CustomCascader extends PureComponent {

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'cascader');
    }

    _getTreeDepth(tree) {
        let depths = [];
        if (tree && tree.children && tree.children.length > 0) {
            depths = tree.children.map((treeNode) => {
                return this._getTreeDepth(treeNode);
            });
            return Math.max(...depths) + 1;
        } else {
            return 1;
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
        const {required, options, value, disabled, placeholder, onChange, schema} = this.props;

        let enumOptions = [];
        if (typeof schema.data !== 'undefined' && schema.data.length >= 0) {
            enumOptions = schema.data;
        }

        const treeDepths = enumOptions.map((enumItem) => {
            return this._getTreeDepth(enumItem);
        });
        const colNumber = Math.max(...treeDepths);

        //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过
        let validateMessage = '';
        let _errorType = options._errorType || '';
        if (_errorType !== '' && typeof options.validate !== 'undefined') {
            validateMessage = this._getValidateMessage(_errorType, options.validate);
        }

        return (
            <div className={classnames({
                'xform-custom-widget': true,
                'xform-custom-cascader-select': true,
                'xform-item-has-error': _errorType !== '',
                disabled
            })}>
                <Picker
                    data={enumOptions}
                    cols={colNumber}
                    value={value}
                    disabled={disabled}
                    onChange={(value) => {
                        onChange(value);
                    }}
                    extra={placeholder}
                    {...options}
                >
                    <ListItem arrow="horizontal" wrap multipleLine>
                        <label className={classnames({
                            required: required
                        })}>{schema.title}</label>
                    </ListItem>
                </Picker>
                <div className="xform-item-error-explain">{validateMessage}</div>
            </div>
        );
    }
}
