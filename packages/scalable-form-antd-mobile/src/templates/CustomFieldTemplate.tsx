import React from 'react';
import { WhiteSpace } from 'antd-mobile';
import classnames from 'classnames';
import { FieldTemplateProps } from 'scalable-form-core';

/**
 * 移动端自定义field template
 * @param {FieldTemplateProps} props
 * @returns {any}
 * @constructor
 */
const CustomFieldTemplate: React.FC<FieldTemplateProps> = (props: FieldTemplateProps) => {
  const { classNames, hidden, children, schema, rawHelp, disabled } = props;
  if (schema.type === 'object') {
    return (
      <div className={`${classNames} scalable-form-mobile-root`}>
        {children}
        <WhiteSpace size="md" />
      </div>
    );
  } else {
    const calClassNames = `${classNames} scalable-form-mobile-item ${hidden ? 'scalable-form-hidden' : ''}`;
    /* eslint-disable react/no-danger */
    return (
      <div className={calClassNames}>
        {children}
        {rawHelp && (
          <div
            className={classnames({
              'scalable-form-help': true,
              disabled,
            })}
            dangerouslySetInnerHTML={{
              __html: rawHelp,
            }}
          />
        )}
        <WhiteSpace size="sm" />
      </div>
    );
    /* eslint-enable */
  }
};

CustomFieldTemplate.displayName = 'CustomFieldTemplate';
export default React.memo(CustomFieldTemplate);
