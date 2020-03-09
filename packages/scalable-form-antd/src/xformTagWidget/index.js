/**
 * xform基础widget => 标签组件(tag组件类型的label和value永远是一致的)
 * @states: tags（标签渲染所需数据，数据格式为{label: 'tag-name'， value: 'tag-name', removable: false}） inputVisible（编辑模式下编辑的input框是否可见） inputValue（编辑模式下编辑的input框的值）
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Tag, Input, Tooltip, Button} from 'antd';
import {If, Then, Else} from 'react-if';

export default class CustomTagWidget extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.showInput = this.showInput.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputConfirm = this.handleInputConfirm.bind(this);
        this.state = {
            tags: [],
            inputVisible: false,
            inputValue: ''
        };
    }

    componentDidMount() {
        const schema = this.props.schema;
        const values = this.props.value;
        if (typeof schema.data !== 'undefined') {
            let tags = schema.data;
            this.setState({
                tags
            });
        } else {
            // 如果没有数据源，则通过value来还原tags
            let tags = [];
            values.map((value) => {
                tags.push({
                    label: value,
                    value,
                    removable: true
                });
            });
            this.setState({
                tags
            });
        }
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'tag');
    }

    handleClose(removedTag) {
        const onChange = this.props.onChange;
        const tags = this.state.tags.filter((tag) => {
            return tag.value !== removedTag.value;
        });
        let values = [];
        tags.map((tag) => {
            values.push(tag.value);
        });
        this.setState({
            tags
        });
        onChange(values);
    }

    showInput() {
        this.setState({
            inputVisible: true
        }, () => {
            // 兼容测试文件无法找到focus函数
            this.refs.tagInput.focus ? this.refs.tagInput.focus() : function() {}
        });
    }

    handleInputChange(e) {
        this.setState({
            inputValue: e.target.value
        });
    }

    handleInputConfirm() {
        const state = this.state;
        const inputValue = state.inputValue;
        const onChange = this.props.onChange;
        let tags = state.tags;
        let values = [];
        tags.map((tag) => {
            values.push(tag.value);
        });
        if (inputValue && values.indexOf(inputValue) === -1) {
            tags = [...tags, {
                label: inputValue,
                value: inputValue,
                removable: true
            }];
            values = [...values, inputValue];
        }
        this.setState({
            tags,
            inputVisible: false,
            inputValue: ''
        });
        onChange(values);
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
        const options = this.props.options;
        const tagEditable = options.addTag || false;
        const { tags, inputVisible, inputValue } = this.state;
        const disabled = this.props.disabled;
        const readonly = this.props.readonly;

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
                'xform-custom-tag': true,
                'has-error': _errorType !== ''
            })}>
                <If condition={tagEditable && !disabled && !readonly}>
                    <Then>
                        <div>
                            {tags.map((tag, index) => {
                                const value = tag.value;
                                const closable = tag.removable;
                                const isLongTag = value.length > 20;
                                const tagElem = (
                                    <Tag
                                        key={index}
                                        closable={closable}
                                        afterClose={() => this.handleClose(tag)}
                                    >
                                        {isLongTag ? value.slice(0, 20) + '...' : value}
                                    </Tag>
                                );
                                return isLongTag ? <Tooltip title={value}>{tagElem}</Tooltip> : tagElem;
                            })}
                            {inputVisible && (
                                <Input
                                    style={{
                                        width: 100
                                    }}
                                    ref="tagInput"
                                    type="text"
                                    size="small"
                                    value={inputValue}
                                    onChange={this.handleInputChange}
                                    onBlur={this.handleInputConfirm}
                                    onPressEnter={this.handleInputConfirm}
                                />
                            )}
                            {!inputVisible && (
                                <Button size="small" type="dashed" onClick={this.showInput}>添加标签</Button>
                            )}
                        </div>
                    </Then>
                    <Else>{() => {
                        return (
                            <div>
                                {tags.map((tag, index) => {
                                    const value = tag.value;
                                    // 只读或禁用模式下都不能删除
                                    const closable = false;
                                    const isLongTag = value.length > 20;
                                    const tagElem = (
                                        <Tag
                                            key={index}
                                            closable={closable}
                                            afterClose={() => this.handleClose(tag)}
                                        >
                                            {isLongTag ? value.slice(0, 20) + '...' : value}
                                        </Tag>
                                    );
                                    return isLongTag ? <Tooltip title={value}>{tagElem}</Tooltip> : tagElem;
                                })}
                            </div>
                        );
                    }}</Else>
                </If>
                <div className="ant-form-explain">{validateMessage}</div>
            </div>
        );
    }

}
