import React from 'react';
import { Picker, List } from 'antd-mobile';
import classNames from 'classnames';
import { WidgetProps } from 'scalable-form-core';
import './index.less';

const ListItem = List.Item;

const SelectWidget: React.FC<WidgetProps> = (props: WidgetProps) => {
  const { label, required, value, disabled, onChange, options, placeholder } = props;
  const enumOptions = options.enumOptions || [];
  return (
    <div
      className={classNames({
        'scalable-form-widget': true,
        'scalable-form-select': true,
        disabled,
      })}
    >
      <Picker
        data={enumOptions}
        cols={1}
        value={[value]}
        disabled={disabled}
        onChange={(newValue) => {
          onChange((newValue || [])[0]);
        }}
        extra={placeholder}
      >
        <ListItem arrow="horizontal" wrap multipleLine>
          <label
            className={classNames({
              required,
            })}
          >
            {label}
          </label>
        </ListItem>
      </Picker>
    </div>
  );
};

SelectWidget.displayName = 'SelectWidget';
SelectWidget.defaultProps = {
  label: '',
  disabled: false,
  value: '',
  onChange: () => {},
  options: {},
};
export default React.memo(SelectWidget);
