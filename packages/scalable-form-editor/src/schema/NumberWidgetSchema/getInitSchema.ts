import { WidgetKey } from 'scalable-form-tools';
import InitSchema from '../InitSchema';

export default function getInitSchema(getMessage: (key: string) => string): InitSchema {
  return {
    initJsonSchema: {
      type: 'number',
      title: getMessage('configSchemaNumberLabel'),
      default: '',
    },
    initFormData: 0,
    initUISchema: {
      'ui:widget': WidgetKey.NumberWidget,
    },
  };
}
