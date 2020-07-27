import { WidgetKey } from 'scalable-form-tools';
import InitSchema from '../InitSchema';

export default function getInitSchema(getMessage: (key: string) => string): InitSchema {
  return {
    initJsonSchema: {
      type: 'array',
      title: getMessage('configSchemaDateRangeLabel'),
      default: [],
      items: {
        type: 'string',
        enum: [],
        enumNames: [],
      },
      uniqueItems: true,
    },
    initFormData: '',
    initUISchema: {
      'ui:widget': WidgetKey.DateRangePickerWidget,
      'ui:options': {
        placeholder: [getMessage('fieldSchemaDateRangePlaceholder1'), getMessage('fieldSchemaDateRangePlaceholder2')],
      },
    },
  };
}
