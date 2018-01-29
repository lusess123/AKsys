var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./../index", "./../event", "vue"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var index_1 = require("./../index");
    var event_1 = require("./../event");
    var vue_1 = require("vue");
    var BaseCom = /** @class */ (function () {
        function BaseCom(config) {
            this.fIsShow = false;
            this.AppEventFunDic = {};
            if (config) {
                if (config.UniId) {
                    this.UniId = config.UniId;
                }
            }
        }
        BaseCom.prototype.forceUpdate = function () {
            this.getEvent().emit("forceUpdate");
        };
        BaseCom.prototype.getEvent = function () {
            if (!this.fLoacalEventBus) {
                this.fLoacalEventBus = event_1.fetchEvent();
            }
            return this.fLoacalEventBus;
        };
        BaseCom.prototype.toogleShow = function () {
            this.fIsShow = !this.fIsShow;
        };
        BaseCom.prototype.renderString = function () {
            return index_1.core.json(this);
        };
        BaseCom.prototype.getConstructName = function () {
            // debugger ;
            return index_1.util.getFunName(this["constructor"]);
        };
        BaseCom.prototype.setRx = function (pro, obj) {
            var me = this;
            vue_1.default.set(me, pro, obj ? obj : {});
        };
        BaseCom.prototype.getVueObj = function () {
            if (this._VueObj)
                return this._VueObj;
            else {
                if (this["constructor"] && this["constructor"]["_vueObj"]) {
                    return this["constructor"]["_vueObj"];
                }
                else {
                    throw " 没有挂载组件...";
                }
            }
        };
        BaseCom.prototype.render = function () {
            return index_1.vue.registAndGetVueComName(this, this.getVueObj());
        };
        BaseCom.prototype.listenAppEvent = function (name, uniId, fun) {
            var _fun = event_1.default
                .GetAppEvent()
                .addListener(name + uniId, fun);
            this.AppEventFunDic[name + uniId] = _fun;
            //eventFile.App.GetAppEvent().removeListener(name + uniId, fun);
        };
        BaseCom.prototype.emitAppEvent = function (name, sign) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            // eventFile
            // .App
            (_a = event_1.default
                .GetAppEvent()).emit.apply(_a, [name + sign].concat(args));
            var _a;
        };
        BaseCom = __decorate([
            index_1.ioc.PlugIn({ BaseType: "ICom", RegName: "BaseCom" }),
            index_1.vue.com("\n<div>\n<Card>\n  <p slot=\"title\"   @click=\"vm.toogleShow()\"  >\n        <a>{{vm.getConstructName()}}   <Icon type=\"android-happy\" color=\"green\"></Icon>\n        </a>\n  </p>\n  <div   v-if=\"vm.fIsShow\"    >   {{vm.renderString()}} </div>\n</Card>\n</div>\n"),
            __metadata("design:paramtypes", [Object])
        ], BaseCom);
        return BaseCom;
    }());
    exports.BaseCom = BaseCom;
});
