import { UiSchema, WidgetProps } from 'scalable-form-core';
import { getUiSchemaByProvidedWidgets } from '../src';
import React from 'react';
import classNames from 'classnames';

const DemoWidget: React.FC<WidgetProps> = () => {
  return (
    <div
      className={classNames({
        'scalable-form-custom-widget': true,
        'scalable-form-custom-test-demo': true,
      })}
    >
      Test Demo Widget
    </div>
  );
};

DemoWidget.displayName = 'DemoWidget';

const uiSchema: UiSchema = {
  'KEY_A': {
    'ui:widget': 'componentA',
  },
  'KEY_B': {
    'ui:widget': 'componentB',
  },
};

const widgets = {
  componentA: DemoWidget,
};

describe('test getUiSchemaByProvidedWidgets', () => {
  const result = getUiSchemaByProvidedWidgets(widgets, uiSchema);
  it('should make componentB as Anonymous', () => {
    expect(result['KEY_B']['ui:widget']).toBe('Anonymous');
  });
  it('should leave componentA', () => {
    expect(result['KEY_A']['ui:widget']).toBe('componentA');
  });
});
