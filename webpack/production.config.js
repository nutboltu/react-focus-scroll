const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const getCommonConfig = require('./common.config');

module.exports = merge(getCommonConfig('production'), {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    library: 'ReactFocusOnScroll',
    libraryTarget: 'umd',
  },
  entry: {
   main: path.resolve(__dirname, '../src/components/FocusOnScroll.tsx'),
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
  externals: [
    'react',
  ],
});
