import React from 'react';
import { Switch, List } from 'antd-mobile';
import { WidgetProps } from 'scalable-form-core';
import { useLogWidgetPV } from 'scalable-form-tools';
import classNames from 'classnames';
import './index.less';

const ListItem = List.Item;

/**
 * switch开关，用于渲染布尔值开关
 * @type {WidgetProps<boolean>} props
 */
const BooleanCheckbox: React.FC<WidgetProps<boolean>> = (props: WidgetProps<boolean>) => {
  const { label, options, disabled, onChange, value } = props;
  useLogWidgetPV('boolean-checkbox');
  return (
    <div
      className={classNames({
        'scalable-form-widget': true,
        'scalable-form-boolean-checkbox': true,
        disabled,
      })}
    >
      <ListItem
        {...options}
        wrap
        multipleLine
        extra={<Switch checked={value} disabled={disabled} onChange={onChange} />}
      >
        {label}
      </ListItem>
    </div>
  );
};
BooleanCheckbox.displayName = 'BooleanCheckbox';
BooleanCheckbox.defaultProps = {
  label: '',
  disabled: false,
  value: false,
  onChange: () => {},
  options: {},
};
export default React.memo(BooleanCheckbox);
