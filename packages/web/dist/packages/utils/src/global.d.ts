import { EVENTTYPES } from '@monitoring/shared';
import { Breadcrumb, TransportData, Options, RecordScreen } from '@monitoring/core';
import { Logger } from './logger';
import { DeviceInfo } from '@monitoring/types';
export interface MitoSupport {
    logger: Logger;
    breadcrumb: Breadcrumb;
    recordScreen: RecordScreen;
    transportData: TransportData;
    replaceFlag: {
        [key in EVENTTYPES]?: boolean;
    };
    record?: any[];
    deviceInfo?: DeviceInfo;
    options?: Options;
    track?: any;
}
interface MITOGlobal {
    console?: Console;
    __MITO__?: MitoSupport;
}
export declare const isBrowserEnv: boolean;
export declare function getGlobal<T>(): MITOGlobal & T;
export declare function getGlobalMitoSupport(): MitoSupport;
declare const _global: MITOGlobal & Window;
declare const _support: MitoSupport;
export { _global, _support };
export declare function setFlag(replaceType: EVENTTYPES, isSet: boolean): void;
export declare function getFlag(replaceType: EVENTTYPES): boolean;
export declare function supportsHistory(): boolean;
//# sourceMappingURL=global.d.ts.map