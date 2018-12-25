const webpack = require('webpack');

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
});

module.exports = getCommonConfig;
