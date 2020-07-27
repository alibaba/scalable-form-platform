import React from 'react';
import { Slider, List } from 'antd-mobile';
import classNames from 'classnames';
import { WidgetProps } from 'scalable-form-core';
import './index.less';

const ListItem = List.Item;

/**
 * slider滑动输入条
 * @param {WidgetProps} props
 * @returns {any}
 * @constructor
 */
const SliderWidget: React.FC<WidgetProps<number>> = (props: WidgetProps<number>) => {
  const { id, disabled, value, label, required, onChange } = props;

  return (
    <div
      className={classNames({
        'scalable-form-widget': true,
        'scalable-form-slider': true,
        disabled,
      })}
    >
      <ListItem wrap multipleLine extra={value}>
        <label
          className={classNames({
            required,
          })}
        >
          {label}
        </label>
      </ListItem>
      <div className="scalable-form-slider-item-wrapper">
        <Slider key={id} disabled={disabled} value={value} onChange={onChange} onAfterChange={onChange} />
      </div>
    </div>
  );
};

SliderWidget.displayName = 'SliderWidget';
SliderWidget.defaultProps = {
  label: '',
  disabled: false,
  value: undefined,
  onChange: () => {},
  options: {},
};
export default React.memo(SliderWidget);
