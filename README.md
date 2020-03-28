# Scalable-form-platform
基于动态表单协议（[JSON Schema](http://json-schema.org/)）的表单解决方案，提供了前端表单渲染引擎sdk、可视化表单编辑器和可独立部署镜像。Scalable Form Platform基于[react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form)，结合[ant-design](https://github.com/ant-design/ant-design)/[ant-design-mobile](https://github.com/ant-design/ant-design-mobile)做上层定制开发，并提供了可存储表单数据的服务端sdk和可独立部署表单运营站点。

A solution for editing and publish dynamic web forms with visual editor, providing react components for rendering web forms from [JSON schema](http://json-schema.org/) using [ant-design](https://github.com/rjsf-team/react-jsonschema-form)) or [ant-design-mobile](https://github.com/ant-design/ant-design-mobile), an visual editor component to edit dynamic form json schema and an server library helping you build an dynamic form system.

## 特性/features
- 企业级解决方案和高稳定性
- 开箱即用的动态表单渲染sdk
- 完整的开发工具支持
- 服务端支持和用于管理表单的可独立部署站点

- Enterprise-class Solutions for web form
- A set of high-quality react components for rendering web forms from JSON schema out of the box
- Whole package of development tools
- Server support and independently deployable sites

## 包/Packages
这个仓库使用[Lerna](https://github.com/lerna/lerna)来进行包管理，所以本仓库会发布多个包到npm，这些包包括：。

This repository is a monorepo that we manage using [Lerna](https://github.com/lerna/lerna). That means that we actually publish several packages to npm from the same codebase, including:

|  Package | Version  | Docs  | Description  |
|  ----  | ----  | ----  | ----  |
| scalable-form-antd  | | | 基于react-jsonschema-form，结合ant-design的动态表单渲染sdk |
| scalable-form-antd-mobile  | | | 基于react-jsonschema-form，结合ant-design-mobile的动态表单渲染sdk，适用于移动端的渲染sdk |
| scalable-form-editor  | | | 表单可视化编辑器，可视化编排表单，产出scalable-form-antd和scalable-form-antd-mobile可用的schema |
| scalable-form-server  | | | 服务端sdk，用户可以基于scalable-form-server保存表单配置。服务端sdk提供一个可用的表单站点，提供表单编排，表单管理，表单投放，数据回流分析的能力。 |

## 🖥 Environment Support

* Modern browsers and Internet Explorer 9+ (with [polyfills](https://ant.design/docs/react/getting-started#Compatibility))

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| --------- | --------- | --------- | --------- | --------- | --------- |
| IE9, IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions

