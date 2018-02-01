import { ICom } from "./ICom";
import { IEvent } from "./../event/IEvent";
export interface IBaseComConfig {
    UniId?: string;
}
export interface IFunDic {
    [name: string]: Function;
}
export declare class BaseCom implements ICom {
    $store: any;
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
