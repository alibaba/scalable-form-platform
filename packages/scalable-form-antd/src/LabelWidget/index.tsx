/**
 * @file 普通 label 类型组件
 * @description value 会被当作 dangerouslySetInnerHTML 来渲染，请注意安全
 */

import React from 'react';
import cls from 'classnames';
import { WidgetProps } from 'scalable-form-core';
import { useLogWidgetPV } from 'scalable-form-tools';
import './index.less';

import { BaseFormContext } from '../types';

/* eslint-disable @typescript-eslint/indent */
// https://github.com/typescript-eslint/typescript-eslint/issues/1824
type LabelWidgetProps = WidgetProps<
  string,
  {
    enumOptions: any[];
    disabled: boolean;
    readonly: boolean;
    help: string;
    emptyValue: any;
  },
  BaseFormContext
>;
/* eslint-enable @typescript-eslint/indent */

const LabelWidget: React.FC<LabelWidgetProps> = (props) => {
  const { options, value, className } = props;
  const { enumOptions, disabled, readonly, help, emptyValue, ...restOptions } = options || {};

  useLogWidgetPV('label');

  const clsn = cls('ant-form-item-control', 'xform-custom-widget', 'xform-custom-label', className);

  return (
    <div className={clsn}>
      {/* eslint-disable-next-line react/no-danger */}
      <div {...restOptions} dangerouslySetInnerHTML={{ __html: value || '' }} />
    </div>
  );
};

LabelWidget.displayName = 'LabelWidget';
LabelWidget.defaultProps = {
  disabled: false,
  value: '',
  defaultValue: undefined,
  onChange: () => {},
  options: {
    enumOptions: [],
    disabled: false,
    readonly: false,
    help: '',
    emptyValue: '',
  },
};
export default React.memo(LabelWidget);
