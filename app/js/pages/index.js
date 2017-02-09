import _ from 'lodash';
require('bootstrap/dist/css/bootstrap.min.css');
require('cssPath/main.css');

function component() {
  let navs = document.querySelector('#navs');
  navs.addEventListener('click', function (event) {
    event.preventDefault();

    // 去除同目录下所有a元素的active样式
    let a = this.querySelectorAll('a');
    for (let i = 0; i < a.length; i++) {
      a[i].className = '';
    }

    let target = event.target;
    if (target.nodeName === 'A') {
      target.className += 'active';
    }
  });
}

// 相当于 $(document).ready(eventHandler);
if (document.readyState === 'complete' || document.readyState !== 'loading') {
  component();
} else {
  document.addEventListener('DOMContentLoaded', component());
}
