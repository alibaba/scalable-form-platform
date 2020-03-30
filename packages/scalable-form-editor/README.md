# scalable-form-editor
用于可视化编排适用于scalable-form-platform的 [JSON Schema](http://json-schema.org/) 协议的前端组件

A visual editor component to edit dynamic form json schema used by scalable-form-platform 

![GitHub](https://img.shields.io/github/license/alibaba/scalable-form-platform?style=flat)
![npm](https://img.shields.io/npm/v/scalable-form-antd?color=blue&style=flat)
![Travis (.org)](https://api.travis-ci.com/alibaba/scalable-form-platform.svg?branch=daily%2F0.0.2)
![](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/alibaba/scalable-form-platform?style=flat)
![GitHub issues](https://img.shields.io/github/issues/alibaba/scalable-form-platform)

查看文档 [https://scalable-form-platform.github.io/#/](https://scalable-form-platform.github.io/#/)

<p align="center">
  <a href="https://scalable-form-platform.github.io/" target="_blank">
    <img max-width="1440" src="https://img.alicdn.com/tfs/TB1MnB9z7Y2gK0jSZFgXXc5OFXa-1440-900.png" />
  </a>
</p>

## ✨ 特性/features
- 🛳 企业级解决方案和高稳定性
- 📦 开箱即用的动态表单渲染sdk
- ⚙️ 完整的开发工具支持
- 🗄 服务端支持和用于管理表单的可独立部署站点

<br />

- 🛳 Enterprise-class Solutions for web form
- 📦 A set of high-quality react components for rendering web forms from JSON schema out of the box
- ⚙️ Whole package of development tools
- 🗄 Server support and independently deployable sites

<br />

- 更多特性请查看文档 [https://scalable-form-platform.github.io/#/](https://scalable-form-platform.github.io/#/)

## 快速开始

![](https://img.alicdn.com/tfs/TB1m6eUz4v1gK0jSZFFXXb0sXXa-2874-1486.png)

### 安装

使用 npm 安装

```bash
npm i scalable-form-editor -S
```

如果你的网络环境不佳，推荐使用 [cnpm](https://developer.aliyun.com/mirror/NPM)。

## 引入使用
```javascript
import ScalableFormEditor from "scalable-form-editor";
```
> 注意, scalable-form-editor组件外部依赖react、react-dom、prop-types、antd、scalable-form-core, scalable-form-antd，这几个库需要在package.json或CDN中自行引入

> 注意，关于与antd的样式的适配：1. 组件中默认build出来的index.js包中没有打包antd的样式，需要自行加载对应的样式文件；2. 对于使用babel-plugin-import按需加载antd的工程，组件中提供build出来的index-with-antd-bundle.js，这个包中使用babel-plugin-import打包了组件中需要使用的antd样式

## 使用表单编辑器组件
在第一个例子中，我们需要渲染一个表单可视化编辑器。

```javascript
import React from "react";
import ScalableFormEditor from "scalable-form-editor";
import "./styles.css";

class FormEditorExample extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
        uiSchema: {},
        jsonSchema: {},
        bizData: {},
        sequence: [],
        formData: {}
    };
  }

  handleSubmit = (formCode, {jsonSchema,uiSchema, formData, bizData, sequence}) => {
    console.log('submit by editor', jsonSchema, uiSchema, formData, bizData, sequence);
  };

  render() {
    return (
      <ScalableFormEditor
        jsonSchema={this.state.jsonSchema}
        uiSchema={this.state.uiSchema}
        formData={this.state.formData}
        bizData={this.state.bizData}
        sequence={this.state.sequence}
        onSubmit={this.handleSubmit}
      />
    );
  }
}
```

## 📦 包管理/Packages
我们使用[Lerna](https://github.com/lerna/lerna)来进行包管理，所以本仓库会发布多个包到npm，包括：

This repository is a monorepo that we manage using [Lerna](https://github.com/lerna/lerna). That means that we actually publish several packages to npm from the same codebase, including:

|  Package | NPMVersions  | Documents  | Description  |
|  ----  | ----  | ----  | ----  |
| scalable-form-antd  | [![npm](https://img.shields.io/npm/v/scalable-form-antd.svg?color=blue&style=flat)](https://www.npmjs.com/package/scalable-form-antd) | [![](https://img.shields.io/badge/API%20Docs-site-green.svg?style=flat)](https://scalable-form-platform.github.io/#/zh/scalable_form_antd) | 基于react-jsonschema-form，结合ant-design的动态表单渲染sdk |
| scalable-form-antd-mobile  | [![npm](https://img.shields.io/npm/v/scalable-form-antd-mobile.svg?color=blue&style=flat)](https://www.npmjs.com/package/scalable-form-antd-mobile)|[![](https://img.shields.io/badge/API%20Docs-site-green.svg?style=flat)](https://scalable-form-platform.github.io/#/zh/scalable_form_antd_mobile)| 基于react-jsonschema-form，结合ant-design-mobile的动态表单渲染sdk，适用于移动端的渲染sdk |
| scalable-form-editor  | [![npm](https://img.shields.io/npm/v/scalable-form-editor.svg?color=blue&style=flat)](https://www.npmjs.com/package/scalable-form-editor) | [![](https://img.shields.io/badge/API%20Docs-site-green.svg?style=flat)](https://scalable-form-platform.github.io/#/zh/scalable-form-editor)| 表单可视化编辑器，可视化编排表单，产出scalable-form-antd和scalable-form-antd-mobile可用的schema |
| scalable-form-server  | [![npm](https://img.shields.io/npm/v/scalable-form-server.svg?color=blue&style=flat)](https://www.npmjs.com/package/scalable-form-server) | [![](https://img.shields.io/badge/API%20Docs-site-green.svg?style=flat)](https://scalable-form-platform.github.io/#/zh/%E4%BD%BF%E7%94%A8Node)| 服务端sdk，用户可以基于scalable-form-server保存表单配置。服务端sdk提供一个可用的表单站点，提供表单编排，表单管理，表单投放，数据回流分析的能力。 |
