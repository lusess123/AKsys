export declare const tpl: (h: any) => (tpl: string, pro?: any) => any;
export declare const vm: (objPro: string) => string;
export declare const registAndGetVueComName: (vm: any, vueObj?: any) => string;
export declare const vueTpl: (name: string, components?: any, comOpt?: any) => (tpl: string) => any;
export declare const com: (vue: any, comOpt?: any) => (constructor: Function) => void;
<<<<<<< HEAD
export declare function getTempVueName(vueProty: any, name?: string): string;
=======
export declare const compute: (name?: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
>>>>>>> efd8649d64d38c3c8d85032eb005604f37e41dd0
