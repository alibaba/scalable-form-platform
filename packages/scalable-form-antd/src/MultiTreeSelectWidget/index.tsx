/**
 * @file 多选树形选择器 Widget
 * @description 下拉数据从 props.options.enumTreeData 中获取
 */

import React from 'react';
import cls from 'classnames';
import { TreeSelect } from 'antd';
import { WidgetProps } from 'scalable-form-core';
import { useLogWidgetPV } from 'scalable-form-tools';

import { BaseFormContext } from '../types';
import TreeSelectWidget, { TreeSelectWidgetOptions } from '../TreeSelectWidget';

/* eslint-disable @typescript-eslint/indent */
// https://github.com/typescript-eslint/typescript-eslint/issues/1824
type MultiTreeSelectWidgetOptions = Omit<
  TreeSelectWidgetOptions,
  'multiple' | 'treeCheckable' | 'labelInValue' | 'showCheckedStrategy'
>;
/* eslint-enable @typescript-eslint/indent */
type MultiTreeSelectWidgetProps = WidgetProps<string[], MultiTreeSelectWidgetOptions, BaseFormContext>;

const MultiTreeSelectWidget: React.FC<MultiTreeSelectWidgetProps> = (props) => {
  useLogWidgetPV('multi-tree-select');
  const { options, className, ...restProps } = props;
  const { selectLeafOnly } = options;
  const realOptions: TreeSelectWidgetOptions = {
    ...options,
    // MultiTreeSelectWidget 需要强制覆盖的属性
    multiple: true,
    treeCheckable: true,
    labelInValue: true,
    showCheckedStrategy: selectLeafOnly ? TreeSelect.SHOW_CHILD : TreeSelect.SHOW_ALL,
  };

  const clsn = cls('xform-custom-multi-tree-select', className);
  return <TreeSelectWidget {...restProps} options={realOptions} className={clsn} />;
};

MultiTreeSelectWidget.displayName = 'MultiTreeSelectWidget';
MultiTreeSelectWidget.defaultProps = {
  value: [],
};
export default React.memo(MultiTreeSelectWidget);
