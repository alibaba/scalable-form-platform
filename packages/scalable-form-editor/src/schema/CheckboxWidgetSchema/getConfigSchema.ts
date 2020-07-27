import ConfigSchema from '../ConfigSchema';
import { WidgetKey } from 'scalable-form-tools';

export default function getConfigSchema(getMessage: (key: string) => string): ConfigSchema {
  return {
    configJsonSchema: {
      title: '',
      type: 'object',
      required: ['name', 'code'],
      properties: {
        name: {
          type: 'string',
          title: getMessage('configSchemaNameTitle'),
          maxLength: 200,
        },
        code: {
          type: 'string',
          title: getMessage('configSchemaCodeTitle'),
        },
        value: {
          type: 'string',
          title: getMessage('configSchemaValueTitle'),
          enum: [],
          enumNames: [],
        },
        description: {
          type: 'string',
          title: getMessage('configSchemaDescTitle'),
        },
        require: {
          type: 'boolean',
          title: getMessage('configSchemaRequiredTitle'),
        },
        disabled: {
          type: 'boolean',
          title: getMessage('configSchemaDisabledTitle'),
        },
      },
    },
    configUiSchema: {
      name: {
        'ui:widget': WidgetKey.TextWidget,
        'ui:options': {
          placeholder: getMessage('configSchemaNamePlaceholder'),
          validate: [
            {
              type: 'empty',
              message: getMessage('configSchemaNameRequire'),
            },
          ],
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
      value: {
        'ui:widget': WidgetKey.CheckboxWidget,
        'ui:options': {
          placeholder: getMessage('configSchemaSelectValuePlaceholder'),
        },
      },
      description: {
        'ui:widget': WidgetKey.TextareaWidget,
        'ui:options': {
          placeholder: getMessage('configSchemaDescPlaceholder'),
          height: 200,
          toolbars: [['bold', 'italic', 'underline', 'strike', { color: [] }, 'link', 'image', 'clean']],
        },
      },
      require: {
        'ui:widget': WidgetKey.BooleanCheckboxWidget,
      },
      disabled: {
        'ui:widget': WidgetKey.BooleanCheckboxWidget,
      },
    },
    configFormData: {
      name: '',
      code: '',
      value: [],
      description: '',
      dataSource: '',
      server: '',
      require: false,
      disabled: false,
    },
  };
}
