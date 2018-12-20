const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const getCommonConfig = require('./common.config');

module.exports = merge(getCommonConfig('production'), {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].min.js',
    library: 'ReactFocusOnScroll',
    libraryTarget: 'umd',
  },
  entry: {
   main: path.resolve(__dirname, '../src/FocusOnScroll.tsx'),
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      uglifyOptions: { ecma: 8 },
    }),
    new CompressionPlugin({
      test: /\.js$/,
      minRatio: 0.8,
    }),
  ],
  externals: [
    'react',
  ],
});
