/**
 * @file Tag 列表
 * @description Tag 列表
 */

import React, { useCallback, useState, useRef, ChangeEvent } from 'react';
import cls from 'classnames';
import { Tag, Input, Button, Tooltip } from 'antd';
import { TagProps } from 'antd/es/tag';
import { WidgetProps } from 'scalable-form-core';
import { useLogWidgetPV } from 'scalable-form-tools';

import { BaseFormContext } from '../types';

/* eslint-disable @typescript-eslint/indent */
// https://github.com/typescript-eslint/typescript-eslint/issues/1824
export type TagWidgetOptions = Pick<TagProps, 'prefixCls' | 'className'> & {
  addTag?: boolean;
  enumData?: Array<{
    label: string;
    value: string;
    removable: boolean;
  }>;
};
/* eslint-enable @typescript-eslint/indent */
export type TagWidgetProps = WidgetProps<string[], TagWidgetOptions, BaseFormContext>;

const TagWidget: React.FC<TagWidgetProps> = (props) => {
  useLogWidgetPV('tag');
  const { className, value: pValue, disabled, readonly, onChange, options } = props;
  const { addTag = false, enumData } = options;

  const [value, setValue] = useState(() => {
    if (Array.isArray(enumData)) {
      return enumData;
    }
    return (pValue || []).map((str) => ({ label: str, value: str, removable: true }));
  });
  const inputRef = useRef<Input>(null);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const clsn = cls('ant-form-item-control', 'xform-custom-widget', 'xform-custom-suggest-tag', className);

  const isEditable = addTag && !disabled && !readonly;

  const generateHandleClose = useCallback(
    (removedTag) => (e: Event) => {
      e.preventDefault();
      const newTags = value.filter((v) => v.value !== removedTag);
      setValue(newTags);
      onChange(newTags.map(({ value: v }) => v));
    },
    [value, setValue, onChange],
  );

  const showInput = useCallback(() => {
    setInputVisible(true);
    const { current: instance } = inputRef;
    instance && instance.focus();
  }, [setInputVisible]);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    [setInputValue],
  );

  const handleInputConfirm = useCallback(() => {
    const canAttach = inputValue && !value.some(({ value: v }) => v === inputValue);

    if (canAttach) {
      const newTags = [...value, { label: inputValue, value: inputValue, removable: true }];
      setValue(newTags);
      onChange(newTags.map(({ value: v }) => v));
    }

    // 清理输入框
    setInputVisible(false);
    setInputValue('');
  }, [value, setValue, inputValue, onChange]);

  return (
    <div className={clsn}>
      {value.map(({ value: v, label, removable }, index) => {
        const isLongTag = label.length > 20;
        const closable = removable && isEditable;
        const tagProps = {
          key: `${index}`,
          closable,
          onClose: closable ? generateHandleClose(v) : undefined,
        };
        const elem = <Tag {...tagProps}>{isLongTag ? label.slice(0, 20) : label}</Tag>;

        return isLongTag ? <Tooltip title={label}>{elem}</Tooltip> : elem;
      })}
      {inputVisible ? (
        <Input
          type="text"
          size="small"
          style={{ width: 100 }}
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : null}
      {inputVisible ? null : (
        <Button size="small" type="dashed" onClick={showInput}>
          添加标签
        </Button>
      )}
    </div>
  );
};

TagWidget.displayName = 'TagWidget';

export default React.memo(TagWidget);
