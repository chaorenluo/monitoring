import { ReportDataType, InitOptions } from '@monitoring/types';
import { Severity } from './Severity';
export declare function htmlElementAsString(target: HTMLElement): string;
export declare function setSilentFlag(paramOptions?: InitOptions): void;
export declare function extractErrorStack(ex: any, level: Severity): ReportDataType;
export declare function parseUrlToObj(url: string): {
    host?: string;
    path?: string;
    protocol?: string;
    relative?: string;
};
//# sourceMappingURL=browser.d.ts.map