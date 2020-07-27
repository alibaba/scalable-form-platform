import { WidgetKey } from 'scalable-form-tools';
import InitSchema from '../InitSchema';

export default function getInitSchema(getMessage: (key: string) => string): InitSchema {
  return {
    initJsonSchema: {
      type: 'array',
      title: getMessage('fieldSchemaSliderRangeLabel'),
      default: [],
      items: {
        type: 'number',
        default: 0,
        enum: [],
        enumNames: [],
      },
      uniqueItems: true,
    },
    initFormData: [],
    initUISchema: {
      'ui:widget': WidgetKey.SliderRangeWidget,
    },
  };
}
