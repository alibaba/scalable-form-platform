import { getRandomString, WidgetKey } from 'scalable-form-tools';
import InitSchema from '../InitSchema';

export default function getInitSchema(getMessage: (key: string) => string): InitSchema {
  return {
    initJsonSchema: {
      type: 'string',
      title: getMessage('fieldSchemaSelectLabel'),
      default: '',
      enum: [getRandomString(), getRandomString(), getRandomString()],
      enumNames: [
        getMessage('fieldSchemaCommonOption1'),
        getMessage('fieldSchemaCommonOption2'),
        getMessage('fieldSchemaCommonOption3'),
      ],
    },
    initFormData: false,
    initUISchema: {
      'ui:widget': WidgetKey.SelectWidget,
      'ui:placeholder': getMessage('fieldSchemaCommonSelectPlaceholder'),
    },
  };
}
