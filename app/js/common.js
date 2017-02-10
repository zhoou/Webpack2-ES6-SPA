let common = {
    // 判断元素是否存在某样式
    hasClass: function (elements, cName) {
        return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)")); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断 
    },
    // 新增样式
    addClass: function (elements, cName) {
        if (!common.hasClass(elements, cName)) {
            elements.className += " " + cName;
        };
    },
    // 删除样式
    removeClass: function (elements, cName) {
        if (common.hasClass(elements, cName)) {
            elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " "); // replace方法是替换 
        };
    }
};

module.exports = common;
