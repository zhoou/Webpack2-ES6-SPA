var webpack = require('webpack');
var webpackConfig = require('./webpack.config.prod');

webpack(webpackConfig, function (err, stats) {
    if (err) throw err;
})