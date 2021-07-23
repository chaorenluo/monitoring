import { Severity } from '@monitoring/utils';
import { BREADCRUMBTYPES } from '@monitoring/shared';
import { ReportDataType } from './transportData';
import { Replace } from './replace';
import { TNumStrObj } from './common';
export interface BreadcrumbPushData {
    type: BREADCRUMBTYPES;
    data: ReportDataType | Replace.IRouter | Replace.TriggerConsole | TNumStrObj;
    category?: string;
    time?: number;
    level: Severity;
}
//# sourceMappingURL=breadcrumb.d.ts.map