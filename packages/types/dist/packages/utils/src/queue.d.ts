import { voidFun } from '@monitoring/shared';
export declare class Queue {
    private micro;
    private stack;
    private isFlushing;
    constructor();
    addFn(fn: voidFun): void;
    clear(): void;
    getStack(): any[];
    flushStack(): void;
}
//# sourceMappingURL=queue.d.ts.map