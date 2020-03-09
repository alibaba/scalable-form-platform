# scalable-form-core

## 简介
scalable-form-core是整个ScalableFormSystem对JSONSchema协议的实现与扩展，它主要是在社区组件react-jsonschema-form进行功能的扩展，包括（数据源、校验器、级联等动态表单特性）。该组件只是对上述表单逻辑的抽象层，没有对相关UI的封装。通过scalable-form-core核心组件，你可以自己实现一个自定义UI的ScalableFormSystem渲染组件。

## 引入方式
```
npm install scalable-form-core -S
```

## 组件属性与API

## 通过scalable-form-core实现自定义的渲染组件
在scalable-form-core中是没有携带任何UI的（只是react-jsonschema-form默认的bootstrap风格的UI），所有与表单UI相关的内容完全需要渲染组件自己去实现。其中主要包括两个部分：
1. 表单的布局。scalable-form-core默认的布局是字段100%纵向布局，如果需要支持复杂布局配置需要在渲染组件中自行实现
2. 通用表单字段UI。下面列出来了目前在scalable-form-core渲染组件中实现的表单字段，其中大写字母开头的为react-jsonschema-form中内置实现的基础字段，小写字母开头的为扩展基础字段。对于小写字母开头的字段，如果未实现而表单中配置了这些字段就会出现渲染失败。

## Widgets属性中需要实现的组件列表
### PC端组件：
```
{
   treeSelect: [Your Component],    // 树选择器
   multiTreeSelect: [Your Component],    // 树选择器（多选）
   SelectWidget: [Your Component],    // 下拉列表
   multiSelect: [Your Component],    // 下拉列表（多选）
   suggestSelect: [Your Component],    // suggest下拉列表
   TextWidget: [Your Component],    // 普通单行文本输入框
   TextareaWidget: [Your Component],    // 普通多行文本输入框
   UpDownWidget: [Your Component],    // 数字选择器
   DateWidget: [Your Component],    // 日期选择器
   DateTimeWidget: [Your Component],    // 日期时间选择器
   dateRange: [Your Component],    // 日期范围选择器
   RadioWidget: [Your Component],    // 普通单选
   CheckboxesWidget: [Your Component],    // 普通复选
   CheckboxWidget: [Your Component],    // 单项复选
   FileWidget: [Your Component],    // 文件/图片上传
   tag: [Your Component],    // 标签选择
   label: [Your Component],    // 普通文本
   richtext: [Your Component],    // 富文本
   rate: [Your Component],    // 评分
   cascader: [Your Component],    // 级联下拉框
   slider: [Your Component],    // 滑动选择器
   sliderRange: [Your Component],    // 滑动范围选择器
   switch: [Your Component]    // 开关选择器
}
```

###移动端组件：
```
{
   treeSelect: [Your Component],    // 树选择器
   label: [Your Component],    // 普通文本
   dateRange: [Your Component],    // 日期范围选择器
   multiSelect: [Your Component],    // 下拉选择（多选）
   UpDownWidget: [Your Component],    // 数字选择
   SelectWidget: [Your Component],    // 下拉选择
   TextWidget: [Your Component],    // 普通单行文本输入框
   TextareaWidget: [Your Component],    // 普通多行文本输入框
   DateWidget: [Your Component],    // 日期选择器
   DateTimeWidget: [Your Component],    // 日期时间选择器
   RadioWidget: [Your Component],    // 单选
   CheckboxesWidget: [Your Component],    // Switch开关选择
   CheckboxWidget: [Your Component],    // 复选
   FileWidget: [Your Component],    // 图片上传
   cascader: [Your Component],    // 级联下拉框
   slider: [Your Component],    // 滑动选择器
   sliderRange: [Your Component],    // 滑动范围选择器
   switch: [Your Component]    // Switch开关选择器（移动端这两个组件相同）
}
```
