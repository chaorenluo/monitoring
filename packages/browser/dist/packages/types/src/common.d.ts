import { HTTPTYPE } from '@monitoring/shared';
export interface MITOHttp {
    type: HTTPTYPE;
    traceId?: string;
    method?: string;
    url?: string;
    status?: number;
    reqData?: any;
    sTime?: number;
    elapsedTime?: number;
    responseText?: any;
    time?: number;
    isSdkUrl?: boolean;
}
export interface ResourceErrorTarget {
    src?: string;
    href?: string;
    localName: string;
}
export declare type TNumStrObj = number | string | object;
export interface IAnyObject {
    [key: string]: any;
}
export interface MITOXMLHttpRequest extends XMLHttpRequest {
    [key: string]: any;
    mito_xhr?: MITOHttp;
}
//# sourceMappingURL=common.d.ts.map