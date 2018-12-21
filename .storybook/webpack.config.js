const merge = require('webpack-merge');
const TSDocgenPlugin = require("react-docgen-typescript-webpack-plugin");
const commonConfig = require('../webpack/common.config');

module.exports = merge(commonConfig(), {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        loader: 'file-loader',
      }
    ]
  },
  plugins: [
    new TSDocgenPlugin(),
  ]
});

