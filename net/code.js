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
    const UNAUTHORIZED = 401;
    const INTERNAL_ERROR = 500;
    const BAD_GATEWAY = 502;
    const GATEWAY_TIMEOUT = 504;
    const OK = 200;
    exports.default = {
        OK,
        UNAUTHORIZED,
        INTERNAL_ERROR,
        BAD_GATEWAY,
        GATEWAY_TIMEOUT
    };
});
