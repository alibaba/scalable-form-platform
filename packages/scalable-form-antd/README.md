# ScalableFormAntd组件
## 简介
XFormAntd渲染组件可以用来方便的渲染在XFormBuilder中搭建的表单到PC Web页面中。XFormAntd组件是基于XFormCore组件的扩展，表单的渲染基于antd中Form相关的组件。

## 引入方式
```
npm install -S scalable-form-antd
```
• 组件引入前端页面前端技术栈为React
```
import ScalableFormAntd from 'scalable-form';
ReactDOM.render((<ScalableFormAntd {...props} />), document.getElementById('container'));
```
注意XForm组件外部依赖react、react-dom、prop-types、antd、ScalableFormCore，这几个库需要在package.json或CDN中自行引入
关于与antd的样式的适配：
1. 组件中默认build出来的index.js包中没有打包antd的样式，需要自行加载对应的antd的样式文件；
2. 对于使用babel-plugin-import按需加载antd的工程，组件中提供build出来的index-with-antd-bundle.js，这个包中使用babel-plugin-import打包了组件中需要使用的antd样式

## 非React技术栈引入ScalableFormAntd
由于XForm体系依赖React技术栈，如果需要使用，还是需要在你的工程中引入React。这种引入方式的实质就是React官网推荐的在非React技术栈中引入React组件的方式
- 方案一，通过ReactDOM.render方法的返回值获取ScalableForm instance
```
var formElement = React.createElement(ScalableFormAntd, {
    formCode: '',
    // 组件的其它props
});
var formInstance = ReactDOM.render(formElement, document.getElementById('form-container'));
// 从xformInstance里面访问XForm的API
console.log('ScalableFormAntd formData:', formInstance.XFormCurrentFormData());
```

- 方案二，通过ref来获取ScalableForm instance
```
var scalableFormInstance;
React.createElement(ScalableFormAntd, {
    ref: (c) => {
        scalableFormInstance = c;
    },
    formCode: '',
    // XForm的其它props
});
ReactDOM.render(xformElement, document.getElementById('xform-container'));
// 从xformInstance里面访问XForm的API
console.log('XFormAntd formData:', xformInstance.XFormCurrentFormData());
```
