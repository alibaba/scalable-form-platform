// TODO post-css
// TODO 整体项目build，需要postcss

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
module.exports = ({ config, mode }) => {
  config.entry = [
    path.resolve(__dirname, '../../../node_modules/@storybook/core/dist/server/preview/globals.js'),
    path.resolve(__dirname, './config.js'),
    path.resolve(__dirname, '../../../node_modules/webpack-hot-middleware/client.js?reload=true&quiet=true'),
  ];
  if (!config.plugins) {
    config.plugins = [];
  }
  config.devtool = false;
  // config.plugins.push(new BundleAnalyzerPlugin());
  config.module.rules = [
    {
      test: /\.(less|css)$/,
      loaders: ['style-loader', 'css-loader', 'less-loader'],
    }, {
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      use: ['cache-loader', {
        loader: 'thread-loader',
        options: {
          workers: 8,
        },
      }, {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          plugins: [
            ['@babel/plugin-proposal-class-properties', { 'loose': false }],
            '@babel/plugin-transform-arrow-functions',
          ],
        },
      }],
    },
  ];
  config.output = {
    publicPath: '/',
    library: ['ScalableFormSystem'],
    libraryTarget: 'umd',
  };
  config.resolve.extensions = ['*', '.js', '.jsx', '.ts', '.tsx']
  config.externals = Object.assign({}, config.externals, {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'prop-types': {
      root: 'PropTypes',
      commonjs2: 'prop-types',
      commonjs: 'prop-types',
      amd: 'prop-types',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
    'react-dom/server': {
      root: 'ReactDOMServer',
      commonjs2: 'react-dom/server',
      commonjs: 'react-dom/server',
      amd: 'react-dom/server',
    },
    'antd': {
      root: 'antd',
      commonjs2: 'antd',
      commonjs: 'antd',
      amd: 'antd',
    },
    'antd-mobile': {
      root: 'antd-mobile',
      commonjs2: 'antd-mobile',
      commonjs: 'antd-mobile',
      amd: 'antd-mobile',
    },
    'moment': {
      root: 'moment',
      commonjs2: 'moment',
      commonjs: 'moment',
      amd: 'moment',
    },
    'lodash': '_',
    '@ant-design/icons': 'icons',
    'quill': 'Quill',
    'ajv': 'Ajv',
  });
  // console.log(JSON.stringify(config, null, 2));
  return config;
};
