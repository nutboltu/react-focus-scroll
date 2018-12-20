const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProduction = (env) => env === 'production';
const isDevelopment = (env) => env === 'development';

const getCommonConfig = (env = 'development') => ({
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
    fs: 'empty',
    child_process: 'empty',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.scss', '.css'],
  },
  module: {
    rules: [
      /**
       * Typescript loaders
       */
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          sourceMap: true,
        },
        exclude: [
          /node_modules/
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[hash].min.css",
    })
  ],
});

module.exports = getCommonConfig;
