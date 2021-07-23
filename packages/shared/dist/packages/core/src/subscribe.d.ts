import { EVENTTYPES } from '@monitoring/shared';
declare type ReplaceCallback = (data: any) => void;
export interface ReplaceHandler {
    type: EVENTTYPES;
    callback: ReplaceCallback;
}
export declare function subscribeEvent(handler: ReplaceHandler): boolean;
export declare function triggerHandlers(type: EVENTTYPES, data: any): void;
export {};
//# sourceMappingURL=subscribe.d.ts.map