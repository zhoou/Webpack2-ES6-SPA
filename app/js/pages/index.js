import _ from 'lodash';
require('bootstrap/dist/css/bootstrap.min.css')
require('cssPath/main.css')

function component () {
    // var main = document.getElementById('hello');
    // var element = document.createElement('div');
    // element.innerHTML = _.join(['hello','world!'], ' ');
    // main.appendChild(element);
}

// 相当于 $(document).ready(eventHandler);
if (document.readyState === 'complete' || document.readyState !== 'loading') {
  component();
} else {
  document.addEventListener('DOMContentLoaded', component());
}
