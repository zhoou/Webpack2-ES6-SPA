import _ from 'lodash';
import common from 'commonJs'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'cssPath/main.css';
import axios from 'axios'

function component() {
    // 初始化
    loadHtml('default');

    let navs = document.querySelector('#navs');
    navs.addEventListener('click', function(event) {
        event.preventDefault();

        // 去除同目录下所有a元素的active样式
        let a = this.querySelectorAll('a');
        for (let i = 0; i < a.length; i++) {
            common.removeClass(a[i], 'active');
        }

        let target = event.target;
        if (target.nodeName === 'A') {
            common.addClass(target, 'active');

            let href = target.getAttribute('data-href');
            loadHtml(href);
        }
    });
}

function loadHtml(name) {
    let htmlPath = './views/' + name + '.html';
    axios.get(htmlPath).then(function(response) {
        document.querySelector('#content').innerHTML = response.data;
        let currentMod = require('./' + name + '.js');
        currentMod.init();
    }).catch(function(err) {
        console.log(err);
    });
}

// 相当于 $(document).ready(eventHandler);
if (document.readyState === 'complete' || document.readyState !== 'loading') {
    component();
} else {
    document.addEventListener('DOMContentLoaded', component());
}