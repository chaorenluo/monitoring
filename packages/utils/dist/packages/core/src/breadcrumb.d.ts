import { BreadcrumbPushData, InitOptions } from '@monitoring/types';
import { BREADCRUMBTYPES, BREADCRUMBCATEGORYS } from '@monitoring/shared';
export declare class Breadcrumb {
    maxBreadcrumbs: number;
    beforePushBreadcrumb: unknown;
    stack: BreadcrumbPushData[];
    constructor();
    push(data: BreadcrumbPushData): void;
    immediatePush(data: BreadcrumbPushData): void;
    shift(): boolean;
    clear(): void;
    getStack(): BreadcrumbPushData[];
    getCategory(type: BREADCRUMBTYPES): BREADCRUMBCATEGORYS.HTTP | BREADCRUMBCATEGORYS.USER | BREADCRUMBCATEGORYS.DEBUG | BREADCRUMBCATEGORYS.EXCEPTION;
    bindOptions(options?: InitOptions): void;
}
declare const breadcrumb: Breadcrumb;
export { breadcrumb };
//# sourceMappingURL=breadcrumb.d.ts.map