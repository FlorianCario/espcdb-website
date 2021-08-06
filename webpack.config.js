const path = require('path')
const webpack = require('webpack')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const IS_DEVELOPMENT = process.env.NODE_ENV === 'dev'

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
    filename: 'bundle.js',
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
    new webpack.DefinePlugin({
      IS_DEVELOPMENT
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: './shared',
          to: ''
        }
      ]
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
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
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
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
        test: /\.(jpe?g|png|gif|svg|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: './assets/[name][ext]'
        }
      },

      {
        test: /\.(woff(2)?)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts/',
          name: './fonts/[name].[ext]'
        }
      }

    ]
  }
}
