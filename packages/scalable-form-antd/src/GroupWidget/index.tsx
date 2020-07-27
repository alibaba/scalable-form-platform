/**
 * @file 表单分隔水平线
 * @description 不需要提交 value
 */

import React from 'react';
import cls from 'classnames';
import { WidgetProps } from 'scalable-form-core';
import { useLogWidgetPV } from 'scalable-form-tools';

import './index.less';
import { BaseFormContext } from '../types';

export type GroupWidgetProps = WidgetProps<never, { groupName: string }, BaseFormContext>;

const GroupWidget: React.FC<GroupWidgetProps> = (props) => {
  const { options, className } = props;

  useLogWidgetPV('group');

  const clsn = cls('ant-form-item-control', 'xform-custom-widget', 'xform-custom-group', className);

  return (
    <div className={clsn}>
      <p className="group-name">{options?.groupName}</p>
    </div>
  );
};

GroupWidget.displayName = 'GroupWidget';
GroupWidget.defaultProps = {
  options: {
    groupName: '',
  },
};
export default React.memo(GroupWidget);
