import React from 'react';
import { List } from 'antd-mobile';
import { WidgetProps } from 'scalable-form-core';
import classNames from 'classnames';
import { useLogWidgetPV } from 'scalable-form-tools';
import './index.less';

const ListItem = List.Item;

/**
 * AnonymousWidget组件，从options中获得结构
 */
type AnonymousWidgetOptions = {
  /**
   * 替换的原始组件名称
   */
  originWidget: string;
};

/**
 * 匿名组件
 * 当scalableForm的协议ui:widget中使用的component在widgets扩展中不存在时展示，并提示用户组件缺失
 * @param {WidgetProps<string, Options>} props
 * @returns {any}
 * @constructor
 */
const AnonymousWidget: React.FC<WidgetProps<string, AnonymousWidgetOptions>> = (
  props: WidgetProps<string, AnonymousWidgetOptions>,
) => {
  const { options } = props;
  useLogWidgetPV('anonymous');
  const { originWidget } = options;
  return (
    <div
      className={classNames({
        'scalable-form-widget': true,
        'scalable-form-anonymous': true,
      })}
    >
      <ListItem wrap multipleLine>
        Component <span className="origin-widget-name">{originWidget}</span> not existed
      </ListItem>
    </div>
  );
};

AnonymousWidget.displayName = 'AnonymousWidget';
AnonymousWidget.defaultProps = {
  label: '',
  disabled: false,
  value: '',
  onChange: () => {},
  options: {
    originWidget: '',
  },
};
export default React.memo(AnonymousWidget);
