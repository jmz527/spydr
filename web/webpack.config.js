const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

// https://webpack.js.org/guides/getting-started
// http://gaearon.github.io/react-hot-loader/getstarted/
// https://quantizd.com/webpack-4-extract-css-with-mini-css-extract-plugin/
// https://github.com/webpack-contrib/mini-css-extract-plugin

module.exports = {
  mode: 'development',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    '@babel/polyfill',
    __dirname + '/src/index.js'
  ],
  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '~': path.resolve('src/')
    },
  },
  module: {
    rules:[
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loaders: ['react-hot-loader/webpack', 'babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false, sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ],
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-loader',
        query: {
          variable: 'data',
          interpolate : '\\{\\{(.+?)\\}\\}',
          evaluate : '\\[\\[(.+?)\\]\\]'
        }
      },
      // {
      //   test: /\.less$/,
      //   loaders: ['style-loader', 'css-loader', 'less-loader']
      // },
      // this handles images
      {
        test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
        use: 'file-loader?name=[name].[ext]?[hash]'
      },
      // this handles video
      {
        test: /\.m4v$|\.mp4$/,
        use: 'file-loader?name=[name].[ext]&mimetype=video/[ext]?[hash]'
      },
      // the following rules handle font extraction
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.otf(\?.*)?$/,
        use: 'file-loader?name=/fonts/[name].[ext]&mimetype=application/font-otf'
      }
    ],
  },
  node: {
    fs: 'empty'
  },
  devServer: {
    contentBase: __dirname + '/public',
    disableHostCheck: true   // get rid of 'Invalid Host Header' message
  },
  plugins: [
    new CleanWebpackPlugin({
      root: __dirname + '/build',
      verbose: true,
      dry: false, // true for simulation
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          configFile: '.eslintrc.json',
          failOnWarning: false,
          failOnError: false
        }
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Hot template',
      template: '!!html-loader!src/assets/index.ejs',
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new Dotenv({
      path: path.resolve(__dirname, './.env'),
      systemvars: true
    })
  ],
};
