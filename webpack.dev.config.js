const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
//const webpack = require('webpack')
const WriteFilePlugin = require('write-file-webpack-plugin')
// const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/js/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    watchContentBase: true,
    compress: true,
    open: true,
    overlay: true,
    port: 9000,
  },
  module: {
    rules: [{
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: { minimize: false }
        }]
      },
      {
        test: /\.css$/,
        use: [
          //'style-loader',
          MiniCSSExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './'
              }
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|gif|bmp|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 20000,
            name: 'img/[name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new WriteFilePlugin({
      test: /^(?!.*(hot)).*/,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCSSExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css'
    }),
  ]
}