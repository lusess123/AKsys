var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "axios", "./../Core", "./code", "vue", "vue-axios", "iview"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var axios_1 = require("axios");
    var core = require("./../Core");
    var code_1 = require("./code");
    /**
     * Created by nihilism on 03/06/2017.
     */
    var vue_1 = require("vue");
    //import axios from 'axios'
    var vue_axios_1 = require("vue-axios");
    // load iview-ui components for notifying
    var iview_1 = require("iview");
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
