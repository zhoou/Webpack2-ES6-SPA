var http = require('http');
var path = require('path');
var express = require('express');
var app = express();

// Step 1: Create & configure a webpack compiler
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.dev');
var compiler = webpack(webpackConfig);

// Step 2: Attach the dev middleware to the compiler & the server
app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, 
    publicPath: webpackConfig.output.publicPath
}));

// Step 3: Attach the hot middleware to the compiler & the server
app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log, 
    path: '/__webpack_hmr', 
    heartbeat: 10 * 1000
}));

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'})
    cb()
  })
})

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

if (require.main === module) {
  var server = http.createServer(app);
  server.listen(process.env.PORT || 9091, function() {
    console.log("Listening on %j", server.address());
  });
}