var webpack = require('webpack');
var baseWebpackConfig = require('./webpack.config.base');
var webpackMerge = require('webpack-merge');

module.exports = webpackMerge(baseWebpackConfig, {
    devtool: '#source-map',
    output: {
        filename: '[name].[hash:8].js',
        chunkFilename: '[name].[hash:8].js'
    },
    plugins: [
        // new webpack.optimize.OccurrenceOrderPlugin(), // by default in webpack2
        new webpack.HotModuleReplacementPlugin(),  // 把plugins里面的热替换插件注释掉就可使用chunkhash
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('dev')
        })
    ]
})
