/**
 * xform基础widget => cascader级联选择组件
 */

import React, {PureComponent} from 'react';
import {Cascader} from 'antd';
import classnames from 'classnames';

export default class CustomCascader extends PureComponent {

    constructor(props) {
        super(props);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    componentDidMount() {
        const formContext = this.props.formContext || {};
        const logger = formContext.logger || {};
        logger.logEvent('widget', 'show', 'cascader');
    }

    handleSelectChange(value) {
        const {onChange} = this.props;
        if (value) {
            onChange(value.join(','));
        } else {
            onChange(value);
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

        let {value} = this.props;
        if (typeof value === 'undefined' || value === '') {
            value = [];
        }

        // 对于value值为空数组的情况，value的值传入undefined，这样才能显示组件的placeholder
        if (value && value.length <= 0) {
            value = undefined;
        } else {
            value = value.split(',');
        }

        // 兼容没有配置数据源的情形
        let data = schema.data || [];

        // 对data做格式化处理
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
                'xform-custom-cascader-select': true,
                'has-error': _errorType !== ''
            })}>
                <Cascader
                    id={id}
                    expandTrigger="hover"
                    value={value}
                    options={data}
                    disabled={disabled}
                    readOnly={readonly}
                    onChange={this.handleSelectChange}
                    autoFocus={autofocus}
                    placeholder={placeholder}
                    getPopupContainer={popupContainer}
                    {...options}
                />
                <div className="ant-form-explain">{validateMessage}</div>
            </div>
        );
    }

}
