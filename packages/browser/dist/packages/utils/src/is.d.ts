export declare const nativeToString: () => string;
export declare const variableTypeDetection: {
    isNumber: (value: any) => boolean;
    isString: (value: any) => boolean;
    isBoolean: (value: any) => boolean;
    isNull: (value: any) => boolean;
    isUndefined: (value: any) => boolean;
    isSymbol: (value: any) => boolean;
    isFunction: (value: any) => boolean;
    isObject: (value: any) => boolean;
    isArray: (value: any) => boolean;
    isProcess: (value: any) => boolean;
    isWindow: (value: any) => boolean;
};
export declare function isError(wat: any): boolean;
export declare function isEmptyObject(obj: Object): boolean;
export declare function isEmpty(wat: any): boolean;
export declare function isInstanceOf(wat: any, base: any): boolean;
export declare function isExistProperty(obj: Object, key: string | number | symbol): boolean;
//# sourceMappingURL=is.d.ts.map