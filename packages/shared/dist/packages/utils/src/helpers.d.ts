import { IAnyObject } from '@monitoring/types';
export declare function slientConsoleScope(callback: Function): void;
export declare function typeofAny(target: any, type: string): boolean;
export declare function validateOption(target: any, targetName: string, expectType: string): boolean;
export declare function getTimestamp(): number;
export declare function getLocationHref(): string;
export declare function interceptStr(str: string, interceptLength: number): string;
export declare function generateUUID(): string;
export declare function toStringAny(target: any, type: string): boolean;
export declare function toStringValidateOption(target: any, targetName: string, expectType: string): boolean;
declare type TotalEventName = keyof GlobalEventHandlersEventMap | keyof XMLHttpRequestEventTargetEventMap | keyof WindowEventMap;
export declare function on(target: {
    addEventListener: Function;
}, eventName: TotalEventName, handler: Function, opitons?: boolean | unknown): void;
export declare function replaceOld(source: IAnyObject, name: string, replacement: (...args: any[]) => any, isForced?: boolean): void;
export declare const throttle: (fn: Function, delay: number) => Function;
export declare function unknownToString(target: unknown): string;
export declare const defaultFunctionName = "<anonymous>";
export declare function getFunctionName(fn: unknown): string;
export declare function getBigVersion(version: string): number;
export {};
//# sourceMappingURL=helpers.d.ts.map