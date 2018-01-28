import Vue from 'vue';
import * as core from "./Core";
import * as util from "./Util";


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
       <temple   v-if="vm.${objPro}"  :is="vm.${objPro}.render()"  :vm="vm.${objPro}"></temple>
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
        debugger;
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
    (name: string,components?:any ) =>
        (tpl: string) => {

            const _vueObj = Vue.extend({
                name: name,
                props: ["vm"],
                template: tpl,
                components:components,
                renderError:  (h:any, err)=> {
                    return h('pre', {title:err.stack, style: { color: 'red' }}, err.stack);
                  },
                  mounted: function () {
                     // alert("控件完成了");
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
            });

            return _vueObj;
        }

export const com = function (vue: any,{ components }= {components:undefined} ) {
    return function (constructor: Function) {
        //debugger ;
        const _type = typeof (vue);
        if (_type == "function")
            constructor["_vueObj"] = vue;
        else {
            if (_type == "string")
                constructor["_vueObj"] = vueTpl(util.getFunName(constructor) + core.getUniId(),components)(vue);
            else {
                const _base = {name : "com" + core.getUniId() , props: ["vm"]};
                constructor["_vueObj"] = Vue.extend( {..._base, ...vue} );
            }
        }
    }
}







