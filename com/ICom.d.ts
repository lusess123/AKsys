import { IEvent } from "./../event/IEvent";
export interface ICom {
    _VueObj: any;
    UniId: string;
    $store: any;
    forceUpdate(): any;
    getEvent(): IEvent;
    dispose(): any;
}
