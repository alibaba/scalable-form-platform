import { LanguagePack, Locale } from 'scalable-form-tools';
import PickerItem from '../schema/PickerItem';
import WidgetKey from 'scalable-form-tools/src/widgets';
import getMessageByKey from 'scalable-form-tools/src/locale/getMessageByKey';
import localMessages from '../localMessages';

export default function getPickerList(locale: Locale, languagePack: LanguagePack): PickerItem[] {
  function getMessage(key: string) {
    return getMessageByKey(key, locale, localMessages, languagePack);
  }
  return [
    // {
    //   key: WidgetKey.ObjectField,
    //   icon: '&#xe674;',
    //   label: '嵌套',
    //   platform: ['laptop', 'mobile'],
    // },
    {
      key: WidgetKey.LabelWidget,
      icon: '&#xe674;',
      label: getMessage('configSchemaLabelLabel'),
      platform: ['laptop', 'mobile'],
    },
    {
      key: WidgetKey.GroupWidget,
      icon: '&#xe8b6;',
      label: getMessage('configSchemaGroupLabel'),
      platform: ['laptop', 'mobile'],
    },
    {
      key: WidgetKey.TextWidget,
      icon: '&#xe6fe;',
      label: getMessage('configSchemaInputLabel'),
      platform: ['laptop', 'mobile'],
    },
    {
      key: WidgetKey.TextareaWidget,
      icon: '&#xe61e;',
      label: getMessage('configSchemaTextareaLabel'),
      platform: ['laptop', 'mobile'],
    },
    {
      key: WidgetKey.NumberWidget,
      icon: '&#xe6f6;',
      label: getMessage('configSchemaNumberLabel'),
      platform: ['laptop', 'mobile'],
    },
    {
      key: WidgetKey.RadioWidget,
      icon: '&#xe671;',
      label: getMessage('configSchemaRadioLabel'),
      platform: ['laptop', 'mobile'],
    },
    {
      key: WidgetKey.CheckboxWidget,
      icon: '&#xe671;',
      label: getMessage('configSchemaCheckboxLabel'),
      platform: ['laptop', 'mobile'],
    },
    {
      key: WidgetKey.BooleanCheckboxWidget,
      icon: '&#xe671;',
      label: getMessage('configSchemaBoolCheckboxLabel'),
      platform: ['laptop', 'mobile'],
    },
    {
      key: WidgetKey.BooleanSwitchWidget,
      icon: '&#xe685;',
      label: getMessage('fieldSchemaBoolSwitchLabel'),
      platform: ['laptop', 'mobile'],
    },
    {
      key: WidgetKey.SelectWidget,
      icon: '&#xe6ce;',
      label: getMessage('configSchemaSelectLabel'),
      platform: ['laptop', 'mobile'],
    },
    {
      key: WidgetKey.MultiSelectWidget,
      icon: '&#xe6fc;',
      label: getMessage('configSchemaMultiSelectLabel'),
      platform: ['laptop', 'mobile'],
    },
    {
      key: WidgetKey.RateWidget,
      icon: '&#xe648;',
      label: getMessage('configSchemaRateLabel'),
      platform: ['laptop'],
    },
    {
      key: WidgetKey.SliderWidget,
      icon: '&#xe794;',
      label: getMessage('fieldSchemaSliderLabel'),
      platform: ['laptop', 'mobile'],
    },
    {
      key: WidgetKey.SliderRangeWidget,
      icon: '&#xe794;',
      label: getMessage('fieldSchemaSliderRangeLabel'),
      platform: ['laptop', 'mobile'],
    },
    {
      key: WidgetKey.PictureWidget,
      icon: '&#xe616;',
      label: getMessage('configSchemaUploadLabel'),
      platform: ['laptop', 'mobile'],
    },
    {
      key: WidgetKey.DatePickerWidget,
      icon: '&#xe629;',
      label: getMessage('configSchemaDateLabel'),
      platform: ['laptop', 'mobile'],
    },
    {
      key: WidgetKey.DateTimePickerWidget,
      icon: '&#xe62e;',
      label: getMessage('configSchemaDateTimeLabel'),
      platform: ['laptop', 'mobile'],
    },
    {
      key: WidgetKey.DateRangePickerWidget,
      icon: '&#xe629;',
      label: getMessage('configSchemaDateRangeLabel'),
      platform: ['laptop', 'mobile'],
    },
  ];
}
