"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs = require("rxjs");
var vue_1 = require("vue");
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
            this.fEmit = new vue_1.default();
            //this.fEmit.setMaxListeners(0);
            // this.fEmit.
        }
        return this.fEmit;
    };
    EventBus.prototype.showAllEvent = function () {
        var _res = [];
        var _emit = this.fEmit;
        if (_emit) {
            var _rr = _emit[0];
            var _objs = [];
            for (var gg in _rr) {
                _objs.push(gg);
            }
            if (_objs.length > 0) {
                var _vv = _rr[_objs[0]];
                var _eve = _vv.events;
                for (var _e in _eve) {
                    _res.push({ EventName: _e, FunLength: _eve[_e].length, EventObj: _eve[_e] });
                }
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