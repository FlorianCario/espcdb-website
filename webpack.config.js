const path = require('path')
const webpack = require('webpack')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");

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
    'actualites/actu-template-2/index',
    'equipes/seniors1/index',
    'equipes/seniors2/index',
    'equipes/seniors3/index',
    'equipes/seniors4/index',
    'equipes/veterans/index',
    'club/benevoles/index',
    'club/conseil/index',
    'club/historique/index'
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
        filename: '[name].[hash:8].js',
        sourceMapFilename: '[name].[hash:8].map',
        chunkFilename: '[id].[hash:8].js'
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
        open: true,
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
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    },
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
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
        },
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
}
