/**
 * xform基础widget => 树型选择器组件
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {List} from 'antd-mobile';
import classnames from 'classnames';

import TreeSelect from '../components/treeSelector';
import Cascader from '../components/cascader';
import utils from '../util';

import './index.less';

const ListItem = List.Item;

export default class CustomTreeSelect extends Component {
    static propTypes = {
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        required: PropTypes.bool,
        onChange: PropTypes.func
    };

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'tree');
    }

    // 获取级联深度（这里只考虑最多三级）
    getTreeDeep(data) {
        let maxDeep = 0;
        let child = false;
        let childItems = [];
        if (data.length > 0) {
            maxDeep = 1;
            data.map((item) => {
                if (item.children && item.children.length > 0) {
                    child = true;
                    childItems.push(item.children);
                }
            });
            if (child) {
                maxDeep = 2;
                child = false;
                childItems.map((childItem) => {
                    childItem.map((item) => {
                        if (item.children && item.children.length > 0) {
                            child = true;
                        }
                    });
                });
                if (child) {
                    maxDeep = 3;
                }
            }
        }
        return maxDeep;
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
        let { ...options} = this.props.options;
        let schema = this.props.schema;
        let data = schema.data || [];
        let label = this.props.label,
            value = this.props.value,
            required = this.props.required,
            disabled = this.props.disabled,
            readonly = this.props.readonly,
            placeholder = this.props.placeholder,
            onChange = this.props.onChange;

        const treeDeep = this.getTreeDeep(data);

        //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过
        let validateMessage = '';
        let _errorType = options._errorType || '';
        if (_errorType !== '' && typeof options.validate !== 'undefined') {
            validateMessage = this._getValidateMessage(_errorType, options.validate);
        }

        // 构造treeData
        let treeData = {
            value: utils.getTreeRootValue(),
            label: '',
            children: data.map((item) => {
                item.parent = utils.getTreeRootValue();
                return item;
            })
        };

        // 根据不同的树的深度来决定采用哪种渲染模式
        if (treeDeep <= 2) {
            return (
                <div className={classnames({
                    'xform-custom-widget': true,
                    'xform-custom-cascader': true,
                    'xform-item-has-error': _errorType !== '',
                    disabled
                })}>
                    <Cascader
                        tree={treeData}
                        deep={treeDeep}
                        value={value}
                        disabled={disabled}
                        onChange={onChange}
                        placeholder={placeholder}
                        {...options}
                    >
                        <ListItem arrow="horizontal" wrap multipleLine>
                            <label className={classnames({
                                required: required
                            })}>{label}</label>
                        </ListItem>
                    </Cascader>
                    <div className="xform-item-error-explain">{validateMessage}</div>
                </div>
            );
        } else {

            return (
                <div className={classnames({
                    'xform-custom-widget': true,
                    'xform-custom-tree-select': true,
                    'xform-item-has-error': _errorType !== '',
                    disabled
                })}>
                    <ListItem
                        arrow="horizontal"
                        wrap
                        multipleLine
                        extra={(
                            <TreeSelect
                                className="xform-custom-tree-select"
                                tree={treeData}
                                value={value}
                                disabled={disabled}
                                editable={!readonly}
                                placeholder={placeholder}
                                onChange={(value) => {
                                    onChange(value);
                                }}
                            />
                        )}
                        error={_errorType !== ''}
                    ><label className={classnames({
                        required: required
                    })}>{label}</label></ListItem>
                    <div className="xform-item-error-explain">{validateMessage}</div>
                </div>
            );
        }
    }
}
