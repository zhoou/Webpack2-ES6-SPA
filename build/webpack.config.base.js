var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
var glob = require('glob');
// var validate = require('webpack-validator');   // 目前最新v2.3版本无法兼容检测webpack2

var config = {
    entry: {
        index: './app/js/pages/index.js',
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
            chunks: ['index', 'vendor'],
            inject: 'true',
            hasg: 'true',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        })
    ]
};

let pages = Object.keys(getEntry('app/views/**/*.html', 'app/views/'));
pages.forEach(function (pathname) {
    let name = pathname.split('\\');
    let filePath = name.length > 1 ? (name[name.length - 2] === 'views' ? 'views/' : 'views/' + name[name.length - 2]) : '';
    let conf = {
        filename: filePath + name[name.length - 1] + '.html', //生成的html存放路径，相对于path
        template: path.join(__dirname, '../' + pathname + '.html'), //html模板路径
        inject: true,  //js插入的位置，true/'head'/'body'/false
        /*
        * 压缩这块，调用了html-minify，会导致压缩时候的很多html语法检查问题，
        * 如在html标签属性上使用{{...}}表达式，所以很多情况下并不需要在此配置压缩项，
        * 另外，UglifyJsPlugin会在压缩代码的时候连同html一起压缩。
        * 为避免压缩html，需要在html-loader上配置'html?-minimize'，见loaders中html-loader的配置。
         */
        minify: { //压缩HTML文件
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: false //删除空白符与换行符
        }
    };
    if (pathname in config.entry) {
        conf.favicon = 'app/images/favicon.ico';
        // conf.inject = 'body';
        // conf.chunks = ['vendor', pathname];
        // conf.hash = true;
    }
    config.plugins.push(new HtmlWebpackPlugin(conf));
});

module.exports = config;
// module.exports = validate(config);


function getEntry(globPath, pathDir) {
    let files = glob.sync(globPath);
    let entries = {},
        entry, dirname, basename, pathname, extname;

    for (let i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
        entries[pathname] = ['./' + entry];
    }
    return entries;
}