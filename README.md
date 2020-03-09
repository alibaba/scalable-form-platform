Scalable Form Platform是基于表单数据协议（JSON Schema）的动态表单解决方案（包括前端渲染sdk，editor，server）。Scalable Form Platform基于业务广泛认可react-jsonschema-form，结合ant-design做上层定制开发，并且对其表单能力做了相应扩展，提供了包括数据源（动态获取表单部分数据的协议）、校验器（在表单提交前动态校验表单部分字段的合法性的协议）、国际化、字段级联等经实践证明非常有用的特性。

# 组成
## scalable-form-antd
基于react-jsonschema-form，结合ant-design的动态表单渲染sdk

## scalable-form-antd-mobile
基于react-jsonschema-form，结合ant-design-mobile的动态表单渲染sdk，适用于移动端的渲染sdk

## scalable-form-editor
表单可视化编辑器，可视化编排表单，产出scalable-form-antd和scalable-form-antd-mobile可用的schema

## scalable-form-server
服务端sdk，用户可以基于scalable-form-server保存表单配置。服务端sdk提供一个可用的表单站点，提供表单编排，表单管理，表单投放，数据回流分析的能力。
