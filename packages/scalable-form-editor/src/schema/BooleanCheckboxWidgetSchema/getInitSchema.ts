import { WidgetKey } from 'scalable-form-tools';
import InitSchema from '../InitSchema';

export default function getInitSchema(getMessage: (key: string) => string): InitSchema {
  return {
    initJsonSchema: {
      type: 'boolean',
      title: getMessage('fieldSchemaBoolCheckboxLabel'),
      default: false,
    },
    initFormData: false,
    initUISchema: {
      'ui:widget': WidgetKey.BooleanCheckboxWidget,
    },
  };
}
