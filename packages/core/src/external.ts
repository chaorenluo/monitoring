import { ERRORTYPES, BREADCRUMBTYPES } from '@monitoring/shared'
import {
    isError,
    extractErrorStack,
    getLocationHref,
    getTimestamp,
    unknownToString,
    Severity,
} from '@monitoring/utils'
import { transportData } from './transportData'
import { breadcrumb } from './breadcrumb'
import { TNumStrObj } from '@monitoring/types'

interface LogTypes {
    message: TNumStrObj
    tag?: TNumStrObj
    level?: Severity
    ex?: Error | any
}
/**
 *
 * 自定义上报事件
 * @export
 * @param {LogTypes} { message = 'emptyMsg', tag = '', level = Severity.Critical, ex = '' }
 */
export function log({ message = 'emptyMsg', tag = '', level = Severity.Critical, ex = '' }: LogTypes): void {
    let errorInfo = {}
    if (isError(ex)) {
        errorInfo = extractErrorStack(ex, level)
    }
    const error = {
        type: ERRORTYPES.LOG_ERROR,
        level,
        message: unknownToString(message),
        name: 'monitoring.log',
        customTag: unknownToString(tag),
        time: getTimestamp(),
        url:  getLocationHref(),
        ...errorInfo
    }
    breadcrumb.push({
        type: BREADCRUMBTYPES.CUSTOMER,
        category: breadcrumb.getCategory(BREADCRUMBTYPES.CUSTOMER),
        data: message,
        level: Severity.fromString(level.toString())
    })
    transportData.send(error)
}
