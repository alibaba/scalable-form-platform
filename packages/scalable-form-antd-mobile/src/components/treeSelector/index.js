/**
 * xform基础widget => 树型选择器组件
 */

import React, {PureComponent} from 'react';
import {Tabs} from 'antd-mobile';
import PropTypes from 'prop-types';
import PopPanel from './PopPanel';
import classNames from 'classnames';

import utils from '../../util';
import './index.less';

class TreeSelector extends PureComponent {
    static propTypes = {
        tree: PropTypes.array,
        value: PropTypes.string,
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        editable: PropTypes.bool,
        className: PropTypes.string
    };

    static defaultProps = {
        placeholder: '请选择',
        disabled: false,
        editable: true,
        className: ''
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            showSelect: false,
            selectedValueList: [],
            currentPage: 0,
            selectedLabel: ''
        };
    }

    componentDidMount() {
        const value = this.props.value;
        const item = this.getItemFromTree(this.props.tree, value) || null;
        if (item) {
            const selectedValueList = this.getSelectedValueListFromTree(this.props.tree, value);
            this.setState({
                selectedValueList,
                selectedLabel: item.label,
                currentPage: (selectedValueList.length - 1)
            })
        }
    }

    componentWillReceiveProps = (nextProps) => {
        let shouldUpdateState = false;
        const nextValue = nextProps.value;
        const nextCategoryTree = nextProps.tree || {};
        const nextChildren = nextCategoryTree.children || [];
        const thisCategoryTree = this.props.tree || {};
        const thisChildren = thisCategoryTree.children || [];
        if (nextValue !== this.props.value) {
            shouldUpdateState = true;
        }
        if (nextProps.tree && !this.props.tree) {
            shouldUpdateState = true;
        }
        if (nextChildren.length !== thisChildren.length) {
            shouldUpdateState = true;
        }
        if (shouldUpdateState) {
            const item = this.getItemFromTree(nextProps.tree, nextProps.value) || null;
            if (item) {
                const selectedValueList = this.getSelectedValueListFromTree(nextProps.tree, nextProps.value);
                this.setState({
                    selectedValueList,
                    selectedLabel: item.label,
                    currentPage: (selectedValueList.length - 1)
                })
            }
        }
    };

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

    getRenderDataFromCategoryTree = (tree = {}) => {
        const selectedValueList = this.state.selectedValueList || [];
        if (selectedValueList.length === 0) {
            return [{
                selectedKey: null,
                selectedLabel: null,
                optionList: tree.children
            }];
        }
        const result = [];
        selectedValueList.forEach((selectedValue, index) => {
          const selectedItem = this.getItemFromTree(tree, selectedValue);
          if (selectedItem) {
            const parentItem = this.getItemFromTree(tree, selectedItem.parent);
            result.push({
              selectedKey: selectedValue,
              selectedLabel: selectedItem.label,
              optionList: parentItem.children
            });
            if (selectedItem.children && selectedItem.children.length > 0) {
              if (index === selectedValueList.length - 1) {
                result.push({
                  selectedKey: null,
                  selectedLabel: null,
                  optionList: selectedItem.children
                });
              }
            }
          }
        });
        return result;
    };

    getTabsFromRenderData = (renderDataList = []) => {
        const {placeholder} = this.props;
        return renderDataList.map((renderDataItem) => {
            return {
                title: renderDataItem.selectedLabel || placeholder,
                selectedKey: renderDataItem.selectedKey || placeholder
            }
        })
    };

    handleOptionClicked = (renderDataIndex, optionIndex, option) => {
      let selectedValueList = this.state.selectedValueList || [];
      if (renderDataIndex === selectedValueList.length) {
        selectedValueList = selectedValueList.map((item) => {
          return item;
        });
        selectedValueList.push(option.value);
      }
      if (renderDataIndex < selectedValueList.length) {
        selectedValueList[renderDataIndex] = option.value;
        let result = [];
        selectedValueList.forEach((item, index) => {
          if (index <= renderDataIndex) {
            result.push(item);
          }
        });
        selectedValueList = result;
      }
      this.setState({
        selectedValueList
      });

      if (option.children && option.children.length > 0) {
        setTimeout(() => {
          this.setState({
            currentPage: (renderDataIndex + 1)
          });
        }, 500);
      } else {
        this.setState({
          currentPage: (renderDataIndex)
        });
      }
    };

    handleSubmit = () => {
      const selectedItem = this.getItemFromTree(this.props.tree, this.state.selectedValueList[this.state.selectedValueList.length - 1]) || null;
      if (selectedItem) {
        this.setState({
          selectedLabel: selectedItem.label
        })
      } else {
        this.setState({
          selectedLabel: ''
        })
      }
      this.props.onChange(this.state.selectedValueList[this.state.selectedValueList.length - 1]);
    };

    handleCancel = () => {
      this.setState({
        showSelect: false
      })
    };

    render() {
        const {placeholder, disabled, editable, className} = this.props;
        const renderDataList = this.getRenderDataFromCategoryTree(this.props.tree);
        const tabs = this.getTabsFromRenderData(renderDataList);
        const selectedItem = this.getItemFromTree(this.props.tree, this.state.selectedValueList[this.state.selectedValueList.length - 1]) || {label: ''};
        return (
          <div className={className}>
            <div className={'selector-holder'}
                onClick={() => {
                    if (!disabled && editable) {
                        this.setState({
                            showSelect: true
                        })
                    }
                }}
            >
              {this.state.selectedLabel || placeholder}
            </div>
            <PopPanel
              show={this.state.showSelect}
              title={selectedItem.label}
              onSubmit={this.handleSubmit}
              onClose={this.handleCancel}
            >
              <Tabs
                tabs={tabs}
                page={this.state.currentPage}
                onChange={(tab, index) => {
                  this.setState({
                    currentPage: index
                  });
                }}
              >
                {renderDataList.map((renderData, renderDataIndex) => {
                  const optionList = renderData.optionList || [];
                  return (
                    <div
                      className={'option-wrapper'}
                      key={renderDataIndex}
                    >
                      {optionList.map((option, optionIndex) => {
                        let selected = null;
                        if (this.state.selectedValueList.length >= (renderDataIndex + 1)) {
                          selected = this.state.selectedValueList[renderDataIndex];
                        }
                        return (
                          <div
                            className={classNames({
                              'option-item': true,
                              'selected': (option.value === selected)
                            })}
                            key={optionIndex}
                            onClick={() => {
                              this.handleOptionClicked(renderDataIndex, optionIndex, option);
                            }}
                          >
                            {option.label}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </Tabs>
            </PopPanel>
          </div>
        );
    }
}

export default TreeSelector;
