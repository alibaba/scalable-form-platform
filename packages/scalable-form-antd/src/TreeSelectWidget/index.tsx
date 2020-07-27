/**
 * @file 树形选择器 Widget
 * @description 下拉数据从 props.options.enumTreeData 中获取
 * 根据 props.options.multiple 的不同，可以选择设置成是否多选
 */

import React, { useCallback } from 'react';
import cls from 'classnames';
import { TreeSelect } from 'antd';
import { TreeSelectProps } from 'antd/es/tree-select';
import { WidgetProps } from 'scalable-form-core';
import { useLogWidgetPV } from 'scalable-form-tools';

import { BaseFormContext } from '../types';

type TreeData = NonNullable<TreeSelectProps<any>['treeData']>;
type OmitPartialUnion<Source, Exclude> = Source extends infer F ? (F extends Exclude ? never : F) : never;

/* eslint-disable @typescript-eslint/indent */
// https://github.com/typescript-eslint/typescript-eslint/issues/1824
export type TreeSelectWidgetOptions = Pick<
  TreeSelectProps<any>,
  | 'allowClear'
  | 'autoClearSearchValue'
  | 'autoFocus'
  | 'className'
  | 'dropdownClassName'
  | 'dropdownMatchSelectWidth'
  | 'dropdownStyle'
  | 'filterTreeNode'
  | 'getPopupContainer'
  | 'labelInValue'
  | 'maxTagCount'
  | 'multiple'
  | 'searchPlaceholder'
  | 'treeIcon'
  | 'showCheckedStrategy'
  | 'showSearch'
  | 'size'
  | 'suffixIcon'
  | 'treeCheckable'
  | 'treeCheckStrictly'
  | 'treeDataSimpleMode'
  | 'treeDefaultExpandAll'
  | 'treeDefaultExpandedKeys'
  | 'treeNodeFilterProp'
  | 'treeNodeLabelProp'
> & {
  /**
   * 仅用于过滤（由于 react-jsonschema-form 针对 string 类型默认会给 props 添加 enumOptions）
   */
  enumOptions?: any;

  /**
   * 传给 treeSelect 的 treeData
   * 在命名方式上和 react-jsonschema-form 的 enumOptions 对齐
   */
  enumTreeData: TreeData;

  /**
   * 是否只能选择叶子节点项
   */
  selectLeafOnly?: boolean;
};
/* eslint-enable @typescript-eslint/indent */

export type TreeSelectWidgetProps = WidgetProps<string | string[], TreeSelectWidgetOptions, BaseFormContext>;

type FilterTreeNode = OmitPartialUnion<NonNullable<TreeSelectWidgetOptions['filterTreeNode']>, boolean>;

const setOnlyTreeLeafSelectable = (tree: TreeData): TreeData => {
  return tree.map((node) => {
    const { children, ...rest } = node;

    if (Array.isArray(children) && children.length > 0) {
      return {
        ...rest,
        selectable: false,
        children: setOnlyTreeLeafSelectable(children),
      };
    }

    return {
      ...rest,
      selectable: true,
    };
  });
};

const adapterTreeData = (tree: TreeData): TreeData => {
  return tree.map((node) => {
    const { title, label, children, ...rest } = node;

    return {
      title: title || label,
      label,
      ...rest,
      children: Array.isArray(children) && children.length > 0 ? adapterTreeData(children) : children,
    };
  });
};

const TreeSelectWidget: React.FC<TreeSelectWidgetProps> = (props) => {
  useLogWidgetPV('tree-select');
  const {
    id,
    options,
    readonly,
    autofocus,
    disabled,
    placeholder,
    value: pValue,
    onChange,
    formContext,
    className,
  } = props;
  const { enumOptions, enumTreeData, getPopupContainer, selectLeafOnly, ...restOptions } = options;
  const popContainer = typeof getPopupContainer === 'function' ? getPopupContainer : formContext?.popupContainer;
  const value = pValue || undefined;
  let treeData = Array.isArray(enumTreeData) ? enumTreeData : [];

  if (selectLeafOnly && treeData.length > 0) {
    treeData = setOnlyTreeLeafSelectable(treeData);
  }

  treeData = adapterTreeData(treeData);

  const clsn = cls('ant-form-item-control', 'xform-custom-widget', 'xform-custom-tree-select', className);

  const handleFilterTreeNode = useCallback<FilterTreeNode>(
    (keyword, treeNode) => {
      const { title = '', selectable = true } = treeNode?.props || {};
      const isMatch = title.indexOf(keyword) > -1;
      if (selectLeafOnly) {
        return selectable && isMatch;
      }
      return isMatch;
    },
    [selectLeafOnly],
  );

  return (
    <div className={clsn}>
      <TreeSelect
        // 默认行为，允许被 ...restOptions覆盖
        allowClear
        showSearch
        autoFocus={autofocus}
        filterTreeNode={handleFilterTreeNode}
        {...restOptions}
        id={id}
        disabled={disabled || readonly}
        placeholder={placeholder}
        getPopupContainer={popContainer}
        treeData={treeData}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default React.memo(TreeSelectWidget);
