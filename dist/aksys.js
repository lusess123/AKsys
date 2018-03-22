var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define("bootstrap", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.loadSys = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //await loadListForm();
                // return new Promise((a, b) => {
                //     //     require.ensure([],function (require) {
                //     //         require("app");
                //     //         require("app/listpage/ListForm");
                //     //          a();
                //     //  });
                // });
                return [2 /*return*/, Promise.all(_BootStrapTasks)];
            });
        });
    };
    var _BootStrapTasks = [];
    exports.addTask = function (p) {
        _BootStrapTasks.push(p);
    };
});
define("Dom", ["require", "exports", "iview", "js-cookie"], function (require, exports, iView, Cookies) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Notify = function (mesg) {
        iView.Message.error({
            content: mesg,
            closable: true,
            duration: 5
        });
    };
    exports.getCookie = function (key) {
        return Cookies.get(key);
    };
    exports.setCookie = function (key, val) {
        Cookies.set(key, val);
    };
});
define("Core", ["require", "exports", "Dom"], function (require, exports, domFile) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ErrorCode = {
        "-1": "SYS_ERR",
        "0": "NO_ERR",
        "40400": "NOT_FOUND",
        "43001": "REQ_MUST_GET",
        "43002": "REQ_MUST_POST",
        "44000": "PARAMS_INVALID"
    };
    exports.ErrorDesc = {
        SYS_ERR: "系统繁忙，此时请开发者稍候再试",
        NO_ERR: "请求成功",
        NOT_FOUND: "API不存在",
        REQ_MUST_POST: "需要POST请求",
        REQ_MUST_HTTPS: "需要HTTPS请求",
        PARAMS_INVALID: "参数不合法"
    };
    exports.requestHook = function (req, callback) {
        var _reqData = req.data;
        var _data = _reqData.data;
        var _error = _reqData.error;
        if (_error) {
            var _errorCode = exports.ErrorCode[_error.toString()];
            if (_errorCode) {
                var _errorTxt = exports.ErrorDesc[_errorCode];
                domFile.Notify(_errorTxt);
            }
            else {
                domFile.Notify("未知错误");
            }
        }
        else {
            callback(_data);
        }
    };
    exports.json = function (obj, replacer, space) {
        replacer = replacer ? replacer : null;
        space = space ? space : 2;
        return JSON.stringify(obj, replacer, space);
    };
    exports.parseJson = function (str) {
        return JSON.parse(str);
    };
    exports.alert = function (msg) {
        if (typeof (msg) == "object") {
            exports.alertObj(msg);
        }
        else
            window["alert"](msg);
    };
    exports.notify = function (mesg) {
        domFile.Notify(mesg);
    };
    exports.alertObj = function (obj) {
        exports.alert(exports.json(obj));
    };
    exports.pureObj = function (obj) {
        var _str = exports.json(obj);
        return exports.parseJson(_str);
    };
    var UniId = 0;
    exports.getUniId = function () {
        return (UniId++).toString();
    };
    exports.cast = function (obj) {
        var _res = obj;
        return _res;
    };
    exports.log = function (a, _a) {
        var _b = _a === void 0 ? { sign: "", info: "" } : _a, sign = _b.sign, info = _b.info;
        //let sign = config.sign ;
        //let info = config.sign ;
        info = info + "\r\n" + new Date();
        if (exports.Options.IsDev) {
            if (typeof (a) == "object") {
                a = exports.json(a);
            }
            if (sign) {
                if (exports.Options.Point[sign]) {
                    exports.alert(info + "\r\n" + a);
                }
                else {
                    console.log(info);
                    console.log(a);
                }
            }
            else {
                exports.alert(info + "\r\n" + a);
            }
        }
        else {
            console.log(info);
            console.log(a);
        }
    };
    exports.Options = {
        IsDev: true,
        Point: {}
    };
    function applyMixins(derivedCtor, baseCtors) {
        baseCtors.forEach(function (baseCtor) {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            });
        });
    }
    exports.applyMixins = applyMixins;
});
define("Ioc", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function applyNew(ctor, args) {
        if (args && args.length > 0) {
            return new (ctor.bind.apply(ctor, [void 0].concat(args)))();
            // }
        }
        else {
            return new ctor();
        }
    }
    exports.applyNew = applyNew;
    var Ioc = /** @class */ (function () {
        function Ioc() {
            this.fInstanceClassList = {};
            this.fInstanceSrcList = {};
        }
        Ioc.Current = function () {
            return this.fIoc;
        };
        Ioc.prototype.IocModel = function () {
            return this.fInstanceClassList;
        };
        Ioc.prototype.IocSrcModel = function () {
            return this.fInstanceSrcList;
        };
        Ioc.prototype.RegisterType = function (regName, baseType, instaceType, customData, meta) {
            // var _f = typeof (TTo);
            // alert(baseType.toString());
            regName = regName.toUpperCase();
            var _stre = Ioc.fGetFunName(baseType);
            var _meta = __assign({
                RegName: regName,
                BaseType: baseType,
                InstanceType: instaceType,
                customData: customData
            }, meta ? meta : {});
            this.fInstanceClassList[_stre + "_" + regName] = _meta;
        };
        Ioc.prototype.RegisterTypeSrc = function (regName, baseType, src) {
            regName = regName.toUpperCase();
            var _stre = Ioc.fGetFunName(baseType);
            var _meta = { RegName: regName, BaseType: baseType, InstanceType: src };
            this.fInstanceSrcList[_stre + "_" + regName] = _meta;
        };
        Ioc.prototype.FetchAsyInstance = function (regName, baseType, fun, error, config) {
            this.fFetchAsyInstance(regName, baseType, fun, error, config);
        };
        Ioc.prototype.fFetchAsyInstance = function (regName, baseType, fun, error, config) {
            var _this = this;
            regName = regName.toUpperCase();
            var _obj = this.FetchInstance(regName, baseType, config ? { Args: config.Args } : null);
            if (!_obj) {
                var _stre = Ioc.fGetFunName(baseType);
                var _meta = this.fInstanceSrcList[_stre + "_" + regName];
                if (_meta) {
                    window["require"]([_meta.InstanceType], function (file) {
                        var obj = _this.fFetchInstance(regName, baseType, config && config.Args ? { Args: config.Args } : null);
                        fun(obj);
                    }, function (a) {
                        console.warn(a);
                        error(_meta.InstanceType + "      " + a);
                    });
                }
                else {
                    console.log("注册名为 " + regName + "的类 " + _stre + "未注册 或者 不存在 ");
                    var _isNull = false;
                    if (config) {
                        if (config.NullFun) {
                            config.NullFun(regName, _stre);
                        }
                        else {
                            _isNull = true;
                        }
                    }
                    else {
                        _isNull = true;
                    }
                    if (_isNull) {
                        fun(null);
                    }
                    // error(null);
                }
            }
            else {
                return fun(_obj);
            }
        };
        Ioc.prototype.fFetchInstance = function (regName, baseType, config) {
            regName = regName.toUpperCase();
            var _stre = Ioc.fGetFunName(baseType);
            var _meta = this.fInstanceClassList[_stre + "_" + regName];
            if (_meta) {
                var _fun = _meta.InstanceType;
                var _f = config && config.Args ? applyNew(_fun, config.Args) : new _meta.InstanceType();
                return _f;
            }
            else {
                console.log("注册名为: " + regName + "  类型为" + baseType + "没有注册");
                return null;
            }
        };
        Ioc.prototype.FetchInstance = function (regName, baseType, config) {
            regName = regName.toUpperCase();
            return this.fFetchInstance(regName, baseType, config);
        };
        Ioc.fGetFunName = function (s) {
            if (typeof s == "string")
                return s;
            s = s.toString();
            var m = s.match(/function\s+([^(]+)/);
            if (m)
                return m[1];
            else
                return "";
        };
        Ioc.prototype.GetTypeList = function (baseType) {
            var _list = new Array();
            var _stre = Ioc.fGetFunName(baseType);
            for (var _m in this.fInstanceClassList) {
                var _strM = _m;
                if (_strM.indexOf(_stre + "_") == 0) {
                    var _col = this.fInstanceClassList[_strM];
                    _list.push(_col);
                }
            }
            for (var _m in this.fInstanceSrcList) {
                var _strM = _m;
                if (_strM.indexOf(_stre + "_") == 0) {
                    if (!this.fInstanceClassList[_strM]) {
                        var _col = this.fInstanceSrcList[_strM];
                        _list.push(_col);
                    }
                }
            }
            return _list;
        };
        Ioc.fIoc = new Ioc();
        return Ioc;
    }());
    exports.Ioc = Ioc;
    function PlugIn(plugMeta) {
        return function (constructor) {
            Ioc.Current().RegisterType(plugMeta.RegName, plugMeta.BaseType, constructor, undefined, {
                Author: plugMeta.Author,
                CreateDate: plugMeta.CreateDate,
                Message: plugMeta.Doc
            });
        };
    }
    exports.PlugIn = PlugIn;
    function getType(baseClass, name) {
        var _list = Ioc.Current().GetTypeList("vue");
        if (_list.length > 0) {
            var _num = _list.findIndex(function (a) { return a.RegName.toLocaleLowerCase() == name.toLocaleLowerCase(); });
            if (_num >= 0) {
                return _list[_num].InstanceType;
            }
        }
        return null;
    }
    exports.getType = getType;
});
/**
 * Created by nihilism on 03/06/2017.
 */
