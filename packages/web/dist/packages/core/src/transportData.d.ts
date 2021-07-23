import { Queue } from '@monitoring/utils';
import { AuthInfo, TransportDataType, InitOptions, DeviceInfo, FinalReportType } from '@monitoring/types';
export declare class TransportData {
    queue: Queue;
    beforeDataReport: unknown;
    backTrackerId: unknown;
    configReportXhr: unknown;
    configReportUrl: unknown;
    useImgUpload: boolean;
    apikey: string;
    trackKey: string;
    errorDsn: string;
    trackDsn: string;
    constructor();
    imgRequest(data: any, url: string): void;
    xhrPost(data: any, url: string): Promise<void>;
    getRecord(): any[];
    getDeviceInfo(): DeviceInfo | any;
    getTransportData(data: FinalReportType): TransportDataType;
    beforePost(data: FinalReportType): Promise<false | TransportDataType>;
    getTrackerId(): string | number;
    getAuthInfo(): AuthInfo;
    isSdkTransportUrl(targetUrl: string): boolean;
    bindOptions(options?: InitOptions): void;
    send(data: FinalReportType): Promise<void>;
}
declare const transportData: TransportData;
export { transportData };
//# sourceMappingURL=transportData.d.ts.map