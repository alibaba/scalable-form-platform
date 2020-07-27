import ConfigSchema from '../ConfigSchema';
import { WidgetKey } from 'scalable-form-tools';

export default function getConfigSchema(getMessage: (key: string) => string): ConfigSchema {
  return {
    configJsonSchema: {
      title: '',
      type: 'object',
      required: ['code'],
      properties: {
        code: {
          type: 'string',
          title: getMessage('configSchemaCodeTitle'),
        },
      },
    },
    configUiSchema: {
      code: {
        'ui:widget': WidgetKey.AnonymousWidget,
        'ui:options': {
          placeholder: getMessage('configSchemaCodePlaceholder'),
          validate: [
            {
              type: 'empty',
              message: getMessage('configSchemaCodeRequire'),
            },
          ],
        },
      },
    },
    configFormData: {
      code: '',
    },
  };
}
