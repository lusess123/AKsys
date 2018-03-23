(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "iview", "js-cookie"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const iView = require("iview");
    const Cookies = require("js-cookie");
    exports.Notify = (mesg) => {
        iView.Message.error({
            content: mesg,
            closable: true,
            duration: 5
        });
    };
    exports.getCookie = (key) => {
        return Cookies.get(key);
    };
    exports.setCookie = (key, val) => {
        Cookies.set(key, val);
    };
});
