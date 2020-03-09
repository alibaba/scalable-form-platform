import path from 'path';
// import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

const ENV_DEVELOPMENT = 'development';

function getDevtool(env) {
  if (env === ENV_DEVELOPMENT) {
    return 'source-map';
  }
}

function getConfig(env) {
  const config = {
    devtool: getDevtool(env),
    mode: env,
    entry: {
      'admin': [
        path.resolve(__dirname, './src/admin/index.tsx')
      ],
      'portal': [
        path.resolve(__dirname, './src/portal/index.tsx')
      ],
      'portal-mobile': [
        path.resolve(__dirname, './src/portal-mobile/index.tsx')
      ],
      'setup': [
        path.resolve(__dirname, './src/setup/index.tsx')
      ]
    },
    output: {
      publicPath: '/assets/',
      library: '[name]',
      libraryTarget: 'umd',
      path: path.resolve(__dirname, './build'),
      filename: '[name].js'
    },
    resolve: {extensions: ['.ts', '.tsx', '.js', '.less']},
    plugins: [],
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
              plugins: [
                ["@babel/plugin-proposal-class-properties", { "loose": false }],
                "@babel/plugin-transform-arrow-functions"
              ]
            }
          }]
        },
        {
          test: /\.(js|jsx)$/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
              plugins: [
                ["@babel/plugin-proposal-class-properties", { "loose": false }],
                "@babel/plugin-transform-arrow-functions"
              ]
            }
          }]
        },
        {
          test: /\.less$/,
          use: [{
            loader: 'style-loader' // creates style nodes from JS strings
          }, {
            loader: 'css-loader' // translates CSS into CommonJS
          }, {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              javascriptEnabled: true
            }
          }]
        },
        {
          test: /\.css$/,
          use: [{
            loader: 'style-loader' // creates style nodes from JS strings
          }, {
            loader: 'css-loader' // translates CSS into CommonJS
          }]
        }
      ],
    },
    externals: {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      },
      "antd": {
        root: 'antd',
        commonjs2: 'antd',
        commonjs: 'antd',
        amd: 'antd'
      },
      "lodash": {
        root: 'lodash',
        commonjs2: 'lodash',
        commonjs: 'lodash',
        amd: 'lodash'
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
      },
    }
  };
  if (env === ENV_DEVELOPMENT) {
    config.devServer = {
      contentBase: path.join(__dirname, './'),
      compress: true,
      port: 3001,
      https: false,
      hot: true,
      inline: true,
      progress: false,
      disableHostCheck: true,
    };
  } else {
    // config.optimization = {
    //   minimizer: [new UglifyJsPlugin()],
    // };
  }
  return config;
}

const config = getConfig(process.env.NODE_ENV);

module.exports = config;
