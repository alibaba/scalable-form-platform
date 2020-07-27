import { WidgetKey } from 'scalable-form-tools';
import InitSchema from '../InitSchema';

export default function getInitSchema(getMessage: (key: string) => string): InitSchema {
  return {
    initJsonSchema: {
      type: 'string',
      title: getMessage('configSchemaDateLabel'),
      default: '',
      format: 'date',
    },
    initFormData: '',
    initUISchema: {
      'ui:widget': WidgetKey.DatePickerWidget,
      'ui:placeholder': getMessage('fieldSchemaCommonSelectPlaceholder'),
      'ui:options': {
        format: 'YYYY-MM-DD',
      },
    },
  };
}
