# scalable-form-antd
基于动态表单协议（[JSON Schema](http://json-schema.org/)）和 [ant-design](https://github.com/ant-design/ant-design) 的前端表单渲染引擎sdk

A React component for rendering web forms from [JSON schema](http://json-schema.org/) using [ant-design](https://github.com/rjsf-team/react-jsonschema-form) 

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

## 📦 包管理/Packages
我们使用[Lerna](https://github.com/lerna/lerna)来进行包管理，所以本仓库会发布多个包到npm，包括：

This repository is a monorepo that we manage using [Lerna](https://github.com/lerna/lerna). That means that we actually publish several packages to npm from the same codebase, including:

|  Package | NPMVersions  | Documents  | Description  |
|  ----  | ----  | ----  | ----  |
| scalable-form-antd  | [![npm](https://img.shields.io/npm/v/scalable-form-antd.svg?color=blue&style=flat)](https://www.npmjs.com/package/scalable-form-antd) | [![](https://img.shields.io/badge/API%20Docs-site-green.svg?style=flat)](https://scalable-form-platform.github.io/#/zh/scalable_form_antd) | 基于react-jsonschema-form，结合ant-design的动态表单渲染sdk |
| scalable-form-antd-mobile  | [![npm](https://img.shields.io/npm/v/scalable-form-antd-mobile.svg?color=blue&style=flat)](https://www.npmjs.com/package/scalable-form-antd-mobile)|[![](https://img.shields.io/badge/API%20Docs-site-green.svg?style=flat)](https://scalable-form-platform.github.io/#/zh/scalable_form_antd_mobile)| 基于react-jsonschema-form，结合ant-design-mobile的动态表单渲染sdk，适用于移动端的渲染sdk |
| scalable-form-editor  | [![npm](https://img.shields.io/npm/v/scalable-form-editor.svg?color=blue&style=flat)](https://www.npmjs.com/package/scalable-form-editor) | [![](https://img.shields.io/badge/API%20Docs-site-green.svg?style=flat)](https://scalable-form-platform.github.io/#/zh/scalable-form-editor)| 表单可视化编辑器，可视化编排表单，产出scalable-form-antd和scalable-form-antd-mobile可用的schema |
| scalable-form-server  | [![npm](https://img.shields.io/npm/v/scalable-form-server.svg?color=blue&style=flat)](https://www.npmjs.com/package/scalable-form-server) | [![](https://img.shields.io/badge/API%20Docs-site-green.svg?style=flat)](https://scalable-form-platform.github.io/#/zh/%E4%BD%BF%E7%94%A8Node)| 服务端sdk，用户可以基于scalable-form-server保存表单配置。服务端sdk提供一个可用的表单站点，提供表单编排，表单管理，表单投放，数据回流分析的能力。 |
