import { Severity } from '@monitoring/utils';
import { TNumStrObj } from '@monitoring/types';
interface LogTypes {
    message: TNumStrObj;
    tag?: TNumStrObj;
    level?: Severity;
    ex?: Error | any;
}
export declare function log({ message, tag, level, ex }: LogTypes): void;
export {};
//# sourceMappingURL=external.d.ts.map