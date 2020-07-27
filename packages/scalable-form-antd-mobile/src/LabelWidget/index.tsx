import React from 'react';
import { List } from 'antd-mobile';
import { WidgetProps } from 'scalable-form-core';
import classNames from 'classnames';
import { useLogWidgetPV } from 'scalable-form-tools';
import './index.less';

const ListItem = List.Item;

const LabelWidget: React.FC<WidgetProps> = (props: WidgetProps) => {
  const { label, disabled } = props;
  useLogWidgetPV('label');
  return (
    <div
      className={classNames({
        'scalable-form-widget': true,
        'scalable-form-label': true,
        disabled,
      })}
    >
      <ListItem wrap multipleLine>
        {label}
      </ListItem>
    </div>
  );
};

LabelWidget.displayName = 'LabelWidget';
LabelWidget.defaultProps = {
  disabled: false,
  label: '',
};
export default React.memo(LabelWidget);