define("net/code", ["require", "exports"], function (require, exports) {
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
define("net/Net", ["require", "exports", "axios", "Core", "net/code", "vue", "vue-axios", "iview"], function (require, exports, axios_1, core, code_1, vue_1, vue_axios_1, iview_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // load config
    //import config from '@/requests/base'
    // load locale message template
    //import Message from '@/locale/zh_CN'
    // load http status config
    //import HTTP_STATUS from '@/requests/code'
    vue_1.default.use(vue_axios_1.default, axios_1.default);
    axios_1.default.defaults.baseURL = 'http://172.16.134.2:11536';
    axios_1.default.defaults.withCredentials = true;
    axios_1.default.defaults.timeout = 120000;
    // axios.defaults.xsrfCookieName = '_xsrf'
    // axios.defaults.xsrfHeaderName = 'X-Xsrftoken'
    // `onDownloadProgress` allows handling of progress events for download
    axios_1.default.defaults.onDownloadProgress = function (progressEvent) {
        // Do whatever you want with the native progress event
    };
    // interceptor
    axios_1.default.interceptors.request.use(function (config) {
        iview_1.default.LoadingBar.start();
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
    axios_1.default.interceptors.response.use(function (resp) {
        // debugger ;
        if (resp.data.code !== undefined && resp.data.code !== code_1.default.OK) {
            iview_1.default.Message.error({
                content: resp.data.msg,
                closable: true,
                duration: 5
            });
            iview_1.default.LoadingBar.finish();
            return Promise.reject(resp.data);
        }
        iview_1.default.LoadingBar.finish();
        return resp;
    }, function (error) {
        //debugger ;
        iview_1.default.LoadingBar.finish();
        if (error.response.status === code_1.default.UNAUTHORIZED) {
            iview_1.default.Message.warning({
                content: "您未认证或者未登录，即将跳转到登录界面",
                duration: 1.5,
                onClose: function () { }
            });
        }
        else {
            var errorText = '';
            switch (error.response.status) {
                case 500:
                    errorText = '服务器内部错误';
                    break;
                case 403:
                    errorText = '禁止访问';
                    break;
                case 404:
                    errorText = '请求的api不存在';
                    break;
            }
            iview_1.default.Message.error({
                content: error.response.data.description || errorText,
                closable: true,
                duration: 5
            });
        }
        return Promise.reject(error);
    });
    var _ajax = function (_a) {
        var url = _a.url, params = _a.params, ispost = _a.ispost;
        return __awaiter(this, void 0, void 0, function () {
            var _p1, _config;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _config = {
                            headers: { 'User-Name': 'zhangsan' }
                        };
                        if (!ispost) return [3 /*break*/, 2];
                        return [4 /*yield*/, axios_1.default.post(url, params, _config)];
                    case 1:
                        _p1 = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, axios_1.default.get(url, __assign({}, params, _config))];
                    case 3:
                        _p1 = _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/, new Promise(function (a, b) {
                            //debugger ;
                            core.requestHook(_p1, a);
                        })];
                }
            });
        });
    };
    exports.post = function (_a) {
        var url = _a.url, params = _a.params;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _ajax({ url: url, params: params, ispost: 1 })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    exports.get = function (_a) {
        var url = _a.url, params = _a.params;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _ajax({ url: url, params: params, ispost: 0 })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
});
define("net/index", ["require", "exports", "net/Net"], function (require, exports, Net_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.get = Net_1.get;
    exports.post = Net_1.post;
});
define("Util", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getFunName = function (s) {
        if (typeof s == "string")
            return s;
        s = s.toString();
        var m = s.match(/function\s+([^(]+)/);
        if (m)
            return m[1];
        else
            return "";
    };
    exports.sortBy = function (attr, rev) {
        //第二个参数k没有传递 默认升序排列
        if (rev == undefined) {
            rev = 1;
        }
        else {
            rev = (rev) ? 1 : -1;
        }
        return function (a, b) {
            a = a[attr];
            b = b[attr];
            if (a < b) {
                return rev * -1;
            }
            if (a > b) {
                return rev * 1;
            }
            return 0;
        };
    };
    function formatTimeFormCode(code, fmt) {
        code = code * 1000;
        return formatDate(new Date(code), fmt);
    }
    exports.formatTimeFormCode = formatTimeFormCode;
    function formatDate(date, fmt) {
        var o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'q+': Math.floor((date.getMonth() + 3) / 3),
            'S': date.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
        return fmt;
    }
    exports.formatDate = formatDate;
    function getTimeCodeFromDate(d) {
        return Math.round(d.getTime() / 1000);
    }
    exports.getTimeCodeFromDate = getTimeCodeFromDate;
    var handleCircular = function () {
        var cache = [];
        var keyCache = [];
        return function (key, value) {
            if (typeof value === 'object' && value !== null) {
                var index = cache.indexOf(value);
                if (index !== -1) {
                    return '[Circular ' + keyCache[index] + ']';
                }
                cache.push(value);
                keyCache.push(key || 'root');
            }
            return value;
        };
    };
    var tmp = JSON.stringify;
    exports.safeJson = function (value, replacer, space) {
        replacer = replacer || handleCircular();
        return tmp(value, replacer, space);
    };
});
define("event/IEvent", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("event/VueEvent", ["require", "exports", "rxjs", "vue"], function (require, exports, rxjs, vue_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventBus = /** @class */ (function () {
        function EventBus() {
            this.fEmit = null;
            this.ReactEvent = new BaseEvent(this, "React");
            this.VmEvent = new BaseEvent(this, "Vm");
            this.HookEvent = new BaseEvent(this, "Hook");
            this.CustomEvent = new BaseEvent(this, "Custom");
        }
        EventBus.prototype.FetchEmit = function () {
            // rxjs.
            if (!this.fEmit) {
                this.fEmit = new vue_2.default();
                //this.fEmit.setMaxListeners(0);
                // this.fEmit.
            }
            return this.fEmit;
        };
        EventBus.prototype.showAllEvent = function () {
            var _res = [];
            var _emit = this.fEmit;
            if (_emit && _emit._events) {
                var _events = _emit._events;
                for (var n in _emit._events) {
                    var _funList = _emit._events[n];
                    //if(_funList){
                    var _stringList = _funList ? _funList.map(function (f) {
                        return f.toString();
                    }).join("|") : "";
                    // }
                    _res.push({
                        EventName: n,
                        FunLength: _funList ? _funList.length : 0,
                        EventObj: {},
                        FunCodeList: _stringList
                    });
                }
                return _res;
            }
            return _res;
        };
        EventBus.prototype.RemoveReactEvent = function () {
        };
        return EventBus;
    }());
    exports.EventBus = EventBus;
    var BaseEvent = /** @class */ (function () {
        function BaseEvent(eventBus, name) {
            this.fEventBus = eventBus;
            this.fName = name;
        }
        BaseEvent.prototype.createName = function (name) {
            if (name) {
                return this.fName + "_" + name;
            }
            else
                return name;
        };
        BaseEvent.prototype.showAllEvent = function () {
            return this.fEventBus.showAllEvent();
        };
        BaseEvent.prototype.removeAllBusListeners = function () {
            this.fEventBus.FetchEmit().$off();
        };
        BaseEvent.prototype.getSubjectByName = function (name) {
            var event = this.createName(name);
            if (!this.fSubject) {
                this.fSubject = new rxjs.Subject();
            }
            return this.fSubject.filter(function (a) { return a.Name == event; });
        };
        BaseEvent.prototype.emit = function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            event = this.createName(event);
            console.log("事件调用： " + event);
            console.log(args);
            if (this.fSubject) {
                // this.fSubject = new rxjs.Subject<ISubiectOb>();
                this.fSubject.next({ Name: event, ArgList: args });
            }
            (_a = this.fEventBus.FetchEmit()).$emit.apply(_a, [event].concat(args));
            return true;
            var _a;
        };
        ;
        BaseEvent.prototype.removeAllListeners = function (event) {
            var _this = this;
            if (event) {
                event = this.createName(event);
                this.fEventBus.FetchEmit().$off(event);
                return null;
            }
            else {
                var _events = this.fEventBus.showAllEvent();
                _events.forEach(function (n) {
                    if (n.EventName.length > _this.fName.length) {
                        if (n.EventName.substr(0, _this.fName.length) == _this.fName) {
                            _this.fEventBus.FetchEmit().$off(n.EventName);
                        }
                    }
                });
                return this;
            }
        };
        ;
        //removeAllListeners(events: string[]): IEvent {
        //    return null;
        //};
        BaseEvent.prototype.listeners = function (event) {
            event = this.createName(event);
            // return this.fEventBus.FetchEmit().
            alert("该接口未实现");
            return [];
        };
        ;
        BaseEvent.prototype.removeListener = function (event, listener) {
            event = this.createName(event);
            var gg = listener;
            //var f: (eventObject: JQueryEventObject) => any = gg;
            this.fEventBus.FetchEmit().$off(event, gg);
            return this;
        };
        ;
        BaseEvent.prototype.addListener = function (event, listener) {
            console.log("时间注册： " + event);
            event = this.createName(event);
            // var gg: any = listener;
            // var f:any = (eventObject: any, ...args: any[]) => {
            //     listener(...args);
            // };
            this.fEventBus.FetchEmit().$on(event, listener);
            return listener;
        };
        BaseEvent.prototype.off = function (event, listener) {
            return this.removeListener(event, listener);
        };
        ;
        BaseEvent.prototype.on = function (event, listener) {
            return this.addListener(event, listener);
        };
        return BaseEvent;
    }());
    exports.BaseEvent = BaseEvent;
});
define("event/index", ["require", "exports", "event/VueEvent"], function (require, exports, vueEvent) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
define("Vue", ["require", "exports", "vue", "Core", "Util", "event/index", "./vuemixin/basecom.vue"], function (require, exports, vue_3, core, util, event_1, basecom_vue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create = function (options, name) {
        if (name)
            options.name = name;
        return options;
    };
    var _com = function (h, name, tpl, pro, props) {
        var _vueObj = vue_3.default.extend({
            name: name,
            props: props,
            template: tpl
        });
        vue_3.default.component(name, _vueObj);
        return h(name, { props: { vm: pro } });
    };
    exports.tpl = function (h) {
        return function (tpl, pro) {
            return _com(h, "tplName" + core.getUniId(), tpl, pro ? pro : {}, ["vm"]);
        };
    };
    exports.vm = function (objPro) {
        return "\n       <temple   v-if=\"vm." + objPro + " && vm." + objPro + ".renderCom\"  :is=\"vm." + objPro + ".renderCom()\"  :vm=\"vm." + objPro + "\"></temple>\n   ";
    };
    exports.registAndGetVueComName = function (vm, vueObj) {
        // debugger ;
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
            _name = "tempvuecom";
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
        vue_3.default.component(_name, vueObj);
        return _name;
    };
    exports.vueTpl = function (name, components, comOpt) {
        return function (tpl) {
            //  const _vueObj = Vue.extend(
            var _vueOpt = {
                mixins: [basecom_vue_1.default],
                template: tpl,
                components: components
            };
            comOpt = comOpt ? comOpt : {};
            comOpt = __assign({}, _vueOpt, comOpt);
            //  );
            var _obj = comOpt;
            return _obj;
        };
    };
    exports.com = function (vue, comOpt) {
        if (comOpt === void 0) { comOpt = {}; }
        return function (constructor) {
            //debugger ;
            var _type = typeof (vue);
            if (_type == "function" || _type == "object") {
                //直接设置组件
                constructor["_vueObj"] = vue;
            }
            else {
                //如果是string
                comOpt = __assign({}, comOpt, { extends: constructor["_vueObj"] });
                if (!constructor["_vueObj"]) {
                    var components = comOpt.components;
                    constructor["_vueObj"] = exports.vueTpl(util.getFunName(constructor) + core.getUniId(), components, comOpt)(vue);
                }
                else {
                    var components = comOpt.components;
                    //constructor["_vueObj"].template = vue ;
                    constructor["_vueObj"] = __assign({ components: components, render: null, template: vue, name: util.getFunName(constructor) + core.getUniId() }, { extends: comOpt });
                }
            }
        };
    };
    var _clearRender = function (vueObj) {
    };
    function getTempVueName(vueProty, name) {
        var _name = name;
        if (!_name) {
            _name = util.getFunName(vueProty);
        }
        _name = _name + event_1.default.getUniId();
        return _name;
    }
    exports.getTempVueName = getTempVueName;
    exports.compute = function (name) {
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
    var _createTplVue = function (tpl, vm) {
        var _name = "tplVue" + event_1.default.getUniId();
        vue_3.default.component(_name, {
            props: ["vm"],
            template: tpl
        });
        // vm = { ...vm };
        vm["renderCom"] = function () {
            return _name;
        };
        return vm;
    };
    exports.cvue = function (vm) {
        return function (tpl) {
            return _createTplVue(tpl, vm);
        };
    };
});
define("index", ["require", "exports", "Core", "Ioc", "net/index", "Dom", "Vue", "Util"], function (require, exports, core, ioc, net, dom, vue, util) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.core = core;
    exports.ioc = ioc;
    exports.net = net;
    exports.dom = dom;
    exports.vue = vue;
    exports.util = util;
});
define("com/ICom", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("com/BaseCom", ["require", "exports", "index", "event/index", "vue", "./../vuemixin/basecom.vue"], function (require, exports, index_1, event_2, vue_4, basecom_vue_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseCom = /** @class */ (function () {
        function BaseCom(config) {
            this.fIsShow = false;
            this.AppEventFunDic = {};
            this.comEventList = [];
            this.bindMethod();
            if (config) {
                if (config.UniId) {
                    this.UniId = config.UniId;
                }
            }
        }
        BaseCom.prototype.bindMethod = function () {
        };
        BaseCom.prototype.forceUpdate = function () {
            this.getEvent().emit("forceUpdate");
        };
        BaseCom.prototype.getEvent = function () {
            if (!this.fLoacalEventBus) {
                this.fLoacalEventBus = event_2.fetchEvent();
            }
            return this.fLoacalEventBus;
        };
        BaseCom.prototype.toogleShow = function () {
            this.fIsShow = !this.fIsShow;
        };
        BaseCom.prototype.renderString = function () {
            var _vm = this;
            // const _ff =  {..._vm}
            return index_1.core.json(__assign({}, _vm, { $store: null }, { fLoacalEventBus: null }));
        };
        BaseCom.prototype.getConstructName = function () {
            // debugger ;
            return index_1.util.getFunName(this["constructor"]);
        };
        BaseCom.prototype.setRx = function (pro, obj) {
            var me = this;
            vue_4.default.set(me, pro, obj ? obj : {});
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
        BaseCom.prototype.renderCom = function () {
            return index_1.vue.registAndGetVueComName(this, this.getVueObj());
        };
        BaseCom.prototype.listenComEvent = function (name, fun) {
            this.comEventList.push({ name: name, fun: fun });
            this.getEvent().addListener(name, fun);
        };
        BaseCom.prototype.emitComEvent = function (name) {
            var arg = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                arg[_i - 1] = arguments[_i];
            }
            (_a = this.getEvent()).emit.apply(_a, [name].concat(arg));
            var _a;
        };
        BaseCom.prototype.clearVueEvent = function () {
            var _this = this;
            this.comEventList.forEach(function (a) {
                _this.getEvent().off(a.name, a.fun);
            });
            this.comEventList = [];
        };
        BaseCom.prototype.listenAppEvent = function (name, uniId, fun) {
            var _fun = event_2.default
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
            (_a = event_2.default
                .GetAppEvent()).emit.apply(_a, [name + sign].concat(args));
            var _a;
        };
        BaseCom.prototype.pRegisterModule = function (module) {
            if (this.$store) {
                if (this.$store.state[this.UniId]) {
                    index_1.core.alert("该模块${this.UniId}已经注册过了");
                }
                else {
                    // alert("注册模块"+ this.UniId);
                    this.$store.registerModule(this.UniId, module);
                }
            }
        };
        BaseCom.prototype.pUnRegisterModule = function () {
            if (this.$store) {
                //unregisterModule
                if (this.$store.state[this.UniId]) {
                    //alert("卸载模块"+ this.UniId);
                    this.$store.unregisterModule(this.UniId);
                }
            }
        };
        BaseCom.prototype.pDispose = function () {
            this.pUnRegisterModule();
        };
        BaseCom.prototype.dispose = function () {
            this.pDispose();
        };
        /**
         * 获取当前页面的模块
         *
         * @returns
         * @memberof BaseCom
         */
        BaseCom.prototype.getModuleState = function () {
            //debugger;
            if (this.$store && this.$store.state[this.UniId]) {
                return this.$store.state[this.UniId];
            }
        };
        /**
         * 获取计算属性
         *
         * @param {string} name
         * @returns
         * @memberof BaseCom
         */
        BaseCom.prototype.getGetters = function (name) {
            if (this.$store) {
                if (name)
                    return this.$store.getters[name];
                else {
                    return this.$store.getters;
                }
            }
        };
        /**
         * 提交数据
         *
         * @param {string} name
         * @param {*} obj
         * @memberof BaseCom
         */
        BaseCom.prototype.commit = function (name, obj) {
            if (this.$store) {
                this.$store.commit(name, obj);
            }
        };
        /**
         * 分发数据
         *
         * @param {string} name
         * @param {*} obj
         * @memberof BaseCom
         */
        BaseCom.prototype.dispatch = function (name, obj) {
            if (this.$store) {
                this.$store.dispatch(name, obj);
            }
        };
        Object.defineProperty(BaseCom.prototype, "xxx", {
            get: function () {
                return "123";
            },
            set: function (val) {
                this.xxx = val;
            },
            enumerable: true,
            configurable: true
        });
        BaseCom = __decorate([
            index_1.ioc.PlugIn({ BaseType: "ICom", RegName: "BaseCom" }),
            index_1.vue.com(basecom_vue_2.default),
            __metadata("design:paramtypes", [Object])
        ], BaseCom);
        return BaseCom;
    }());
    exports.BaseCom = BaseCom;
});
define("com/index", ["require", "exports", "com/BaseCom", "com/ICom"], function (require, exports, BaseCom, ICom) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = { BaseCom: BaseCom, ICom: ICom };
});
