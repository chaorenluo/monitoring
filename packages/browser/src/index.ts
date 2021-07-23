export * from './handleEvents'
export * from './load'
export * from './replace'
import { setupReplace } from './load'
import { initOptions, log } from '@monitoring/core'
import { _global } from '@monitoring/utils'
import { SDK_VERSION, SDK_NAME } from '@monitoring/shared'
import { InitOptions } from '@monitoring/types'
function webInit(options: InitOptions = {}): void {
    if (!('XMLHttpRequest' in _global) || options.disabled) return
    initOptions(options)
    setupReplace()
}

function init(options: InitOptions = {}): void {
    webInit(options)
}

export { SDK_VERSION, SDK_NAME, init, log }
