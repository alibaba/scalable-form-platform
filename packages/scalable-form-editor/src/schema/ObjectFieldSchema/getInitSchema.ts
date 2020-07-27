import { WidgetKey } from 'scalable-form-tools';
import InitSchema from '../InitSchema';

export default function getInitSchema(): InitSchema {
  return {
    initJsonSchema: {
      type: 'object',
      title: 'Object',
      description: '',
      properties: {
        title: {
          type: 'string',
          title: 'Title',
          description: 'A sample title',
        },
        description: {
          type: 'string',
          title: 'Description',
          description: 'A sample title',
        },
      },
    },
    initFormData: '',
    initUISchema: {
      'ui:order': ['description', 'title'],
      'ui:widget': WidgetKey.ObjectField,
      title: {
        'ui:widget': WidgetKey.TextWidget,
      },
      description: {
        'ui:widget': WidgetKey.TextWidget,
      },
    },
  };
}
