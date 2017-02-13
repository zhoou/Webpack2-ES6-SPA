let common = {
    // 判断元素是否存在某样式
    hasClass: function (elements, cName) {
        return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)")); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断 
    },
    // 新增样式
    addClass: function (elements, cName) {
        if (!common.hasClass(elements, cName)) {
            elements.className += "" + cName;
        };
    },
    // 删除样式
    removeClass: function (elements, cName) {
        if (common.hasClass(elements, cName)) {
            elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), ""); // replace方法是替换 
        };
    },
    // 获取webpack配置入口
    getEntry: function (globPath, pathDir) {
        var files = glob.sync(globPath);
        var entries = {},
            entry, dirname, basename, pathname, extname;

        for (var i = 0; i < files.length; i++) {
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
};

module.exports = common;
