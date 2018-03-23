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
    const vueEvent = require("./VueEvent");
    class App {
        static getUniId() {
            this.fUniId++;
            return this.fUniId;
        }
        static initAppEvent(event) {
            this.fAppEvent = event;
        }
        static GetAppEvent() {
            if (!this.fAppEvent) {
                this.fAppEvent = new vueEvent.EventBus().HookEvent;
            }
            return this.fAppEvent;
        }
    }
    App.fAppEvent = null;
    App.fUniId = 0;
    exports.fetchEvent = function () {
        return new vueEvent.EventBus().VmEvent;
    };
    exports.default = App;
});
