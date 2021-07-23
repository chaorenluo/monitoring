import { ERRORTYPES } from '@monitoring/shared';
import { DeviceInfo } from './track';
import { BreadcrumbPushData } from './breadcrumb';
export interface AuthInfo {
    apikey?: string;
    trackKey?: string;
    sdkVersion: string;
    sdkName: string;
    trackerId: string;
}
export declare type FinalReportType = ReportDataType;
export interface TransportDataType {
    authInfo: AuthInfo;
    breadcrumb?: BreadcrumbPushData[];
    data?: FinalReportType;
    record?: any[];
    deviceInfo?: DeviceInfo;
}
export interface ReportDataType {
    type?: ERRORTYPES;
    message?: string;
    url: string;
    name?: string;
    stack?: any;
    time?: number;
    errorId?: number;
    level: string;
    elapsedTime?: number;
    request?: {
        httpType?: string;
        traceId?: string;
        method?: string;
        url?: string;
        data?: any;
    };
    response?: {
        status: number;
        data: string;
    };
    componentName?: string;
    propsData?: any;
    customTag?: string;
}
//# sourceMappingURL=transportData.d.ts.map