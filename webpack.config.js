const path = require('path')
const webpack = require('webpack')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default

const dirApp = path.join(__dirname, 'app')
const dirShared = path.join(__dirname, 'shared')
const dirStyles = path.join(__dirname, 'styles')
const dirNode = 'node_modules'

module.exports = {

  entry: [
    path.join(dirApp, 'index.js'),
    path.join(dirStyles, 'index.scss')
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true
  },

  resolve: {
    modules: [
      dirApp,
      dirShared,
      dirNode,
      dirStyles
    ]
  },

  devServer: {
    hot: true
  },

  plugins: [

    new CopyWebpackPlugin({
      patterns: [
        {
          from: './shared',
          to: ''
        }
      ]
    }),

    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
      scriptLoading: 'defer'
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].css'
    }),
  ],

  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          'html-loader'
        ]
      },


      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },

      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      },

      {
        test: /\.(jpe?g|png|gif|svg|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]'
        }
      },

      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      }

    ]
  }
}
