import React, { useMemo } from 'react';
import { WidgetProps } from 'scalable-form-core';
import { Checkbox, List } from 'antd-mobile';
import classNames from 'classnames';
import { getLabelFromOptionsByValue, EnumOption } from '../tools';
import './index.less';

const ListItem = List.Item;
const { CheckboxItem } = Checkbox;

/**
 * 多选下拉框ui:options属性
 */
interface CheckOptions {
  /**
   * 选项枚举
   */
  enumOptions: EnumOption[];
}

/**
 * 多项选择
 * @type {WidgetProps<string[]>} props
 */
const CheckboxWidget: React.FC<WidgetProps<string[], CheckOptions>> = (props: WidgetProps<string[], CheckOptions>) => {
  const { schema, options, value, disabled, onChange, required } = props;
  const enumOptions = options.enumOptions || [];
  const extraValue = useMemo(() => {
    return (value || []).map((item: string) => getLabelFromOptionsByValue(enumOptions as EnumOption[], item)).join(',');
  }, [value, enumOptions]);
  return (
    <div
      className={classNames({
        'scalable-form-widget': true,
        'scalable-form-checkbox': true,
        disabled,
      })}
    >
      <ListItem wrap multipleLine extra={extraValue}>
        <label
          className={classNames({
            required,
          })}
        >
          {schema.title}
        </label>
      </ListItem>
      {enumOptions.map((enumItem: EnumOption) => {
        return (
          <CheckboxItem
            key={enumItem.value}
            disabled={disabled}
            checked={(value || []).indexOf(enumItem.value) > -1}
            onClick={() => {
              const result: string[] = [];
              (value || []).map((item: string) => result.push(item));
              if (result.indexOf(enumItem.value) > -1) {
                result.splice(result.indexOf(enumItem.value), 1);
              } else {
                result.push(enumItem.value);
              }
              onChange(result);
            }}
          >
            {enumItem.label}
          </CheckboxItem>
        );
      })}
    </div>
  );
};

CheckboxWidget.displayName = 'CheckboxWidget';
CheckboxWidget.defaultProps = {
  disabled: false,
  value: [],
  defaultValue: undefined,
  onChange: () => {},
  options: {
    enumOptions: [],
  },
};
export default React.memo(CheckboxWidget);
