const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

// Credits: https://hackernoon.com/webpack-creating-dynamically-named-outputs-for-wildcarded-entry-files-9241f596b065
const entryArray = glob.sync('./src/lambda/**/index.ts');

const entryObject = entryArray.reduce((acc, item) => {
  let name = path.dirname(item.replace('./src/lambda', ''));
  // conforms with Webpack entry API
  // Example: { ingest: './src/ingest/index.ts' }
  acc[name] = item;
  return acc;
}, {});

module.exports = {
  entry: entryObject,
  devtool: 'source-map',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ })],
  // Output directive will generate build/<function-name>/index.js
  output: {
    filename: '[name]/index.js',
    path: path.resolve(__dirname, 'build'),
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    // Credit to Richard Buggy!!
    libraryTarget: 'commonjs2',
  },
};
