export declare const tpl: (h: any) => (tpl: string, pro?: any) => any;
export declare const vm: (objPro: string) => string;
export declare const registAndGetVueComName: (vm: any, vueObj?: any) => string;
export declare const vueTpl: (name: string, components?: any, comOpt?: any) => (tpl: string) => any;
export declare const com: (vue: any, comOpt?: any) => (constructor: Function) => void;
export declare const compute: (name?: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
