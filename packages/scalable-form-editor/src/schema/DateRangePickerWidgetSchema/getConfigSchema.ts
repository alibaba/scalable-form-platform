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
        description: {
          type: 'string',
          title: getMessage('configSchemaDescTitle'),
        },
        initRange: {
          type: 'string',
          title: getMessage('configSchemaInitRangeTitle'),
          enum: ['beforeweek', 'beforemonth', 'beforeyear', 'afterweek', 'aftermonth', 'afteryear'],
          enumNames: [
            getMessage('configSchemaInitRangeOption1'),
            getMessage('configSchemaInitRangeOption2'),
            getMessage('configSchemaInitRangeOption3'),
            getMessage('configSchemaInitRangeOption4'),
            getMessage('configSchemaInitRangeOption5'),
            getMessage('configSchemaInitRangeOption6'),
          ],
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
      description: {
        'ui:widget': WidgetKey.TextareaWidget,
        'ui:options': {
          placeholder: getMessage('configSchemaDescPlaceholder'),
          height: 200,
          toolbars: [['bold', 'italic', 'underline', 'strike', { color: [] }, 'link', 'image', 'clean']],
        },
      },
      initRange: {
        'ui:widget': WidgetKey.SelectWidget,
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
      description: '',
      initRange: undefined,
      dataSource: '',
      server: '',
      cascade: false,
      require: false,
      hidden: false,
      disabled: false,
    },
  };
}
