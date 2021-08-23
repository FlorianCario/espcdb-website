const path = require('path')
const webpack = require('webpack')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default

const dirApp = path.join(__dirname, 'app')
const dirShared = path.join(__dirname, 'shared')
const dirStyles = path.join(__dirname, 'styles')
const dirPages = path.join(__dirname, 'views/pages')
const dirNode = 'node_modules'

const notHomePages = [
    'boutique/index',
    'contact/index',
    'convocations/index',
    'documents/index',
    'partenaires/index',
    'actualites/index',
    'actualites/actu-template/index',
    'actualites/actu-template-2/index'
]

const mapFolders = notHomePages.map(filename => {
    return new HtmlWebpackPlugin({
        filename: `${filename}.html`,
        template: path.join(dirPages, `${filename}.html`)
    })
})

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
        hot: true,
    },

    plugins: [

        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: 'body'
        }),

        ...mapFolders,

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './shared',
                    to: ''
                }
            ]
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
