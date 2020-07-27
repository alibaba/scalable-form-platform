import React, { useCallback } from 'react';
import { Range, List } from 'antd-mobile';
import classNames from 'classnames';
import { WidgetProps } from 'scalable-form-core';
import './index.less';

const ListItem = List.Item;

type SliderRangeWidgetProps = WidgetProps<[number | undefined, number | undefined]>;

/**
 * sliderRange滑动区域输入条
 * @type {WidgetProps<[(number | undefined), (number | undefined)]>}
 */
const SliderRangeWidget: React.FC<SliderRangeWidgetProps> = (props: SliderRangeWidgetProps) => {
  const { id, disabled, options, schema, required, onChange } = props;
  let { value } = props;

  if (!value) {
    value = [undefined, undefined];
  }

  const handleChanged = useCallback(
    (newValue: [number | undefined, number | undefined]) => {
      onChange([newValue[0] || 0, newValue[1] || 0]);
    },
    [onChange],
  );
  return (
    <div
      className={classNames({
        'scalable-form-widget': true,
        'scalable-form-slider-range': true,
        disabled,
      })}
    >
      <ListItem wrap multipleLine extra={value.join(',')}>
        <label
          className={classNames({
            required,
          })}
        >
          {schema.title}
        </label>
      </ListItem>
      <div className="scalable-form-slider-range-wrapper">
        <Range key={id} disabled={disabled} value={value} onChange={handleChanged} {...options} />
      </div>
    </div>
  );
};

SliderRangeWidget.displayName = 'SliderRangeWidget';
SliderRangeWidget.defaultProps = {
  value: [undefined, undefined],
  label: '',
  disabled: false,
  onChange: () => {},
  options: {},
};
export default React.memo(SliderRangeWidget);
