export * from './handleEvents';
export * from './load';
export * from './replace';
import { log } from '@monitoring/core';
import { SDK_VERSION, SDK_NAME } from '@monitoring/shared';
import { InitOptions } from '@monitoring/types';
declare function init(options?: InitOptions): void;
export { SDK_VERSION, SDK_NAME, init, log };
//# sourceMappingURL=index.d.ts.map