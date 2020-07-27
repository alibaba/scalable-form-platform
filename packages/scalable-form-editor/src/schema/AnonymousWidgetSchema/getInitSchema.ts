import { WidgetKey } from 'scalable-form-tools';
import InitSchema from '../InitSchema';

export default function getInitSchema(): InitSchema {
  return {
    initJsonSchema: {
      type: 'string',
      title: 'AnonymousWidget',
      default: '',
    },
    initFormData: '',
    initUISchema: {
      'ui:widget': WidgetKey.AnonymousWidget,
    },
  };
}
