/**
 * xform自定义field template
 */
import { FieldTemplateProps } from '@rjsf/core';
import React from 'react';
import classnames from 'classnames';
import { WidgetKey } from 'scalable-form-tools';

/* eslint-disable react/no-danger */
const CustomFieldTemplate: React.FC<FieldTemplateProps> = (props: FieldTemplateProps) => {
  const { id, classNames, label, required, description, children, rawHelp, schema, uiSchema } = props;
  const idPrefix = 'root';
  const code = (id || '').slice(idPrefix.length + 1);
  const hidden: boolean = uiSchema['ui:hidden'] || false;
  const isBooleanCheckbox = schema.type === 'boolean' && uiSchema['ui:widget'] === WidgetKey.BooleanCheckboxWidget;
  if (schema.type === 'object') {
    return <div className={`${classNames} scalable-form-root`}>{children}</div>;
  } else if (label && label !== code) {
    return (
      <div
        className={classnames(classNames, 'scalable-form-item', {
          'scalable-form-hidden': hidden,
        })}
      >
        <label
          htmlFor={id}
          className={classnames({
            'scalable-form-hidden': isBooleanCheckbox,
            'control-label': true,
            'ant-form-item-label': true,
            required,
          })}
        >
          {label}
        </label>
        {description}
        {children}
        <div
          className="scalable-form-help"
          dangerouslySetInnerHTML={{
            __html: rawHelp,
          }}
        />
      </div>
    );
  } else {
    return (
      <div
        className={classnames(classNames, 'scalable-form-item', {
          'scalable-form-hidden': hidden,
        })}
      >
        {description}
        {children}
        <div
          className="scalable-form-help"
          dangerouslySetInnerHTML={{
            __html: rawHelp,
          }}
        />
      </div>
    );
  }
};
export default React.memo(CustomFieldTemplate);
