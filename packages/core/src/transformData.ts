import { ReportDataType, MITOHttp, Replace, ResourceErrorTarget } from '@monitoring/types'
import { getLocationHref, getTimestamp, Severity, fromHttpStatus, SpanStatus, interceptStr } from '@monitoring/utils'
import { BREADCRUMBTYPES, ERRORTYPES, globalVar } from '@monitoring/shared'
import { breadcrumb } from './breadcrumb'
import { getRealPath } from './errorId'

//console错误上报格式
export function handleConsole(data:Replace.TriggerConsole):void{
    if(globalVar.isLogAddBreadcrumb){
        breadcrumb.push({
            type: BREADCRUMBTYPES.CONSOLE,
            category: breadcrumb.getCategory(BREADCRUMBTYPES.CONSOLE),
            data,
            level: Severity.fromString(data.level)
        })
    }
}


const resourceMap = {
    img: '图片',
    script: 'js脚本'
}

//资源错误上报格式
export function resourceTransform(target: ResourceErrorTarget):ReportDataType{
    return {
        type: ERRORTYPES.RESOURCE_ERROR,
        url: getLocationHref(),
        message: '资源地址: ' + (interceptStr(target.src, 120) || interceptStr(target.href, 120)),
        level: Severity.Low,
        time: getTimestamp(),
        name: `${resourceMap[target.localName] || target.localName}加载失败`
    }
}

//http错误上报格式
export function httpTransform(data: MITOHttp): ReportDataType {
    let message = ''
    const { elapsedTime, time, method, traceId, type, status } = data
    const name = `${type}--${method}`
    if (status === 0) {
        message =
            elapsedTime <= globalVar.crossOriginThreshold ? 'http请求失败，失败原因：跨域限制或域名不存在' : 'http请求失败，失败原因：超时'
    } else {
        message = fromHttpStatus(status)
    }
    message = message === SpanStatus.Ok ? message : `${message} ${getRealPath(data.url)}`
    return {
        type: ERRORTYPES.FETCH_ERROR,
        url: getLocationHref(),
        time,
        elapsedTime,
        level: Severity.Low,
        message,
        name,
        request: {
            httpType: type,
            traceId,
            method,
            url: data.url,
            data: data.reqData || ''
        },
        response: {
            status,
            data: data.responseText
        }
    }
}


