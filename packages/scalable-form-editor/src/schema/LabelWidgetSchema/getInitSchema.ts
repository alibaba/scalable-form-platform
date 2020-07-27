import { WidgetKey } from 'scalable-form-tools';
import InitSchema from '../InitSchema';

export default function getInitSchema(getMessage: (key: string) => string): InitSchema {
  return {
    initJsonSchema: {
      type: 'string',
      title: getMessage('configSchemaLabelLabel'),
      default: '',
    },
    initFormData: getMessage('configSchemaLabelDefaultValue'),
    initUISchema: {
      'ui:widget': WidgetKey.LabelWidget,
    },
  };
}
