(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Core", "./Ioc", "./net", "./Dom", "./Vue", "./Util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const core = require("./Core");
    exports.core = core;
    const ioc = require("./Ioc");
    exports.ioc = ioc;
    const net = require("./net");
    exports.net = net;
    const dom = require("./Dom");
    exports.dom = dom;
    const vue = require("./Vue");
    exports.vue = vue;
    const util = require("./Util");
    exports.util = util;
});
