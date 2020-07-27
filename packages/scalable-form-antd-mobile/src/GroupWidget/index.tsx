import React from 'react';
import classNames from 'classnames';
import { WidgetProps } from 'scalable-form-core';
import { useLogWidgetPV } from 'scalable-form-tools';
import './index.less';

/**
 * 表单分隔水平线
 * @type {WidgetProps}
 */
const GroupWidget: React.FC<WidgetProps> = (props: WidgetProps) => {
  const { options } = props;
  useLogWidgetPV('group');
  return (
    <div
      className={classNames({
        'scalable-form-widget': true,
        'scalable-form-group': true,
      })}
    >
      <p className="group-name">{options.groupName}</p>
    </div>
  );
};
GroupWidget.displayName = 'GroupWidget';
GroupWidget.defaultProps = {
  options: {},
};
export default React.memo(GroupWidget);
