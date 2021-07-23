import { TransportDataType } from './transportData';
import { Breadcrumb } from '@monitoring/core';
import { BreadcrumbPushData } from './breadcrumb';
export declare type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS';
declare type CANCEL = null | undefined | boolean;
export declare enum EMethods {
    Get = "GET",
    Post = "POST",
    Put = "PUT",
    Delete = "DELETE"
}
interface IRequestHeaderConfig {
    url: string;
    method: HttpMethod;
}
declare type TSetRequestHeader = (key: string, value: string) => {};
export interface IBeforeAppAjaxSendConfig {
    setRequestHeader: TSetRequestHeader;
}
export interface HooksTypes {
    configReportXhr?(xhr: XMLHttpRequest, reportData: TransportDataType | any): void;
    beforeDataReport?(event: TransportDataType): Promise<TransportDataType | null | CANCEL> | TransportDataType | any | CANCEL | null;
    configReportUrl?(event: TransportDataType, url: string): string;
    beforePushBreadcrumb?(breadcrumb: Breadcrumb, hint: BreadcrumbPushData): BreadcrumbPushData | CANCEL;
    beforeAppAjaxSend?(config: IRequestHeaderConfig, setRequestHeader: IBeforeAppAjaxSendConfig): void;
    backTrackerId?(): string | number;
}
export interface SilentEventTypes {
    silentXhr?: boolean;
    silentFetch?: boolean;
    silentConsole?: boolean;
    silentDom?: boolean;
    silentHistory?: boolean;
    silentError?: boolean;
    silentUnhandledrejection?: boolean;
    silentHashchange?: boolean;
    silentVue?: boolean;
}
export interface InitOptions extends SilentEventTypes, HooksTypes {
    dsn?: string;
    disabled?: boolean;
    apikey?: string;
    debug?: boolean;
    enableTraceId?: boolean;
    includeHttpUrlTraceIdRegExp?: RegExp;
    traceIdFieldName?: string;
    filterXhrUrlRegExp?: RegExp;
    maxBreadcrumbs?: number;
}
export {};
//# sourceMappingURL=options.d.ts.map