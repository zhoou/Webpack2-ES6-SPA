import _ from 'lodash';
require('bootstrap/dist/css/bootstrap.min.css');
require('cssPath/main.css');

function component() {
  let navs = document.querySelector('#navs');
  navs.addEventListener('click', function (event) {
    event.preventDefault();
    //navs.querySelector('a').className= "";
    let target = event.target;
    target.className += 'active';
    //console.log(navs.querySelectorAll('a'))
  });
}

// 相当于 $(document).ready(eventHandler);
if (document.readyState === 'complete' || document.readyState !== 'loading') {
  component();
} else {
  document.addEventListener('DOMContentLoaded', component());
}
