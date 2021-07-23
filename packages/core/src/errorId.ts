import {variableTypeDetection} from '@monitoring/utils'
import {ERRORTYPES, EVENTTYPES} from '@monitoring/shared'
import {ReportDataType} from '@monitoring/types'

const allErrorNumber: unknown = {}
export function createErrorId(data: ReportDataType, apikey: string):number | null{
    let id:any;
    switch (data.type){
        case ERRORTYPES.HTTP_ERROR:
            id = data.type + data.request.method + data.response.status + getRealPath(data.request.url) + apikey
            break
        case ERRORTYPES.JAVASCRIPT_ERROR:
        case ERRORTYPES.VUE_ERROR:
        case ERRORTYPES.REACT_ERROR:
            id=data.type+data.name+data.message + apikey
            break
        case ERRORTYPES.LOG_ERROR:
            id =data.customTag+data.type+data.name+apikey
            break
        case ERRORTYPES.PROMISE_ERROR:
            id = generatePromiseErrorId(data, apikey)
            break
        default:
            id = data.type + data.message + apikey
            break
    }

    id = hashCode(id)
    if (allErrorNumber[id] > 1) {
        return null
    }
    if (typeof allErrorNumber[id] === 'number') {
        allErrorNumber[id]++
    } else {
        allErrorNumber[id] = 1
    }

    return id
}
/**
 * 如果是UNHANDLEDREJECTION，则按照项目主域名来生成
 * 如果是其他的，按照当前页面来生成
 * @param data
 * @param originUrl
 */
function generatePromiseErrorId(data: ReportDataType, apikey: string) {
    const locationUrl = getRealPath(data.url)
    if (data.name === EVENTTYPES.UNHANDLEDREJECTION) {
        return data.type + objectOrder(data.message) + apikey
    }
    return data.type + data.name + objectOrder(data.message) + locationUrl
}

/**
 * http://.../project?id=1#a => http://.../project
 * http://.../id/123=> http://.../id/{param}
 *
 * @param url
 */
export function getRealPath(url: string): string {
    return url.replace(/[\?#].*$/, '').replace(/\/\d+([\/]*$)/, '{param}$1')
}

/**
 * sort object keys
 * ../param reason promise.reject
 */
function objectOrder(reason: any) {
    const sortFn = (obj: any) => {
        return Object.keys(obj)
            .sort()
            .reduce((total, key) => {
                if (variableTypeDetection.isObject(obj[key])) {
                    total[key] = sortFn(obj[key])
                } else {
                    total[key] = obj[key]
                }
                return total
            }, {})
    }
    try {
        if (/\{.*\}/.test(reason)) {
            let obj = JSON.parse(reason)
            obj = sortFn(obj)
            return JSON.stringify(obj)
        }
    } catch (error) {
        return reason
    }
}

export function hashCode(str: string): number {
    let hash = 0
    if (str.length == 0) return hash
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = (hash << 5) - hash + char
        hash = hash & hash
    }
    return hash
}
