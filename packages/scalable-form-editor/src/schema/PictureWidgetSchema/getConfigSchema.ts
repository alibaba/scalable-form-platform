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
        uploadType: {
          type: 'string',
          title: getMessage('configSchemaUploadTypeTitle'),
          enum: ['picture', 'picture-inline', 'picture-card'],
          enumNames: [
            getMessage('configSchemaUploadTypeOption1'),
            getMessage('configSchemaUploadTypeOption2'),
            getMessage('configSchemaUploadTypeOption3'),
          ],
        },
        maxFileSize: {
          type: 'number',
          minimum: 0,
          maximum: 10,
          multipleOf: 5,
          title: getMessage('configSchemaUploadMaxSizeTitle'),
        },
        maxFileNum: {
          type: 'number',
          minimum: 0,
          maximum: 30,
          multipleOf: 1,
          title: getMessage('configSchemaUploadMaxNumTitle'),
        },
        exampleImageUrl: {
          type: 'array',
          title: getMessage('configSchemaUploadExamplePicUrlTitle'),
          maxFileNum: 1,
          items: {
            type: 'string',
            format: 'data-url',
          },
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
      description: {
        'ui:widget': WidgetKey.TextareaWidget,
        'ui:options': {
          placeholder: getMessage('configSchemaDescPlaceholder'),
          height: 200,
          toolbars: [['bold', 'italic', 'underline', 'strike', { color: [] }, 'link', 'image', 'clean']],
        },
      },
      uploadType: {
        'ui:widget': WidgetKey.RadioWidget,
      },
      maxFileSize: {
        'ui:widget': WidgetKey.NumberWidget,
      },
      maxFileNum: {
        'ui:widget': WidgetKey.NumberWidget,
      },
      exampleImageUrl: {
        'ui:widget': WidgetKey.PictureWidget,
        'ui:options': {
          label: '上传',
          listType: 'picture',
          vertical: true,
          accept: 'image/*',
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
      description: '',
      dataSource: '',
      server: '',
      uploadType: 'picture',
      maxFileSize: 10,
      maxFileNum: 10,
      exampleImageUrl: [],
      require: false,
      disabled: false,
    },
  };
}
