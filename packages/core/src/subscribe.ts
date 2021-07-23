import { EVENTTYPES } from '@monitoring/shared'
import { getFlag, getFunctionName, logger, nativeTryCatch, setFlag } from '@monitoring/utils'
type ReplaceCallback = (data: any) => void

export interface ReplaceHandler{
    type:EVENTTYPES,
    callback:ReplaceCallback
}

const handlers: { [key in EVENTTYPES]?: ReplaceCallback[] } = {}

export function subscribeEvent(handler: ReplaceHandler):boolean{

    if(!handler || getFlag(handler.type))return false;

    setFlag(handler.type, true)
    handlers[handler.type] = handlers[handler.type] || []
    handlers[handler.type].push(handler.callback)
    return true
}
export function triggerHandlers(type: EVENTTYPES, data: any): void {
    if (!type || !handlers[type]) return
    handlers[type].forEach((callback) => {
        nativeTryCatch(
            () => {
                callback(data)
            },
            (e: Error) => {
                logger.error(`重写事件triggerHandlers的回调函数发生错误\nType:${type}\nName: ${getFunctionName(callback)}\nError: ${e}`)
            }
        )
    })
}
