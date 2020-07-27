import { WidgetKey } from 'scalable-form-tools';
import InitSchema from '../InitSchema';

export default function getInitSchema(getMessage: (key: string) => string): InitSchema {
  return {
    initJsonSchema: {
      type: 'string',
      title: getMessage('configSchemaDateTimeLabel'),
      default: '',
      format: 'date-time',
    },
    initFormData: '',
    initUISchema: {
      'ui:widget': WidgetKey.DateTimePickerWidget,
      'ui:placeholder': getMessage('fieldSchemaCommonSelectPlaceholder'),
      'ui:options': {
        format: 'YYYY-MM-DD HH:mm:ss',
      },
    },
  };
}
