import { ReportDataType, MITOHttp, Replace, ResourceErrorTarget } from '@monitoring/types';
export declare function handleConsole(data: Replace.TriggerConsole): void;
export declare function resourceTransform(target: ResourceErrorTarget): ReportDataType;
export declare function httpTransform(data: MITOHttp): ReportDataType;
//# sourceMappingURL=transformData.d.ts.map