module.exports = ({config, mode}) => {
  config.module.rules.push({
    test: /\.less$/,
    loaders: ['style-loader', 'css-loader', 'less-loader'],
  });
  config.module.rules.push({
    test: /\.(js|jsx)$/,
    use: {
      loader: 'babel-loader?cacheDirectory',
      options: {
        presets: ["@babel/preset-env", "@babel/preset-react"],
        plugins: [
          ["@babel/plugin-proposal-class-properties", { "loose": false }]
        ]
      }
    }
  });
  // config.module.rules.push({
  //   test: /\.(ts|tsx)$/,
  //   use: {
  //     loader: 'babel-loader?cacheDirectory',
  //     options: {
  //       presets: [['react-app', {flow: false, typescript: true}]],
  //       plugins: [
  //         ["@babel/plugin-proposal-decorators", {"legacy": true}]
  //       ]
  //     }
  //   }
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
