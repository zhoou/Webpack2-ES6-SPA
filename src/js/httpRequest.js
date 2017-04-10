let httpRequestModel = {
    createXMLHttpRequest: function () {
        let xmlhttp = null;
        if (window.XMLHttpRequest) {// code for all new browsers
            xmlhttp = new XMLHttpRequest();
        }
        else if (window.ActiveXObject) {// code for IE5 and IE6
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return xmlhttp;
    },
    sendHttpRequest: function (method, url, data, successCallBack, errorCallBack) {
        // 创建xhr对象 
        let xhr = httpRequestModel.createXMLHttpRequest();
        // 设置xhr请求的超时时间
        xhr.timeout = 3000;
        // 设置响应返回的数据格式
        xhr.responseType = 'text';
        // 响应处理函数
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let result = xhr.responseText;
                    if (typeof successCallBack === 'function') {
                        successCallBack(result);
                    } else {
                        console.log('sendHttpRequest ： successCallBack must be a function！')
                    }
                } else {
                    if (typeof errorCallBack === 'function') {
                        errorCallBack(xhr.status + ' : ' + xhr.statusText);
                    } else {
                        console.log('sendHttpRequest ： errorCallBack must be a function！')
                    }
                }
            }
        }
        //解决缓存的转换  
        if (url.indexOf("?") >= 0) {
            url = url + "&t=" + (new Date()).valueOf();
        } else {
            url = url + "?+=" + (new Date()).valueOf();
        }
        //解决跨域的问题  
        if (url.indexOf("http://") >= 0) {
            url.replace("?", "&");
            url = "Proxy?url=" + url;
        }
        xhr.open(method, url, true);
        //如果是POST方式，需要设置请求头  
        if (method === "POST") {
            xhr.setRequestHeader("Content-type", "application/x-www-four-urlencoded");
        }
        xhr.send(data);
    }
};

module.exports = httpRequestModel;