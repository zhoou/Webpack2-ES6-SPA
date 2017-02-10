import _ from 'lodash';
import httpRequestModel from 'httpRequestJs'
import common from 'commonJs'
require('bootstrap/dist/css/bootstrap.min.css');
require('cssPath/main.css');

function component() {
  // 初始化
  loadHtml('default');

  let navs = document.querySelector('#navs');
  navs.addEventListener('click', function (event) {
    event.preventDefault();

    // 去除同目录下所有a元素的active样式
    let a = this.querySelectorAll('a');
    for (let i = 0; i < a.length; i++) {
      common.removeClass(a[i], 'active');
    }

    let target = event.target;
    if (target.nodeName === 'A') {
      common.addClass(target, 'active');

      let href = target.getAttribute('data-href')
      loadHtml(href);
    }
  });
}

function loadHtml(name) {
  let htmlPath = './views/' + name + '.html';

  httpRequestModel.sendHttpRequest('GET', htmlPath, null, function (result) {
    document.querySelector('#content').innerHTML = result;
    let currentMod = require('./' + name + '.js');
    currentMod.init();

    // require.ensure([], function () {
    //   console.log('2222');
    //   let currentMod = require("./html5demo.js");
    //   currentMod.init();
    // }, name);

  }, function (err) {
    console.log(err);
  })
}

// 相当于 $(document).ready(eventHandler);
if (document.readyState === 'complete' || document.readyState !== 'loading') {
  component();
} else {
  document.addEventListener('DOMContentLoaded', component());
}
