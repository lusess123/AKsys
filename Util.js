(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getFunName = function (s) {
        if (typeof s == "string")
            return s;
        s = s.toString();
        var m = s.match(/function\s+([^(]+)/);
        if (m)
            return m[1];
        else
            return "";
    };
    exports.sortBy = function (attr, rev) {
        //第二个参数k没有传递 默认升序排列
        if (rev == undefined) {
            rev = 1;
        }
        else {
            rev = (rev) ? 1 : -1;
        }
        return function (a, b) {
            a = a[attr];
            b = b[attr];
            if (a < b) {
                return rev * -1;
            }
            if (a > b) {
                return rev * 1;
            }
            return 0;
        };
    };
    function formatTimeFormCode(code, fmt) {
        code = code * 1000;
        return formatDate(new Date(code), fmt);
    }
    exports.formatTimeFormCode = formatTimeFormCode;
    function formatDate(date, fmt) {
        var o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'q+': Math.floor((date.getMonth() + 3) / 3),
            'S': date.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
        return fmt;
    }
    exports.formatDate = formatDate;
});
