/**
 * ui:widget枚举
 */
enum WidgetKey {
  /**
   * 单行文本框
   * @type {string}
   */
  TextWidget = 'TextWidget',
  /**
   * 多行文本框
   * @type {string}
   */
  TextareaWidget = 'TextareaWidget',
  /**
   * 富文本框
   * @type {string}
   */
  RichTextWidget = 'RichTextWidget',
  /**
   * 数字输入
   * @type {string}
   */
  NumberWidget = 'NumberWidget',
  /**
   * 评分
   * @type {string}
   */
  RateWidget = 'RateWidget',
  /**
   * boolean单项复选
   * @type {string}
   */
  BooleanCheckboxWidget = 'BooleanCheckboxWidget',
  /**
   * boolean开关
   * @type {string}
   */
  BooleanSwitchWidget = 'BooleanSwitchWidget',
  /**
   * 多选
   * @type {string}
   */
  CheckboxWidget = 'CheckboxWidget',
  /**
   * 单选
   * @type {string}
   */
  RadioWidget = 'RadioWidget',
  /**
   * 日期选择
   * @type {string}
   */
  DatePickerWidget = 'DatePickerWidget',
  /**
   * 日期事件选择
   * @type {string}
   */
  DateTimePickerWidget = 'DateTimePickerWidget',
  /**
   * 日期范围选择
   * @type {string}
   */
  DateRangePickerWidget = 'DateRangePickerWidget',
  /**
   * 滑动数字选择
   * @type {string}
   */
  SliderWidget = 'SliderWidget',
  /**
   * 滑动数字范围选择
   * @type {string}
   */
  SliderRangeWidget = 'SliderRangeWidget',
  /**
   * 下拉框
   * @type {string}
   */
  SelectWidget = 'SelectWidget',
  /**
   * 多选下拉框
   * @type {string}
   */
  MultiSelectWidget = 'MultiSelectWidget',
  /**
   * 图片上传
   * @type {string}
   */
  PictureWidget = 'PictureWidget',
  /**
   * 文件上传
   * @type {string}
   */
  FileWidget = 'FileWidget',
  /**
   * 水平表单分隔
   * @type {string}
   */
  GroupWidget = 'GroupWidget',
  /**
   * label纯文本展示
   * @type {string}
   */
  LabelWidget = 'LabelWidget',
  /**
   * 匿名组件，用于兜底组件没有注册的场景
   * @type {string}
   */
  AnonymousWidget = 'AnonymousWidget',
  /**
   * Object展示
   * @type {string}
   */
  ObjectField = 'ObjectField',
  /**
   * OptionEditor
   * @type {string}
   */
  OptionEditor = 'OptionEditor',
}

export default WidgetKey;
