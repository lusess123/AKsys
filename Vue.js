var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "vue", "./Core", "./Util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var vue_1 = require("vue");
    var core = require("./Core");
    var util = require("./Util");
    var _com = function (h, name, tpl, pro, props) {
        var _vueObj = vue_1.default.extend({
            name: name,
            props: props,
            template: tpl
        });
        vue_1.default.component(name, _vueObj);
        return h(name, { props: { vm: pro } });
    };
    exports.tpl = function (h) {
        return function (tpl, pro) {
            return _com(h, "tplName" + core.getUniId(), tpl, pro ? pro : {}, ["vm"]);
        };
    };
    exports.vm = function (objPro) {
        return "\n       <temple   v-if=\"vm." + objPro + "\"  :is=\"vm." + objPro + ".render()\"  :vm=\"vm." + objPro + "\"></temple>\n   ";
    };
    exports.registAndGetVueComName = function (vm, vueObj) {
        //debugger ;
        if (!vueObj) {
            if (vm) {
                if (vm._VueObj) {
                    vueObj = vm._VueObj;
                }
                else {
                    if (vm["constructor"]["_vueObj"]) {
                        vueObj = vm["constructor"]["_vueObj"];
                    }
                }
            }
        }
        if (!vueObj)
            throw { error: "组件不能为空", vm: vm };
        var _name = "";
        if (!vueObj.name) {
            return _name = "tempvuecom";
        }
        else {
            debugger;
            if (vm["constructor"]) {
                _name = util.getFunName(vm["constructor"]);
            }
            else {
                _name = vueObj.name;
            }
        }
        _name = _name + core.getUniId();
        //Vue.component('FormType'+name,com);
        vue_1.default.component(_name, vueObj);
        return _name;
    };
    exports.vueTpl = function (name, components) {
        return function (tpl) {
            var _vueObj = vue_1.default.extend({
                name: name,
                props: ["vm"],
                template: tpl,
                components: components,
                renderError: function (h, err) {
                    return h('pre', { title: err.stack, style: { color: 'red' } }, err.stack);
                },
                mounted: function () {
                    // alert("控件完成了");
                    if (this.$props.vm) {
                        if (this.$props.vm.getEvent) {
                            var _event = this.$props.vm.getEvent();
                            var me_1 = this;
                            _event.on("forceUpdate", function () {
                                alert("页面组件更新");
                                // debugger ;
                                me_1.$forceUpdate();
                            });
                        }
                    }
                }
            });
            var _obj = _vueObj;
            return _obj;
        };
    };
    exports.com = function (vue, _a) {
        var components = (_a === void 0 ? { components: undefined } : _a).components;
        return function (constructor) {
            //debugger ;
            var _type = typeof (vue);
            if (_type == "function")
                constructor["_vueObj"] = vue;
            else {
                if (_type == "string")
                    constructor["_vueObj"] = exports.vueTpl(util.getFunName(constructor) + core.getUniId(), components)(vue);
                else {
                    var _base = { name: "com" + core.getUniId(), props: ["vm"] };
                    constructor["_vueObj"] = vue_1.default.extend(__assign({}, _base, vue));
                }
            }
        };
    };
});
