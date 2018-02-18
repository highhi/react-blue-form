const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const SRC = './demo';
const DIST = './dist';
const DEV = process.env.NODE_ENV || 'development';
const DEV_PORT = process.env.PORT || 4321;

module.exports = {
  entry: {
    "bundle": `${SRC}/index.js`,
  },

  devtool: 'inline-source-map',

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, DIST),
  },

  module: {
    rules: [
      // use bable
      { test: /\.js?$/, use: 'babel-loader', exclude: /node_modeules/ },
      // use typescript
      // { test: /\.tsx?$/, use: 'awesome-typescript-loader', exclude: /node_modlues/ },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
    }),

    new CleanWebpackPlugin(['dist']),

    new webpack.optimize.ModuleConcatenationPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      // minChunks: Infinity, or
      minChunks: module => {
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),
  ],
  
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  }
};