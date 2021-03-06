## API Report File for "@monitoring/core"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { AuthInfo } from '@monitoring/types';
import { BREADCRUMBCATEGORYS } from '@monitoring/shared';
import { BreadcrumbPushData } from '@monitoring/types';
import { BREADCRUMBTYPES } from '@monitoring/shared';
import { DeviceInfo } from '@monitoring/types';
import { EVENTTYPES } from '@monitoring/shared';
import { FinalReportType } from '@monitoring/types';
import { InitOptions } from '@monitoring/types';
import { MITOHttp } from '@monitoring/types';
import { Queue } from '@monitoring/utils';
import { Replace } from '@monitoring/types';
import { ReportDataType } from '@monitoring/types';
import { ResourceErrorTarget } from '@monitoring/types';
import { Severity } from '@monitoring/utils';
import { TNumStrObj } from '@monitoring/types';
import { TransportDataType } from '@monitoring/types';

// @public (undocumented)
export class Breadcrumb {
    constructor();
    // (undocumented)
    beforePushBreadcrumb: unknown;
    // (undocumented)
    bindOptions(options?: InitOptions): void;
    // (undocumented)
    clear(): void;
    // (undocumented)
    getCategory(type: BREADCRUMBTYPES): BREADCRUMBCATEGORYS.HTTP | BREADCRUMBCATEGORYS.USER | BREADCRUMBCATEGORYS.DEBUG | BREADCRUMBCATEGORYS.EXCEPTION;
    // (undocumented)
    getStack(): BreadcrumbPushData[];
    // (undocumented)
    immediatePush(data: BreadcrumbPushData): void;
    // (undocumented)
    maxBreadcrumbs: number;
    // (undocumented)
    push(data: BreadcrumbPushData): void;
    // (undocumented)
    shift(): boolean;
    // (undocumented)
    stack: BreadcrumbPushData[];
}

// @public (undocumented)
export const breadcrumb: Breadcrumb;

// @public (undocumented)
export function createErrorId(data: ReportDataType, apikey: string): number | null;

// @public (undocumented)
export function getRealPath(url: string): string;

// @public (undocumented)
export function handleConsole(data: Replace.TriggerConsole): void;

// @public (undocumented)
export function hashCode(str: string): number;

// @public (undocumented)
export function httpTransform(data: MITOHttp): ReportDataType;

// @public (undocumented)
export function initOptions(paramOptions?: InitOptions): void;

// Warning: (ae-forgotten-export) The symbol "LogTypes" needs to be exported by the entry point index.d.ts
//
// @public (undocumented)
export function log({ message, tag, level, ex }: LogTypes): void;

// @public (undocumented)
export class Options {
    constructor();
    // (undocumented)
    beforeAppAjaxSend: Function;
    // (undocumented)
    bindOptions(options?: InitOptions): void;
    // (undocumented)
    enableTraceId: Boolean;
    // (undocumented)
    filterXhrUrlRegExp: RegExp;
    // (undocumented)
    includeHttpUrlTraceIdRegExp: RegExp;
    // (undocumented)
    traceIdFieldName: string;
}

// @public (undocumented)
export const options: Options;

// @public (undocumented)
export class RecordScreen {
    // (undocumented)
    frame: any[];
    // (undocumented)
    maxFrame: number;
    // (undocumented)
    record: any;
    // (undocumented)
    recordPlay(): void;
    // (undocumented)
    recordStart(): void;
    // (undocumented)
    stopFn: Function;
    // (undocumented)
    stopRecord(): void;
}

// @public (undocumented)
export const recordScreen: RecordScreen;

// @public (undocumented)
export interface ReplaceHandler {
    // Warning: (ae-forgotten-export) The symbol "ReplaceCallback" needs to be exported by the entry point index.d.ts
    //
    // (undocumented)
    callback: ReplaceCallback;
    // (undocumented)
    type: EVENTTYPES;
}

// @public (undocumented)
export function resourceTransform(target: ResourceErrorTarget): ReportDataType;

// @public (undocumented)
export function setTraceId(httpUrl: string, callback: (headerFieldName: string, traceId: string) => void): void;

// @public (undocumented)
export function subscribeEvent(handler: ReplaceHandler): boolean;

// @public (undocumented)
export class TransportData {
    constructor();
    // (undocumented)
    apikey: string;
    // (undocumented)
    backTrackerId: unknown;
    // (undocumented)
    beforeDataReport: unknown;
    // (undocumented)
    beforePost(data: FinalReportType): Promise<false | TransportDataType>;
    // (undocumented)
    bindOptions(options?: InitOptions): void;
    // (undocumented)
    configReportUrl: unknown;
    // (undocumented)
    configReportXhr: unknown;
    // (undocumented)
    errorDsn: string;
    // (undocumented)
    getAuthInfo(): AuthInfo;
    // (undocumented)
    getDeviceInfo(): DeviceInfo | any;
    // (undocumented)
    getRecord(): any[];
    // (undocumented)
    getTrackerId(): string | number;
    // (undocumented)
    getTransportData(data: FinalReportType): TransportDataType;
    // (undocumented)
    imgRequest(data: any, url: string): void;
    // (undocumented)
    isSdkTransportUrl(targetUrl: string): boolean;
    // (undocumented)
    queue: Queue;
    // (undocumented)
    send(data: FinalReportType): Promise<void>;
    // (undocumented)
    trackDsn: string;
    // (undocumented)
    trackKey: string;
    // (undocumented)
    useImgUpload: boolean;
    // (undocumented)
    xhrPost(data: any, url: string): Promise<void>;
}

// @public (undocumented)
export const transportData: TransportData;

// @public (undocumented)
export function triggerHandlers(type: EVENTTYPES, data: any): void;


// (No @packageDocumentation comment for this package)

```
