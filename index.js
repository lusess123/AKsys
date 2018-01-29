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
    var core = require("./Core");
    exports.core = core;
    var ioc = require("./Ioc");
    exports.ioc = ioc;
    var net = require("./net");
    exports.net = net;
    var dom = require("./Dom");
    exports.dom = dom;
    var vue = require("./Vue");
    exports.vue = vue;
    var util = require("./Util");
    exports.util = util;
});
