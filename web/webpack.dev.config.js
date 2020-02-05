const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = require('./webpack.config.js'); // inherit from the main config file

module.exports.mode = 'development';

// disable the hot reload
module.exports.entry = [
  __dirname + '/src/index.js'
];

// switch the devServer path
module.exports.devServer = {
  contentBase: __dirname + '/build',
};

// export the html template from src/assets dir
module.exports.plugins[2] = new HtmlWebpackPlugin({
  title: 'Dev template',
  template: '!!html-loader!src/assets/index.ejs',
  minify: false,
  hash: false,
  cache: true
});

// // export css to a separate file
// module.exports.module.rules[1] = {
//   test: /\.less$/,
//   loader: ExtractTextPlugin.extract('css-loader!less-loader')
// };
// module.exports.module.rules[2] = {
//   test: /\.scss$/,
//   loader: ExtractTextPlugin.extract('css-loader!sass-loader')
// };
// module.exports.plugins.push(
//   new ExtractTextPlugin('main.css')
// );
