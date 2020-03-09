module.exports = ({config, mode}) => {
  config.module.rules.push({
    test: /\.less$/,
    loaders: ['style-loader', 'css-loader', 'less-loader'],
  });
  // config.module.rules.push({
  //   test: /\.stories\.js?$/,
  //   loaders: [require.resolve('@storybook/source-loader')],
  //   enforce: 'pre',
  // });
  config.output = {
    publicPath: '/',
    library: ["ScalableFormSystem"],
    libraryTarget: "umd",
  };
  config.externals = {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'prop-types': {
      root: 'PropTypes',
      commonjs2: 'prop-types',
      commonjs: 'prop-types',
      amd: 'prop-types'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    },
    'react-dom/server': {
      root: 'ReactDOMServer',
      commonjs2: 'react-dom/server',
      commonjs: 'react-dom/server',
      amd: 'react-dom/server'
    },
    "antd": {
      root: 'antd',
      commonjs2: 'antd',
      commonjs: 'antd',
      amd: 'antd'
    },
    "antd-mobile": {
      root: 'antd-mobile',
      commonjs2: 'antd-mobile',
      commonjs: 'antd-mobile',
      amd: 'antd-mobile'
    },
    "moment": {
      root: 'moment',
      commonjs2: 'moment',
      commonjs: 'moment',
      amd: 'moment'
    }
  };
  return config;
};
