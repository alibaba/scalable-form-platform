declare module '*.md' {
  const content: string;
  export = content;
}
declare module "*.json" {
  const value: any;
  export default value;
}
declare module '*.less' {
  const content2: {[className: string]: string};
  export default content2;
}
declare module '@storybook/addon-actions';
declare module 'storybook-addon-specifications';
declare module 'enzyme-adapter-react-16';
declare module '@storybook/addon-knobs';
declare module '@storybook/addon-info';
declare module '@storybook/addon-jest';
// declare module '@storybook/addon-console';
// declare module 'storybook-readme';

declare module 'nodemon-webpack-plugin';
declare module 'koa-webpack-middleware';
declare var PKG_VERSION: string;
declare var PKG_NAME: string;
