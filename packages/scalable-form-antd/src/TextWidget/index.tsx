/**
 * @file 单行文本输入框
 * @description 同 input
 */

import React, { useCallback, useRef, useMemo } from 'react';
import cls from 'classnames';
import { Input } from 'antd';
import { InputProps } from 'antd/es/input';
import { WidgetProps } from 'scalable-form-core';

import { BaseFormContext } from '../types';
import { simpleDebounce } from '../common/tools';
import { useControlState } from '../common/use-control-state';

const isChrome = navigator.userAgent.includes('Chrome') && navigator.vendor.includes('Google Inc');

/* eslint-disable @typescript-eslint/indent */
// https://github.com/typescript-eslint/typescript-eslint/issues/1824
type InputWidgetOptions = Pick<
  InputProps,
  | 'prefixCls'
  | 'size'
  | 'type'
  | 'onPressEnter'
  | 'addonBefore'
  | 'addonAfter'
  | 'prefix'
  | 'suffix'
  | 'allowClear'
  | 'autoFocus'
>;
/* eslint-enable @typescript-eslint/indent */

type InputWidgetProps = WidgetProps<string, InputWidgetOptions & { [key: string]: any }, BaseFormContext>;

const InputWidget: React.FC<InputWidgetProps> = (props) => {
  const { className, schema, options, readonly, autofocus, disabled, placeholder, value: pValue, onChange } = props;
  const [value, setValue] = useControlState<string | undefined>(pValue);
  const compositionRef = useRef<boolean>(false);
  const { minLength, maxLength } = schema;

  const handleValue = useCallback(
    (v: string) => {
      const realValue = v || undefined;
      setValue(realValue);
      typeof onChange === 'function' && onChange(realValue);
    },
    [setValue, onChange],
  );

  const debouncedHandleChange = useMemo(() => simpleDebounce(handleValue, 100), [handleValue]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value: eValue } = event.currentTarget;
      setValue(eValue);
      if (!compositionRef.current) {
        debouncedHandleChange(eValue);
      }
    },
    [debouncedHandleChange, setValue],
  );

  const handleComposition = useCallback(
    (event: React.CompositionEvent<HTMLInputElement>) => {
      const { currentTarget, target, type: eType } = event;
      const { value: eValue } = currentTarget;

      if (eType === 'compositionend') {
        compositionRef.current = false;
        // fixed for Chrome v53+ and detect all Chrome
        // https://chromium.googlesource.com/chromium/src/
        // +/afce9d93e76f2ff81baaa088a4ea25f67d1a76b3%5E%21/
        if (target instanceof HTMLInputElement && isChrome) {
          // fire onChange
          handleValue(eValue);
        }
      } else {
        compositionRef.current = true;
      }
    },
    [handleValue],
  );

  // 过滤掉引起 antd Input Bug 的属性
  const { enumOptions, help, emptyValue, ...restOptions } = options || {};
  const clsn = cls('ant-form-item-control', 'xform-custom-widget', 'xform-custom-input', className);

  return (
    <div className={clsn}>
      <Input
        type="text"
        maxLength={maxLength || Infinity}
        minLength={minLength || 0}
        placeholder={placeholder}
        value={value}
        readOnly={readonly}
        disabled={disabled}
        autoFocus={autofocus}
        {...restOptions}
        onChange={handleChange}
        onCompositionStart={handleComposition}
        onCompositionUpdate={handleComposition}
        onCompositionEnd={handleComposition}
      />
    </div>
  );
};

InputWidget.displayName = 'InputWidget';
InputWidget.defaultProps = {
  disabled: false,
  value: undefined,
  defaultValue: undefined,
  placeholder: '',
  onChange: () => {},
  options: {},
};

export default React.memo(InputWidget);
