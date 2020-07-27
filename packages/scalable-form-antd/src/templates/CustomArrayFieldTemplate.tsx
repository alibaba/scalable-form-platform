/**
 * @file 自定义 Array 类型模板
 */

import React from 'react';
import { Button } from 'antd';
import { PlusOutlined, ArrowDownOutlined, ArrowUpOutlined, CloseOutlined } from '@ant-design/icons';
import cls from 'classnames';
import { ArrayFieldTemplateProps } from '@rjsf/core';

const CustomArrayFieldTemplate: React.FC<ArrayFieldTemplateProps> = (props) => {
  const { className, items, canAdd, onAddClick } = props;
  const clns = cls('ant-form-item-control', 'xform-custom-widget', 'xform-custom-array', className);

  return (
    <div className={clns}>
      {(items || []).map(({ key, index, children, hasMoveDown, hasMoveUp, onReorderClick, onDropIndexClick }) => {
        return (
          <div className="xform-array-field-item" key={key || `${index}`}>
            <div>{children}</div>
            <div className="xform-array-buttons">
              {hasMoveDown ? (
                <Button size="small" type="default" onClick={onReorderClick(index, index + 1)}>
                  <ArrowDownOutlined />
                </Button>
              ) : null}
              {hasMoveUp ? (
                <Button size="small" type="default" onClick={onReorderClick(index, index - 1)}>
                  <ArrowUpOutlined />
                </Button>
              ) : null}
              {items.length > 1 ? (
                <Button size="small" type="default" onClick={onDropIndexClick(index)}>
                  <CloseOutlined />
                </Button>
              ) : null}
            </div>
          </div>
        );
      })}
      {canAdd ? (
        <div className="xform-array-bottom">
          <Button size="small" type="primary" onClick={onAddClick}>
            <PlusOutlined />
          </Button>
        </div>
      ) : null}
    </div>
  );
};

CustomArrayFieldTemplate.displayName = 'CustomArrayFieldTemplate';

export default React.memo(CustomArrayFieldTemplate);
