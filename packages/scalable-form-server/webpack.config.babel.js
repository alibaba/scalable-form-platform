import fs from 'fs';
import path from 'path';
import webpack from 'webpack';

const isDevelopment = (process.env.NODE_ENV === 'development');
const isProduction = !isDevelopment;

const nodeModules = {};

fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

const config = {
  target: 'node',
  stats: 'errors-only',
  devtool: (isDevelopment ? 'source-map' : undefined),
  mode: (isDevelopment ? 'development' : 'production'),
  entry: {
    'index': [
      path.resolve(__dirname, './src/index.ts')
    ]
  },
  output: {
    path: path.join(__dirname, './build/'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  externals: nodeModules,
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  node: {
    __dirname: false,
    __filename: false,
    fs: "empty",
    tls: "empty"
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: isProduction ? 'production' : 'development',
      ADMIN_PATH: isProduction ? 'https://dev.g.alicdn.com/xform/xform-open/0.0.1/admin.js' : 'http://localhost:3001/assets/admin.js',
      PORTAL_PATH: isProduction ? 'https://dev.g.alicdn.com/xform/xform-open/0.0.1/portal.js' : 'http://localhost:3001/assets/portal.js',
      PORTAL_MOBILE_PATH: isProduction ? 'https://dev.g.alicdn.com/xform/xform-open/0.0.1/portal-mobile.js' : 'http://localhost:3001/assets/portal-mobile.js',
      SET_PATH: isProduction ? 'https://dev.g.alicdn.com/xform/xform-open/0.0.1/setup.js' : 'http://localhost:3001/assets/setup.js',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    }),
    new webpack.NormalModuleReplacementPlugin(
      /\.(css|less)$/,
      'node-noop'
    )
  ]
};

export default {
  ...config
};
