var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import Vue from 'vue';
import * as core from "./Core";
import * as util from "./Util";
import event from "./event";
import * as $ from "jquery";
var _com = function (h, name, tpl, pro, props) {
    var _vueObj = Vue.extend({
        name: name,
        props: props,
        template: tpl
    });
    Vue.component(name, _vueObj);
    return h(name, { props: { vm: pro } });
};
export var tpl = function (h) {
    return function (tpl, pro) {
        return _com(h, "tplName" + core.getUniId(), tpl, pro ? pro : {}, ["vm"]);
    };
};
export var vm = function (objPro) {
    return "\n       <temple   v-if=\"vm." + objPro + " && vm." + objPro + ".render\"  :is=\"vm." + objPro + ".render()\"  :vm=\"vm." + objPro + "\"></temple>\n   ";
};
export var registAndGetVueComName = function (vm, vueObj) {
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
        // debugger;
        if (vm["constructor"]) {
            _name = util.getFunName(vm["constructor"]);
        }
        else {
            _name = vueObj.name;
        }
    }
    _name = _name + core.getUniId();
    //Vue.component('FormType'+name,com);
    Vue.component(_name, vueObj);
    return _name;
};
export var vueTpl = function (name, components, comOpt) {
    return function (tpl) {
        //  const _vueObj = Vue.extend(
        var _vueOpt = {
            data: function () {
                return {
                    _forceUpdateFun: null
                };
            },
            name: name,
            props: ["vm"],
            template: tpl,
            components: components,
            renderError: function (h, err) {
                return h('pre', { title: err.stack, style: { color: 'red' } }, err.stack);
            },
            beforeCreated: function () {
                this.vm.$store = this.$store;
            },
            created: function () {
                this.vm.$store = this.$store;
            },
            beforeUpdate: function () {
                this.vm.$store = this.$store;
            },
            watch: {
                vm: function (newVm) {
                    if (newVm) {
                        var _event = newVm.getEvent();
                        var me_1 = this;
                        if (this._forceUpdateFun) {
                            _event.off("forceUpdate", this._forceUpdateFun);
                        }
                        this._forceUpdateFun = function () {
                            me_1.$forceUpdate();
                        };
                        _event.on("forceUpdate", this._forceUpdateFun);
                    }
                }
            },
            mounted: function () {
                // alert("控件完成了");
                this.vm.$store = this.$store;
                if (this.$props.vm) {
                    if (this.$props.vm.getEvent) {
                        var _event = this.$props.vm.getEvent();
                        var me_2 = this;
                        if (this._forceUpdateFun) {
                            _event.off("forceUpdate", this._forceUpdateFun);
                        }
                        this._forceUpdateFun = function () {
                            me_2.$forceUpdate();
                        };
                        _event.on("forceUpdate", this._forceUpdateFun);
                    }
                    if (this.$props.vm.MesgList) {
                        var _msd_1 = this.$props.vm.MesgList;
                        if (this.$el) {
                            if (this.$el) {
                                var _$dom = this.$el;
                                if (_$dom) {
                                    _$dom
                                        .on("mousedown", function (event) {
                                        if (event["which"] == 3) {
                                            event.stopPropagation();
                                            var _$t = $(this);
                                            if (!_$t.hasClass("acs-module-warning")) {
                                                $(this).addClass("acs-module-warning");
                                                var _lis = "";
                                                if (_msd_1.List) {
                                                    _msd_1
                                                        .List
                                                        .forEach(function (l) {
                                                        _lis += ("<li>" + l + "</li>");
                                                    });
                                                }
                                                var _$p = $("<div class='acs-module-warninHg-content'><h5>" + _msd_1.Name + "</h5><div>" + (_msd_1.Content
                                                    ? _msd_1.Content
                                                    : "未知组件") + "</div><ul class='list'>" + _lis + "</ul></div>");
                                                $("body").append(_$p);
                                                _$p.css({ top: event.clientY, left: event.clientX });
                                                _$t.data("div", _$p);
                                            }
                                            else {
                                                _$t.removeClass("acs-module-warning");
                                                _$t
                                                    .data("div")
                                                    .remove();
                                            }
                                            return false;
                                        }
                                    });
                                }
                            }
                        }
                    }
                }
            }
        };
        comOpt = comOpt ? comOpt : {};
        comOpt = __assign({}, _vueOpt, comOpt);
        //  );
        var _obj = Vue.extend(comOpt);
        return _obj;
    };
};
export var com = function (vue, comOpt) {
    if (comOpt === void 0) { comOpt = {}; }
    return function (constructor) {
        //debugger ;
        comOpt = __assign({}, comOpt, { extends: constructor["_vueObj"] });
        var components = comOpt.components;
        var _type = typeof (vue);
        if (_type == "function")
            constructor["_vueObj"] = vue;
        else {
            if (_type == "string")
                constructor["_vueObj"] = vueTpl(util.getFunName(constructor) + core.getUniId(), components, comOpt)(vue);
            else {
                var _base = { name: "com" + core.getUniId(), props: ["vm"] };
                constructor["_vueObj"] = Vue.extend(__assign({}, _base, vue, comOpt));
            }
        }
    };
};
export function getTempVueName(vueProty, name) {
    var _name = name;
    if (!_name) {
        _name = util.getFunName(vueProty);
    }
    _name = _name + event.getUniId();
    return _name;
}
export var compute = function (name) {
    return function (target, propertyKey, descriptor) {
        var _baseVue = target.constructor["_vueObj"];
        if (_baseVue) {
            //constructor["_vueObj"]  = 
            target.constructor["_vueObj"] = {
                computed: (_a = {},
                    _a[name ? name : propertyKey] = function () {
                        return this.vm[propertyKey];
                    },
                    _a),
                extends: _baseVue
            };
        }
        var _a;
    };
};
