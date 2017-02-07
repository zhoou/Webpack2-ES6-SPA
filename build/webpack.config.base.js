var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//var validate = require('webpack-validator');  目前最新v2.3版本无法兼容检测webpack2

var config = {
    entry: {
        main: './app/index.js',
        vendor: ['jquery', 'bootstrap']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),  // __dirname 当前路径
        publicPath: '/',
        sourceMapFilename: '[name].map'
    },
    resolve: {
        extensions: ['.js', '.json'],
        modules: [path.join(__dirname, 'src'), 'node_modules']
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new ExtractTextPlugin('styles.css'),
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
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../index.html'),
            chunks: ['main', 'vendor'],
            inject: 'true',
            hasg: 'true',
            minify: {
                removeComments: false,
                collapseWhitespace: false
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            }
        ]
    }
};

module.exports = config;
//module.exports = validate(config);