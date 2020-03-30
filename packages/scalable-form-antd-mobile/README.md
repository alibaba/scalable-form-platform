# scalable-form-antd-mobile
基于动态表单协议（[JSON Schema](http://json-schema.org/)）和 [ant-design-mobile](https://github.com/ant-design/ant-design-mobile) 的前端表单渲染引擎sdk

A React component for rendering web forms in mobile browser from [JSON schema](http://json-schema.org/) using [ant-design-mobile](https://github.com/ant-design/ant-design-mobile)

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

### 安装

使用 npm 安装

```bash
npm i scalable-form-antd-mobile -S
```

如果你的网络环境不佳，推荐使用 [cnpm](https://developer.aliyun.com/mirror/NPM)。

### 引入使用
```javascript
import ScalableForm from "scalable-form-antd-mobile";
```
> 注意, scalable-form-antd组件外部依赖react、react-dom、prop-types、antd-mobile、scalable-form-core，这几个库需要在package.json或CDN中自行引入

> 注意，关于与antd的样式的适配：1. 组件中默认build出来的index.js包中没有打包antd-mobile的样式，需要自行加载对应的样式文件；2. 对于使用babel-plugin-import按需加载antd-mobile的工程，组件中提供build出来的index-with-antd-bundle.js，这个包中使用babel-plugin-import打包了组件中需要使用的antd-mobile样式

### Hello World
在第一个例子中，我们需要渲染一个表单，支持用户填写name，并自行选择所在城市。
注意，scalable-form是一套基于表单数据协议（JSONSchema）的动态表单解决方案。所以我们需要按照[react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form)的规则书写一下表单规则描述（schema），并且将schema作为scalable-form的props转入组件。
> 写这个schema会很繁琐，不过放心，scalable-form的一大创新点就在于支持使用可视化的编排组件editor编排产生这个schema，您可以[访问这里](https://scalable-form-platform.github.io/#/zh/%E4%BD%BF%E7%94%A8%E5%8F%AF%E8%A7%86%E5%8C%96%E7%BC%96%E8%BE%91%E5%99%A8)，查看editor的使用方法

```javascript
import React from "react";
import ScalableForm from "scalable-form-antd-mobile";
import "./styles.css";

export default class FormExample extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: "",
        city: "hangzhou"
      }
    };
    this.jsonSchema = {
      title: "Scalable Form render sdk with Ant Design components",
      description: "",
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string",
          title: "名称",
          default: "",
          maxLength: 15
        },
        city: {
          type: "string",
          title: "请选择城市",
          default: "",
          enum: ["beijing", "shanghai", "hangzhou"],
          enumNames: ["北京", "上海", "杭州"]
        }
      }
    };
    this.uiSchema = {
      name: {
        "ui:help": '关于"名称"字段的帮助说明',
        "ui:options": {
          placeholder: "请输入名称"
        }
      },
      city: {
        "ui:widget": "radio",
        "ui:options": {
          vertical: false,
          validate: [
            {
              type: "empty",
              message: "请选择"
            }
          ]
        }
      }
    };
  }

  handleChanged = (formData, bizData) => {
    console.log("ScalableForm Changed!", formData);
    console.log("ScalableForm Changed!", bizData);
    this.setState({
      formData: { ...formData }
    });
  };

  handleSubmit = (formData, bizData) => {
    console.log("ScalableForm Submitted!", formData);
    console.log("ScalableForm Submitted!", bizData);
  };

  render() {
    return (
      <div className="scalable-form-demo-element">
        <ScalableForm
          jsonSchema={this.jsonSchema} //jsonSchema用于表述表单字段信息
          uiSchema={this.uiSchema} //uiSchema用于控制表单字段的UI组件
          formData={this.state.formData} //formData是表单中填写的字段数据
          onChange={this.handleChanged}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}
```

### 查看更多文档
您可以访问 [![](https://img.shields.io/badge/API%20Docs-site-green.svg?style=flat)](https://scalable-form-platform.github.io/#/zh/scalable_form_antd_mobile) 查看更多API文档
   
## 📦 包管理/Packages
我们使用[Lerna](https://github.com/lerna/lerna)来进行包管理，所以本仓库会发布多个包到npm，包括：

This repository is a monorepo that we manage using [Lerna](https://github.com/lerna/lerna). That means that we actually publish several packages to npm from the same codebase, including:

|  Package | NPMVersions  | Documents  | Description  |
|  ----  | ----  | ----  | ----  |
| scalable-form-antd  | [![npm](https://img.shields.io/npm/v/scalable-form-antd.svg?color=blue&style=flat)](https://www.npmjs.com/package/scalable-form-antd) | [![](https://img.shields.io/badge/API%20Docs-site-green.svg?style=flat)](https://scalable-form-platform.github.io/#/zh/scalable_form_antd) | 基于react-jsonschema-form，结合ant-design的动态表单渲染sdk |
| scalable-form-antd-mobile  | [![npm](https://img.shields.io/npm/v/scalable-form-antd-mobile.svg?color=blue&style=flat)](https://www.npmjs.com/package/scalable-form-antd-mobile)|[![](https://img.shields.io/badge/API%20Docs-site-green.svg?style=flat)](https://scalable-form-platform.github.io/#/zh/scalable_form_antd_mobile)| 基于react-jsonschema-form，结合ant-design-mobile的动态表单渲染sdk，适用于移动端的渲染sdk |
| scalable-form-editor  | [![npm](https://img.shields.io/npm/v/scalable-form-editor.svg?color=blue&style=flat)](https://www.npmjs.com/package/scalable-form-editor) | [![](https://img.shields.io/badge/API%20Docs-site-green.svg?style=flat)](https://scalable-form-platform.github.io/#/zh/scalable-form-editor)| 表单可视化编辑器，可视化编排表单，产出scalable-form-antd和scalable-form-antd-mobile可用的schema |
| scalable-form-server  | [![npm](https://img.shields.io/npm/v/scalable-form-server.svg?color=blue&style=flat)](https://www.npmjs.com/package/scalable-form-server) | [![](https://img.shields.io/badge/API%20Docs-site-green.svg?style=flat)](https://scalable-form-platform.github.io/#/zh/%E4%BD%BF%E7%94%A8Node)| 服务端sdk，用户可以基于scalable-form-server保存表单配置。服务端sdk提供一个可用的表单站点，提供表单编排，表单管理，表单投放，数据回流分析的能力。 |
