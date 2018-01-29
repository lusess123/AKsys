(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./VueEvent"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var vueEvent = require("./VueEvent");
    var App = /** @class */ (function () {
        function App() {
        }
        App.getUniId = function () {
            this.fUniId++;
            return this.fUniId;
        };
        App.initAppEvent = function (event) {
            this.fAppEvent = event;
        };
        App.GetAppEvent = function () {
            if (!this.fAppEvent) {
                this.fAppEvent = new vueEvent.EventBus().HookEvent;
            }
            return this.fAppEvent;
        };
        App.fAppEvent = null;
        App.fUniId = 0;
        return App;
    }());
    exports.fetchEvent = function () {
        return new vueEvent.EventBus().VmEvent;
    };
    exports.default = App;
});
