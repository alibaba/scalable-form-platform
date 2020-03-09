/**
 * xform基础widget => 树型选择器组件
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TreeSelect} from 'antd';
import classnames from 'classnames';

export default class CustomTreeSelect extends Component {
    static propTypes = {
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        required: PropTypes.bool,
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.handleFilterTreeNode = this.handleFilterTreeNode.bind(this);
    }

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'tree');
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

    _setTreeNodeSelectable(rootNode) {
        if (typeof rootNode.children !== 'undefined' && rootNode.children !== null && rootNode.children.length > 0) {
            rootNode.selectable = false;
            rootNode.children.map((childNode) => {
                this._setTreeNodeSelectable(childNode);
            });
        } else {
            rootNode.selectable = true;
        }
    }

    handleFilterTreeNode(keyword, treeNode) {
        // 是否只能选择叶子节点项
        let { ...options} = this.props.options;
        let selectLeafOnly = false;
        if (typeof options.selectLeafOnly === 'boolean') {
            selectLeafOnly = options.selectLeafOnly;
        }
        const {title, selectable} = treeNode.props;
        if (selectLeafOnly) {
            return selectable && title.indexOf(keyword) > -1;
        } else {
            return title.indexOf(keyword) > -1;
        }
    }

    // 兼容antd的treeData数据格式
    formatTreeData(data) {
        data.map((treeNode) => {
            treeNode.title = treeNode.label;
            if (treeNode.children && treeNode.children.length > 0) {
                this.formatTreeData(treeNode.children);
            }
        });
    }


    render() {
        const popupContainer = this.props.formContext && this.props.formContext.popupContainer;
        const {required, schema, options, disabled, readonly, placeholder, onChange} = this.props;

        // 兼容没有配置数据源的情形
        let data = schema.data || [];

        // 对于value值为空字符串的情况，value的值传入undefined，这样才能显示组件的placeholder
        let {value} = this.props;
        if (value === '') {
            value = undefined;
        }

        // 是否只能选择叶子节点项
        let selectLeafOnly = false;
        if (typeof options.selectLeafOnly === 'boolean') {
            selectLeafOnly = options.selectLeafOnly;
        }

        if (selectLeafOnly && (data && data.length > 0)) {
            // 为treeData添加selectable属性
            data.map((node) => {
                this._setTreeNodeSelectable(node);
            });
        }

        // 对treeData做格式化处理
        this.formatTreeData(data);

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
                'xform-custom-tree-select': true,
                'has-error': _errorType !== ''
            })}>
                <TreeSelect
                    showSearch
                    allowClear
                    value={value}
                    treeData={data}
                    disabled={disabled}
                    readonly={readonly}
                    required={required}
                    filterTreeNode={this.handleFilterTreeNode}
                    getPopupContainer={popupContainer}
                    onChange={(value) => {
                        onChange(value);
                    }}
                    placeholder={placeholder}
                    {...options}
                />
                <div className="ant-form-explain">{validateMessage}</div>
            </div>
        );
    }
}
