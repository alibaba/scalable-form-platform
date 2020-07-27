import { getRandomString, WidgetKey } from 'scalable-form-tools';
import InitSchema from '../InitSchema';

export default function getInitSchema(getMessage: (key: string) => string): InitSchema {
  return {
    initJsonSchema: {
      type: 'string',
      title: getMessage('fieldSchemaRadioLabel'),
      default: '',
      enum: [getRandomString(), getRandomString(), getRandomString()],
      enumNames: [
        getMessage('fieldSchemaCommonOption1'),
        getMessage('fieldSchemaCommonOption2'),
        getMessage('fieldSchemaCommonOption3'),
      ],
      uniqueItems: true,
    },
    initFormData: [],
    initUISchema: {
      'ui:widget': WidgetKey.RadioWidget,
      'ui:options': {
        vertical: false,
      },
    },
  };
}
