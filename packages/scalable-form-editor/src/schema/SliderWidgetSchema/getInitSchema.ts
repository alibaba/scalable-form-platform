import { WidgetKey } from 'scalable-form-tools';
import InitSchema from '../InitSchema';

export default function getInitSchema(getMessage: (key: string) => string): InitSchema {
  return {
    initJsonSchema: {
      type: 'number',
      title: getMessage('fieldSchemaSliderLabel'),
      default: '',
    },
    initFormData: '',
    initUISchema: {
      'ui:widget': WidgetKey.SliderWidget,
    },
  };
}
