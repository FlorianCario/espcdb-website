const path = require('path')

const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { merge } = require('webpack-merge')
const config = require('./webpack.config')

module.exports = merge(config, {
    mode: 'production',

    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/espcdb-website/'
    },

    plugins: [
        new CleanWebpackPlugin(),
        new ImageMinimizerPlugin({
            minimizerOptions: {
                plugins: [
                    ["gifsicle", { interlaced: true }],
                    ["jpegtran", { progressive: true }],
                    ["optipng", { optimizationLevel: 5 }],
                ],
            },
        }),
    ]
})
