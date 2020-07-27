import { WidgetKey } from 'scalable-form-tools';
import InitSchema from '../InitSchema';

export default function getInitSchema(getMessage: (key: string) => string): InitSchema {
  return {
    initJsonSchema: {
      type: 'array',
      title: getMessage('configSchemaUploadLabel'),
      default: [],
      maxFileSize: 10,
      maxFileNum: 10,
      items: {
        type: 'string',
        format: 'data-url',
      },
      uniqueItems: true,
    },
    initFormData: [],
    initUISchema: {
      'ui:widget': WidgetKey.PictureWidget,
      'ui:options': {
        exampleImageUrl: '',
        label: getMessage('fieldSchemaUploadButton'),
        listType: 'picture',
        uploadType: 'picture',
        vertical: true,
        accept: 'image/*',
      },
    },
  };
}
