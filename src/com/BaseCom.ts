import {ICom} from "./ICom";
import { core ,ioc,vue,util } from "./../index";
import eventBus ,{ fetchEvent} from "./../event";
import { IEvent } from "./../event/IEvent";
import Vue from "vue";

export interface IBaseComConfig
{
   UniId? :string ;
} 
export interface IFunDic
{
    [name : string] : Function;
}




@ioc.PlugIn({BaseType:"ICom",RegName:"BaseCom"})
@vue.com(`
<div>
<Card>
  <p slot="title"   @click="vm.toogleShow()"  >
        <a>{{vm.getConstructName()}}   <Icon type="android-happy" color="green"></Icon>
        </a>
  </p>
  <div   v-if="vm.fIsShow"    >   {{vm.renderString()}} </div>
</Card>
</div>
`)
export class BaseCom implements ICom
{
    _VueObj : any ;
    UniId :string ;
    private fIsShow : boolean = false ;
    protected AppEventFunDic : IFunDic = {};

    private fLoacalEventBus : IEvent ;
    
    public constructor(config?:IBaseComConfig)
    {
        if(config){
            if(config.UniId){
                this.UniId = config.UniId ;
            }
        }
    }

    public forceUpdate()
    {
     this.getEvent().emit("forceUpdate");
    }

    public getEvent():IEvent
    {
         if(!this.fLoacalEventBus){
              this.fLoacalEventBus = fetchEvent();
         }
         return this.fLoacalEventBus ;
    }

    private toogleShow()
    {
        this.fIsShow = !this.fIsShow ;
    }

    renderString(){
       return core.json(this);
    }

    getConstructName(){
      // debugger ;
       return util.getFunName(this["constructor"]);
    }

    protected setRx(pro:string ,obj?:any){
        const me :any = this ;
        Vue.set(me,pro,obj?obj:{});
    }

    getVueObj()
    {
        if(this._VueObj) return this._VueObj ;
        else{
           if(this["constructor"] &&  this["constructor"]["_vueObj"]){
               return this["constructor"]["_vueObj"];
           }
           else{
               throw " 没有挂载组件...";
           }
        }
    }

    render():string {
       return   vue.registAndGetVueComName(this,this.getVueObj())
    }


    protected listenAppEvent(name : string, uniId : string, fun : Function) {

        var _fun = eventBus
           // .App
            .GetAppEvent()
            .addListener(name + uniId, fun);
        this.AppEventFunDic[name + uniId] = _fun;
        //eventFile.App.GetAppEvent().removeListener(name + uniId, fun);
    }

    protected emitAppEvent(name : string, sign : string, ...args : any[])
    {
       // eventFile
           // .App
           eventBus
            .GetAppEvent()
            .emit(name + sign, ...args);
    }

    

}