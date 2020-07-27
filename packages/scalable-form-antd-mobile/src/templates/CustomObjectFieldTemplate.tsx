import React from 'react';
import { List } from 'antd-mobile';
import { ObjectFieldTemplateProps } from 'scalable-form-core';

/**
 * 移动端object类型自定义模板
 * @param {ObjectFieldTemplateProps} props
 * @returns {any}
 * @constructor
 */
const CustomObjectFieldTemplate: React.FC<ObjectFieldTemplateProps> = (props: ObjectFieldTemplateProps) => {
  const header = props.uiSchema['ui:title'] || props.title || '';
  const { description } = props;
  return (
    <List renderHeader={header} renderFooter={description}>
      {props.properties.map((prop: { content: React.ReactElement }) => prop.content)}
    </List>
  );
};

CustomObjectFieldTemplate.displayName = 'CustomObjectFieldTemplate';
export default React.memo(CustomObjectFieldTemplate);
