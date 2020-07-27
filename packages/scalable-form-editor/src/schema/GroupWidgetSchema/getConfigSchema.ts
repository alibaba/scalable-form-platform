import ConfigSchema from '../ConfigSchema';
import { WidgetKey } from 'scalable-form-tools';

export default function getConfigSchema(getMessage: (key: string) => string): ConfigSchema {
  return {
    configJsonSchema: {
      title: '',
      type: 'object',
      required: ['code'],
      properties: {
        name: {
          type: 'string',
          title: getMessage('configSchemaGroupNameTitle'),
          maxLength: 200,
        },
        code: {
          type: 'string',
          title: getMessage('configSchemaCodeTitle'),
        },
      },
    },
    configUiSchema: {
      name: {
        'ui:widget': WidgetKey.TextWidget,
        'ui:help': getMessage('configSchemaGroupNamePlaceholder'),
        'ui:options': {
          placeholder: getMessage('configSchemaGroupNamePlaceholder'),
        },
      },
      code: {
        'ui:widget': WidgetKey.TextWidget,
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
      name: '',
      code: '',
    },
  };
}
