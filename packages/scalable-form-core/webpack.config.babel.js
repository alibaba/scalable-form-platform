import webpack from 'webpack';
import path from 'path';

const developmentEnvironment = 'development';
const productionEnvironment = 'production';

const getPlugins = function (env) {
  const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify(env),
    __DEV__: env === developmentEnvironment
  };

  const plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS) //Tells React to build in prod mode.
  ];

  switch (env) {
    case productionEnvironment:
      break;

    case developmentEnvironment:
      plugins.push(new webpack.HotModuleReplacementPlugin());
      break;
  }

  return plugins;
};

function getConfig(env) {
  return {
    mode: env === productionEnvironment ? 'production' : 'development',
    devtool: env === productionEnvironment ? 'source-map' : 'inline-source-map', // more
    entry: {
      'index': [
        path.resolve(__dirname, './src/index.js')
      ],
    },
    target: 'web',
    output: {
      publicPath: '/',
      devtoolModuleFilenameTemplate: "scalable-form-core:///[resourcePath]?[hash]",
      devtoolFallbackModuleFilenameTemplate: "scalable-form-core:///[resourcePath]?[hash]",
      library: ["scalable-form-core"],
      libraryTarget: "umd",
      path: path.join(__dirname, 'build'), // __dirname + '/build',
      filename: '[name].js'
    },
    plugins: getPlugins(env),
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      }]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    externals: {
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
      }
    }
  };
}

const config = getConfig(process.env.NODE_ENV);

module.exports = config;
