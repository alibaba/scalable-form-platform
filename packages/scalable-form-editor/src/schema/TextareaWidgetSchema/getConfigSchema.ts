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
        placeholder: {
          type: 'string',
          title: getMessage('configSchemaPlaceholderTitle'),
        },
        value: {
          type: 'string',
          title: getMessage('configSchemaValueTitle'),
        },
        description: {
          type: 'string',
          title: getMessage('configSchemaDescTitle'),
        },
        maxLength: {
          type: 'number',
          minimum: 0,
          multipleOf: 10,
          title: getMessage('configSchemaMaxLengthTitle'),
        },
        require: {
          type: 'boolean',
          title: getMessage('configSchemaRequiredTitle'),
        },
        hidden: {
          type: 'boolean',
          title: getMessage('configSchemaHiddenTitle'),
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
      placeholder: {
        'ui:widget': WidgetKey.TextWidget,
        'ui:options': {
          placeholder: getMessage('configSchemaPlaceholderPlaceholder'),
        },
      },
      value: {
        'ui:widget': WidgetKey.TextareaWidget,
        'ui:options': {
          placeholder: getMessage('configSchemaValuePlaceholder'),
        },
      },
      description: {
        'ui:widget': WidgetKey.RichTextWidget,
        'ui:options': {
          placeholder: getMessage('configSchemaDescPlaceholder'),
          height: 200,
          toolbars: [['bold', 'italic', 'underline', 'strike', { color: [] }, 'link', 'image', 'clean']],
        },
      },
      maxLength: {
        'ui:widget': WidgetKey.NumberWidget,
      },
      require: {
        'ui:widget': WidgetKey.BooleanCheckboxWidget,
      },
      hidden: {
        'ui:widget': WidgetKey.BooleanCheckboxWidget,
      },
      disabled: {
        'ui:widget': WidgetKey.BooleanCheckboxWidget,
      },
    },
    configFormData: {
      name: '',
      code: '',
      placeholder: getMessage('fieldSchemaCommonInputPlaceholder'),
      value: '',
      description: '',
      dataSource: '',
      validate: '',
      server: '',
      cascade: false,
      maxLength: 0,
      require: false,
      hidden: false,
      disabled: false,
    },
  };
}
