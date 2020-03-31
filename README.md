# scalable-form-platform
基于动态表单协议（[JSON Schema](http://json-schema.org/)）的表单解决方案，提供了基于 [ant-design](https://github.com/ant-design/ant-design) 和 [ant-design-mobile](https://github.com/ant-design/ant-design-mobile) 的前端表单渲染引擎sdk、可视化表单编辑器和可独立部署镜像。

A solution for editing and publish dynamic web forms with visual editor, providing react components for rendering web forms from [JSON schema](http://json-schema.org/) using [ant-design](https://github.com/rjsf-team/react-jsonschema-form) or [ant-design-mobile](https://github.com/ant-design/ant-design-mobile), an visual editor component to edit dynamic form json schema and an server library helping you build an dynamic form system.

![GitHub](https://img.shields.io/github/license/alibaba/scalable-form-platform?style=flat)
![npm](https://img.shields.io/npm/v/scalable-form-antd?color=blue&style=flat)
[![Docker Cloud Build Status](https://img.shields.io/docker/cloud/build/lvshuncn/scalable-form-platform)](https://hub.docker.com/r/lvshuncn/scalable-form-platform)
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

## 📦 包管理/Packages
我们使用[Lerna](https://github.com/lerna/lerna)来进行包管理，所以本仓库会发布多个包到npm，包括：

This repository is a monorepo that we manage using [Lerna](https://github.com/lerna/lerna). That means that we actually publish several packages to npm from the same codebase, including:

|  Package | NPMVersions  | Documents  | Description  |
|  ----  | ----  | ----  | ----  |
| scalable-form-antd  | [![npm](https://img.shields.io/npm/v/scalable-form-antd.svg?color=blue&style=flat)](https://www.npmjs.com/package/scalable-form-antd) | [![](https://img.shields.io/badge/API%20Docs-site-green.svg?style=flat)](https://scalable-form-platform.github.io/#/zh/scalable_form_antd) | 基于react-jsonschema-form，结合ant-design的动态表单渲染sdk |
| scalable-form-antd-mobile  | [![npm](https://img.shields.io/npm/v/scalable-form-antd-mobile.svg?color=blue&style=flat)](https://www.npmjs.com/package/scalable-form-antd-mobile)|[![](https://img.shields.io/badge/API%20Docs-site-green.svg?style=flat)](https://scalable-form-platform.github.io/#/zh/scalable_form_antd_mobile)| 基于react-jsonschema-form，结合ant-design-mobile的动态表单渲染sdk，适用于移动端的渲染sdk |
| scalable-form-editor  | [![npm](https://img.shields.io/npm/v/scalable-form-editor.svg?color=blue&style=flat)](https://www.npmjs.com/package/scalable-form-editor) | [![](https://img.shields.io/badge/API%20Docs-site-green.svg?style=flat)](https://scalable-form-platform.github.io/#/zh/scalable-form-editor)| 表单可视化编辑器，可视化编排表单，产出scalable-form-antd和scalable-form-antd-mobile可用的schema |
| scalable-form-server  | [![npm](https://img.shields.io/npm/v/scalable-form-server.svg?color=blue&style=flat)](https://www.npmjs.com/package/scalable-form-server) | [![](https://img.shields.io/badge/API%20Docs-site-green.svg?style=flat)](https://scalable-form-platform.github.io/#/zh/%E4%BD%BF%E7%94%A8Node)| 服务端sdk，用户可以基于scalable-form-server保存表单配置。服务端sdk提供一个可用的表单站点，提供表单编排，表单管理，表单投放，数据回流分析的能力。 |

## ⛳️ 快速开始
如何通过Scalable Form渲染一个动态表单呢。
这里，我们向您展示一个例子。在这个例子中，我们会渲染一个表单，表单支持用户填写自己的名字（name字段）。

### 🎾 使用scalable-form-antd渲染表单
> [scalable-form-antd](https://www.npmjs.com/package/scalable-form-antd)使用ant-design组件，根据表单数据协议（JSONSchema）渲染表单。
```bash
npm i scalable-form-antd -S //先安装
```

Scalable Form是一套基于表单数据协议（JSONSchema）的动态表单解决方案。所以我们需要写一下表单规则描述（schema），并且将schema作为scalable-form-antd的props传入。
> 写这个schema会很繁琐，不过放心，Scalable Form的一大创新就是支持使用可视化的编排组件[scalable-form-editor](https://www.npmjs.com/package/scalable-form-editor)编排产生这个schema，继续看，您会了解如何使用这个editor

```jsx harmony
// 这个例子，使用scalable-form-antd渲染了一个表单
import React from "react";
import "./styles.css";
import ScalableForm from "scalable-form-antd";

export default class FormExample extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: ""
      }
    };
    // 规则jsonSchema，用于描述表单字段信息，包括字段类型，长度等
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
        }
      }
    };
    // 规则uiSchema，用于描述表单UI组件信息，包括输入框的placeholder等字段
    this.uiSchema = {
      name: {
        "ui:help": '关于"名称"字段的帮助说明',
        "ui:options": {
          placeholder: "请输入名称"
        }
      }
    };
  }

  handleChanged = (formData) => {
    console.log("ScalableForm Changed!", formData);
    this.setState({
      formData: { ...formData }
    });
  };

  handleSubmit = (formData) => {
    console.log("ScalableForm Submitted!", formData);
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

查看第一个表单的例子在 [codesandbox](https://codesandbox.io/s/late-bird-xform-antd-x6qoo?from-embed) 的演示，您可以访问查看[scalable-form-antd](https://scalable-form-platform.github.io/#/zh/scalable_form_antd)的更多信息

<iframe
     src="https://codesandbox.io/embed/late-bird-x6qoo?fontsize=14&hidenavigation=1&theme=dark&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="late-bird-x6qoo"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>
   
使用scalable-form-antd-mobile，我们还可以支持移动端表单渲染，[点击这里查看更多介绍](https://scalable-form-platform.github.io/#/zh/%E7%A7%BB%E5%8A%A8%E7%AB%AF%E6%B8%B2%E6%9F%93)

### 🏈 使用scalable-form-editor可视化编排表单
```bash
npm i scalable-form-editor -S
```
[scalable-form-editor](https://www.npmjs.com/package/scalable-form-editor)是可视化编排表单的前端组件，您可以通过scalable-form-editor快速搭建您的表单。
```javascript
import React from "react";
import "./styles.css";
import ScalableFormEditor from "scalable-form-editor";

class FormEditorExample extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
        uiSchema: {},
        jsonSchema: {},
        bizData: {},
        sequence: []
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

在 [codesandbox](https://codesandbox.io/s/late-bird-xform-antd-x6qoo?from-embed) 查看scalable-form-editor的演示，您可以访问查看[scalable-form-editor](https://scalable-form-platform.github.io/#/zh/scalable-form-editor)的更多文档

<iframe
     src="https://codesandbox.io/embed/late-bird-xform-antd-mobile-fz9m4?fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="late-bird-xform-editor"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>


### 使用Scalable Form站点
实际业务使用中，Scalable Form整体上由三个主要部分组成，表单渲染端，表单配置端，表单存储的服务端。

- 表单配置端可以通过可视化的方式来编排产出渲染端可用的表单配置，并支持用户填写表单。
- 渲染端使用配置端编排出来的表单配置，渲染为可用的表单。
- 服务端用于存储表单配置。不仅如此，服务端还可以串联起整个Scalable Form的使用场景，提供配置站点（权限控制，场景配置，自定义组件配置），表单维护管理，表单填写页面，表单数据存储展示与简单的数据分析能力。

通过docker镜像的方式，你可以很方便地在本地或者服务器部署一个Scalable Form服务器。
你可以从[docker hub](https://hub.docker.com/repository/docker/lvshuncn/scalable-form-platform/general)搜索到Scalable Form服务器的docker镜像
如果你在本地测试，你可以执行以下命令通过`scalable-form-platform`镜像开启一个Scalable Form服务器，端口绑定3000
```
docker run -d -p 3000:3000 lvshuncn/scalable-form-platform
```
开启后，访问`http://localhost:3000/xform/admin`即可使用Scalable Form独立站点
> 默认情况下docker中的Scalable Form会开启demo模式，demo模式仅用于快速演示，服务器以内存数据库的方式存储数据，重启后数据会清空，不要在生产环境下使用。生产环境使用方法请[查看文档](https://scalable-form-platform.github.io/#/zh/%E4%BD%BF%E7%94%A8dockerr)

<p align="center">
  <a href="https://scalable-form-platform.github.io/" target="_blank">
    <img max-width="1440" src="https://img.alicdn.com/tfs/TB1MnB9z7Y2gK0jSZFgXXc5OFXa-1440-900.png" />
  </a>
</p>

## 🖥 浏览器支持/Environment Support

* Modern browsers and Internet Explorer 9+ (with [polyfills](https://ant.design/docs/react/getting-started#Compatibility))

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE9, IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

