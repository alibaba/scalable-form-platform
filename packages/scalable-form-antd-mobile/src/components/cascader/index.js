/**
 * 自定义两级级联选择器组件
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Picker} from 'antd-mobile';

import utils from '../../util';

export default class CascaderPicker extends Component {

    constructor(props) {
        super(props);
        this.getItemFromTree = this.getItemFromTree.bind(this);
    }

    getSelectedValueListFromTree(tree = {}, value) {
        let result = [];
        let currentValue = value;
        let item = this.getItemFromTree(tree, currentValue);
        if (item) {
            result.unshift(currentValue);
            while (item.parent !== utils.getTreeRootValue()) {
                currentValue = item.parent;
                item = this.getItemFromTree(tree, currentValue);
                result.unshift(currentValue);
            }
            return result;
        } else {
            return result;
        }
    }

    getItemFromTree = (tree = {}, selectedValue) => {
        if (tree.value === selectedValue) {
            return tree;
        } else {
            const children = tree.children || [];
            if (children && children.length > 0) {
                for (let i = 0; i < children.length; i += 1) {
                    const item = this.getItemFromTree(children[i], selectedValue);
                    if (item) {
                        return item;
                    }
                }
            }
        }
    };

    render() {
        const {tree, children, deep, value, disabled, onChange, placeholder, options} = this.props;
        const cascaderValue = this.getSelectedValueListFromTree(tree, value);
        return (
            <Picker
                data={tree.children}
                cols={deep}
                value={cascaderValue}
                format={(labels) => {
                    return labels[labels.length - 1];
                }}
                disabled={disabled}
                cascade
                onChange={(value) => {
                    onChange(value[value.length - 1]);
                }}
                extra={placeholder}
                {...options}
            >{children}</Picker>
        );
    }
}
