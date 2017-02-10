const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.config.base');

module.exports = webpackMerge(commonConfig, {
    output: {
        filename: 'js/[name].[chunkhash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('prod')
            }
        })
    ]
})