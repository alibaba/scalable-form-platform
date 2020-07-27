import { WidgetKey } from 'scalable-form-tools';
import InitSchema from '../InitSchema';

export default function getInitSchema(getMessage: (key: string) => string): InitSchema {
  return {
    initJsonSchema: {
      type: 'string',
      title: getMessage('configSchemaRateLabel'),
      default: '',
    },
    initFormData: '',
    initUISchema: {
      'ui:widget': WidgetKey.RateWidget,
    },
  };
}
