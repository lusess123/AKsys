import Vue from 'vue';
import * as core from "./Core";
import * as util from "./Util";
import event from "./event";


const _com = function (h: any, name: string, tpl: string, pro: any, props: string[]) {
    const _vueObj = Vue.extend({
        name: name,
        props: props,
        template: tpl
    });

    Vue.component(name, _vueObj);

    return h(name, { props: {vm:pro} });
}

export const tpl = h =>
    (tpl: string, pro?: any) => {
        
        return _com(h, "tplName"+ core.getUniId(), tpl, pro?pro:{}, ["vm"])

    }
export const vm = (objPro :string)=>{

   return `
       <temple   v-if="vm.${objPro} && vm.${objPro}.render"  :is="vm.${objPro}.render()"  :vm="vm.${objPro}"></temple>
   `; 
}


export const registAndGetVueComName = (vm, vueObj?) => {
    //debugger ;
    if (!vueObj) {
        if(vm){
            if(vm._VueObj){
                vueObj = vm._VueObj;
            }
            else{
                if (vm["constructor"]["_vueObj"]) {
                    vueObj = vm["constructor"]["_vueObj"];
                }
            }
        }
        
    }
    if (!vueObj) throw { error: "组件不能为空", vm: vm };
    let _name: string = "";
    if (!vueObj.name) {
        return _name = "tempvuecom";
    }
    else {
       // debugger;
        if(vm["constructor"]){
          _name = util.getFunName(vm["constructor"]);
        }
        else{
        _name = vueObj.name;
        }
    }
    _name = _name + core.getUniId();
    //Vue.component('FormType'+name,com);
    Vue.component(_name, vueObj);
    return _name;

}

export const vueTpl =
    (name: string,components?:any,comOpt?:any ) =>
        (tpl: string) => {
            
          //  const _vueObj = Vue.extend(
             const _vueOpt =   {
                name: name,
                props: ["vm"],
                template: tpl,
                components:components,
                renderError:  (h:any, err)=> {
                    return h('pre', {title:err.stack, style: { color: 'red' }}, err.stack);
                  },
                  beforeCreated:function(){
                    this.vm.$store = this.$store ;
                  },

                  created:function(){
                    this.vm.$store = this.$store ;
                  },
                   
                 beforeUpdate:function(){
                      this.vm.$store = this.$store ;
                 },

                  mounted: function () {
                     // alert("控件完成了");
                  this.vm.$store = this.$store ;
                      if(this.$props.vm){
                          if(this.$props.vm.getEvent){
                              const _event = this.$props.vm.getEvent();
                              const me = this ;
                              _event.on("forceUpdate",function(){
                                  alert("页面组件更新");
                                 // debugger ;
                                  me.$forceUpdate();
                              });
                          }
                      }
                  }
            }

            comOpt = comOpt?comOpt : {} ;

           comOpt = {..._vueOpt,...comOpt};
         
      //  );
           const _obj:any = Vue.extend(comOpt);
            return _obj;
        }

    

export const com = function (vue: any,comOpt:any = {} ) {
    return function (constructor: Function) {
        //debugger ;
        comOpt = { ...comOpt,...{extends:constructor["_vueObj"]}};
        const  components =  comOpt.components ;
        const _type = typeof (vue);
        if (_type == "function")
            constructor["_vueObj"] = vue;
        else {
            if (_type == "string")
                constructor["_vueObj"] = vueTpl(util.getFunName(constructor) + core.getUniId(),components,comOpt)(vue);
            else {
                const _base = {name : "com" + core.getUniId() , props: ["vm"]};
                constructor["_vueObj"] = Vue.extend( {..._base, ...vue,...comOpt} );
            }
        }
    }
}

<<<<<<< HEAD
export function  getTempVueName(vueProty : any,name ?:string){
          let _name = name ;
          if(!_name){
                _name =   util.getFunName(vueProty);
          }
          _name = _name + event.getUniId();
          return _name ;
}

=======
export const compute  =  function (name?:string ) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const _baseVue = target.constructor["_vueObj"];
        if(_baseVue){
            //constructor["_vueObj"]  = 
            target.constructor["_vueObj"] ={
                      computed:{
                           [name?name:propertyKey]:function(){
                              return  this.vm[propertyKey];
                          }
                        },
                        
                        extends:_baseVue

                    };
            
                
        }
    };
}










>>>>>>> efd8649d64d38c3c8d85032eb005604f37e41dd0







