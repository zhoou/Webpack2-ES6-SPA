import _ from 'lodash';

function component () {
    var main = document.getElementById('main');
    var element = document.createElement('div');
    element.innerHTML = _.join(['hello','world!'], ' ');
    main.appendChild(element);
}

// 相当于 $(document).ready(eventHandler);
if (document.readyState === 'complete' || document.readyState !== 'loading') {
  component();
} else {
  document.addEventListener('DOMContentLoaded', component());
}
