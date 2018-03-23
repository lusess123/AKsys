(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Dom"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const domFile = require("./Dom");
    exports.ErrorCode = {
        "-1": "SYS_ERR",
        "0": "NO_ERR",
        "40400": "NOT_FOUND",
        "43001": "REQ_MUST_GET",
        "43002": "REQ_MUST_POST",
        "44000": "PARAMS_INVALID"
    };
    exports.ErrorDesc = {
        SYS_ERR: "系统繁忙，此时请开发者稍候再试",
        NO_ERR: "请求成功",
        NOT_FOUND: "API不存在",
        REQ_MUST_POST: "需要POST请求",
        REQ_MUST_HTTPS: "需要HTTPS请求",
        PARAMS_INVALID: "参数不合法"
    };
    exports.requestHook = (req, callback) => {
        const _reqData = req.data;
        const _data = _reqData.data;
        const _error = _reqData.error;
        if (_error) {
            const _errorCode = exports.ErrorCode[_error.toString()];
            if (_errorCode) {
                const _errorTxt = exports.ErrorDesc[_errorCode];
                domFile.Notify(_errorTxt);
            }
            else {
                domFile.Notify("未知错误");
            }
        }
        else {
            callback(_data);
        }
    };
    exports.json = (obj, replacer, space) => {
        replacer = replacer ? replacer : null;
        space = space ? space : 2;
        return JSON.stringify(obj, replacer, space);
    };
    exports.parseJson = (str) => {
        return JSON.parse(str);
    };
    exports.alert = function (msg) {
        if (typeof (msg) == "object") {
            exports.alertObj(msg);
        }
        else
            window["alert"](msg);
    };
    exports.notify = (mesg) => {
        domFile.Notify(mesg);
    };
    exports.alertObj = function (obj) {
        exports.alert(exports.json(obj));
    };
    exports.pureObj = function (obj) {
        const _str = exports.json(obj);
        return exports.parseJson(_str);
    };
    let UniId = 0;
    exports.getUniId = function () {
        return (UniId++).toString();
    };
    exports.cast = function (obj) {
        let _res = obj;
        return _res;
    };
    exports.log = (a, { sign, info } = { sign: "", info: "" }) => {
        //let sign = config.sign ;
        //let info = config.sign ;
        info = info + "\r\n" + new Date();
        if (exports.Options.IsDev) {
            if (typeof (a) == "object") {
                a = exports.json(a);
            }
            if (sign) {
                if (exports.Options.Point[sign]) {
                    exports.alert(info + "\r\n" + a);
                }
                else {
                    console.log(info);
                    console.log(a);
                }
            }
            else {
                exports.alert(info + "\r\n" + a);
            }
        }
        else {
            console.log(info);
            console.log(a);
        }
    };
    exports.Options = {
        IsDev: true,
        Point: {}
    };
    function applyMixins(derivedCtor, baseCtors) {
        baseCtors.forEach(baseCtor => {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            });
        });
    }
    exports.applyMixins = applyMixins;
});
