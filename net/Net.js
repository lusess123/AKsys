var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
    const axios_1 = require("axios");
    const core = require("./../Core");
    const code_1 = require("./code");
    /**
     * Created by nihilism on 03/06/2017.
     */
    const vue_1 = require("vue");
    //import axios from 'axios'
    const vue_axios_1 = require("vue-axios");
    // load iview-ui components for notifying
    const iview_1 = require("iview");
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
                onClose: () => { }
            });
        }
        else {
            let errorText = '';
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
    const _ajax = function ({ url, params, ispost }) {
        return __awaiter(this, void 0, void 0, function* () {
            let _p1;
            const _config = {
                headers: { 'User-Name': 'zhangsan' }
            };
            if (ispost) {
                _p1 = yield axios_1.default.post(url, params, _config);
            }
            else {
                _p1 = yield axios_1.default.get(url, Object.assign({}, params, _config));
            }
            return new Promise((a, b) => {
                //debugger ;
                core.requestHook(_p1, a);
            });
        });
    };
    exports.post = function ({ url, params }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _ajax({ url, params, ispost: 1 });
        });
    };
    exports.get = function ({ url, params }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _ajax({ url, params, ispost: 0 });
        });
    };
});
