/**
 * Created by nihilism on 03/06/2017.
 */
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
    var UNAUTHORIZED = 401;
    var INTERNAL_ERROR = 500;
    var BAD_GATEWAY = 502;
    var GATEWAY_TIMEOUT = 504;
    var OK = 200;
    exports.default = {
        OK: OK,
        UNAUTHORIZED: UNAUTHORIZED,
        INTERNAL_ERROR: INTERNAL_ERROR,
        BAD_GATEWAY: BAD_GATEWAY,
        GATEWAY_TIMEOUT: GATEWAY_TIMEOUT
    };
});
