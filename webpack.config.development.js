const { merge } = require('webpack-merge')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const config = require('./webpack.config')

module.exports = merge(config, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        devMiddleware: {
            writeToDisk: true
        },
        client: {
            overlay: true,
            progress: true
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    }
})
