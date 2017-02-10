var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
// var validate = require('webpack-validator');   // 目前最新v2.3版本无法兼容检测webpack2

var config = {
    entry: {
        main: './app/js/pages/index.js',
        vendor: ['httpRequestJs', 'commonJs']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),  // __dirname 当前路径
        publicPath: '/',
        sourceMapFilename: '[name].map'
    },
    resolve: {
        extensions: ['.js', '.json'],
        modules: [path.join(__dirname, 'src'), 'node_modules'],
        alias: {
            'cssPath': path.resolve(__dirname, '../app/contents/css'),
            'httpRequestJs': path.resolve(__dirname, '../app/js/httpRequest.js'),
            'commonJs': path.resolve(__dirname, '../app/js/common.js'),
            'viewsPath': path.resolve(__dirname, '../app/views'),
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'file-loader',
                query: {
                    limit: 10000,
                    name: path.posix.join('static', 'fonts/[name].[hash:8].[ext]')
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ["es2015"],
                    ignore: [
                        "jquery.js",
                        "jquery.min.js",
                        "bootstrap.js",
                        "bootstrap.min.js"
                    ]
                }
            }
            // {
            //     test: require.resolve("some-module"),
            //     use: 'imports-loader?this=>window'
            // }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new ExtractTextPlugin('static/styles.css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor'], // Specify the common bundle's name.
            minChunks: Infinity
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        }),
        new ChunkManifestPlugin({
            filename: "static/chunk-manifest.json",
            manifestVariable: "webpackManifest"
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../index.html'),
            chunks: ['main', 'vendor'],
            inject: 'true',
            hasg: 'true',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'views/default.html',
            template: path.join(__dirname, '../app/views/default.html'),
            inject: 'true',
            hasg: 'true',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'views/html5demo.html',
            template: path.join(__dirname, '../app/views/html5demo.html'),
            inject: 'true',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        })
    ]
};

module.exports = config;
// module.exports = validate(config);