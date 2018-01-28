declare module "bootstrap" {
    export const loadSys: () => Promise<void[]>;
    export const addTask: (p: Promise<void>) => void;
}
declare module "Dom" {
    export const Notify: (mesg: any) => void;
    export const getCookie: (key: string) => any;
    export const setCookie: (key: string, val: string) => void;
}
declare module "Core" {
    export const ErrorCode: {
        "-1": string;
        "0": string;
        "40400": string;
        "43001": string;
        "43002": string;
        "44000": string;
    };
    export const ErrorDesc: {
        SYS_ERR: string;
        NO_ERR: string;
        NOT_FOUND: string;
        REQ_MUST_POST: string;
        REQ_MUST_HTTPS: string;
        PARAMS_INVALID: string;
    };
    export const requestHook: (req: any, callback: any) => void;
    export const json: (obj: any) => string;
    export const parseJson: (str: any) => any;
    export const alert: (msg: any) => void;
    export const notify: (mesg: any) => void;
    export const alertObj: (obj: any) => void;
    export const pureObj: (obj: any) => any;
    export const getUniId: () => string;
    export const cast: <T>(obj: any) => T;
    export interface ILog {
        info?: string;
        sign?: string;
    }
    export const log: (a: any, {sign, info}?: {
        sign: string;
        info: string;
    }) => void;
    export let Options: {
        IsDev: boolean;
        Point: {};
    };
}
declare module "Ioc" {
    export interface IClassMeta {
        RegName?: string;
        Author?: string;
        Message?: string;
        BaseType?: any;
        InstanceType?: any;
        customData?: any;
        CreateDate?: string;
    }
    export function applyNew(ctor: any, args: any[]): any;
    export interface IErrorData {
        Path: string;
        error: string;
    }
    export interface IInstanceMeta {
        ClassMeta: IClassMeta;
        InstanceObj: any;
    }
    export interface IInstanceDict {
        [index: string]: IInstanceMeta;
    }
    export interface IClassList {
        [index: string]: IClassMeta;
    }
    export interface IIocAsy<T> {
        (obj: T): void;
    }
    export interface IRegisterTypeSrcConfig {
        NullFun?: INullFun;
        Args?: any[];
    }
    export interface INullFun {
        (regName: string, baseTypeStr: string): void;
    }
    export interface IFetchConfig {
        Args?: any[];
    }
    export class Ioc {
        private static fIoc;
        static Current(): Ioc;
        IocModel(): IClassList;
        IocSrcModel(): IClassList;
        private fInstanceClassList;
        private fInstanceSrcList;
        RegisterType(regName: string, baseType: any, instaceType: any, customData?: any, meta?: IClassMeta): void;
        RegisterTypeSrc(regName: string, baseType: any, src: string): void;
        FetchAsyInstance<T>(regName: string, baseType: any, fun: IIocAsy<T>, error?: Function, config?: IRegisterTypeSrcConfig): void;
        private fFetchAsyInstance<T>(regName, baseType, fun, error?, config?);
        private fFetchInstance<T>(regName, baseType, config?);
        FetchInstance<T>(regName: string, baseType: any, config?: IFetchConfig): T;
        static fGetFunName(s: any): any;
        GetTypeList(baseType: any): Array<IClassMeta>;
    }
    export interface IPlugMeta {
        RegName: string;
        BaseType: any;
        CreateDate?: string;
        Doc?: string;
        Author?: string;
    }
    export function PlugIn(plugMeta: IPlugMeta): (constructor: Function) => void;
}
declare module "net/code" {
    const _default: {
        OK: number;
        UNAUTHORIZED: number;
        INTERNAL_ERROR: number;
        BAD_GATEWAY: number;
        GATEWAY_TIMEOUT: number;
    };
    export default _default;
}
declare module "net/Net" {
    export const post: ({url, params}: {
        url: any;
        params: any;
    }) => Promise<{}>;
    export const get: ({url, params}: {
        url: any;
        params: any;
    }) => Promise<{}>;
}
declare module "net/index" {
    import { get, post } from "net/Net";
    export { get, post };
}
declare module "Util" {
    export const getFunName: (s: any) => any;
    export const sortBy: (attr: any, rev: any) => (a: any, b: any) => number;
    export function formatTimeFormCode(code: number, fmt: any): any;
    export function formatDate(date: any, fmt: any): any;
}
declare module "Vue" {
    export const tpl: (h: any) => (tpl: string, pro?: any) => any;
    export const vm: (objPro: string) => string;
    export const registAndGetVueComName: (vm: any, vueObj?: any) => string;
    export const vueTpl: (name: string, components?: any) => (tpl: string) => any;
    export const com: (vue: any, {components}?: {
        components: any;
    }) => (constructor: Function) => void;
}
declare module "com/ICom" {
    export interface ICom {
        _VueObj: any;
        UniId: string;
    }
}
declare module "event/IEvent" {
    export interface IEvent {
        emit(event: string, ...args: any[]): boolean;
        removeAllListeners(event?: string): IEvent;
        listeners(event: string): Function[];
        removeListener(event: string, listener: Function): IEvent;
        addListener(event: string, listener: Function): Function;
        showAllEvent(): IEventInfo[];
        removeAllBusListeners(): void;
        on(event: string, listener: Function): Function;
        off(event: string, listener: Function): IEvent;
        getSubjectByName(name: string): any;
    }
    export interface IEventInfo {
        EventName: string;
        FunLength: number;
        EventObj: any;
    }
    export interface ISubiectOb {
        Name: string;
        ArgList: any[];
    }
}
declare module "event/VueEvent" {
    import { IEvent, IEventInfo } from "event/IEvent";
    export class EventBus {
        private fEmit;
        FetchEmit(): any;
        showAllEvent(): IEventInfo[];
        constructor();
        ReactEvent: IEvent;
        VmEvent: IEvent;
        HookEvent: IEvent;
        CustomEvent: IEvent;
        RemoveReactEvent(): void;
    }
    export class BaseEvent implements IEvent {
        private fSubject;
        private fEventBus;
        constructor(eventBus: EventBus, name: string);
        protected fName: string;
        private createName(name);
        showAllEvent(): IEventInfo[];
        removeAllBusListeners(): void;
        getSubjectByName(name: string): any;
        emit(event: string, ...args: any[]): boolean;
        removeAllListeners(event?: string): IEvent;
        listeners(event: string): Function[];
        removeListener(event: string, listener: Function): IEvent;
        addListener(event: string, listener: Function): Function;
        off(event: string, listener: Function): IEvent;
        on(event: string, listener: Function): Function;
    }
}
declare module "event/index" {
    import { IEvent } from "event/IEvent";
    class App {
        private static fAppEvent;
        private static fUniId;
        static getUniId(): number;
        static initAppEvent(event: IEvent): void;
        static GetAppEvent(): IEvent;
    }
    export const fetchEvent: () => IEvent;
    export default App;
}
declare module "com/BaseCom" {
    import { ICom } from "com/ICom";
    import { IEvent } from "event/IEvent";
    export interface IBaseComConfig {
        UniId?: string;
    }
    export interface IFunDic {
        [name: string]: Function;
    }
    export class BaseCom implements ICom {
        _VueObj: any;
        UniId: string;
        private fIsShow;
        protected AppEventFunDic: IFunDic;
        private fLoacalEventBus;
        constructor(config?: IBaseComConfig);
        forceUpdate(): void;
        getEvent(): IEvent;
        private toogleShow();
        renderString(): string;
        getConstructName(): any;
        protected setRx(pro: string, obj?: any): void;
        getVueObj(): any;
        render(): string;
        protected listenAppEvent(name: string, uniId: string, fun: Function): void;
        protected emitAppEvent(name: string, sign: string, ...args: any[]): void;
    }
}
declare module "com/index" {
    import * as BaseCom from "com/BaseCom";
    import * as ICom from "com/ICom";
    const _default: {
        BaseCom: typeof BaseCom;
        ICom: typeof ICom;
    };
    export default _default;
}
declare module "index" {
    import * as core from "Core";
    import * as ioc from "Ioc";
    import * as net from "net/index";
    import * as dom from "Dom";
    import * as vue from "Vue";
    import * as util from "Util";
    export { core, ioc, net, dom, vue, util };
    import "com/index";
}
