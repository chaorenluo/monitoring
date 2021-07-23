import { _support, validateOption, logger, isBrowserEnv, variableTypeDetection, Queue, isEmpty } from '@monitoring/utils'
import { createErrorId } from './errorId'
import { SDK_NAME, SDK_VERSION } from '@monitoring/shared'
import { breadcrumb } from './breadcrumb'
import { AuthInfo, TransportDataType, EMethods, InitOptions, DeviceInfo, FinalReportType } from '@monitoring/types'

/**
 * 用来传输数据类，包含img标签、xhr请求
 * 功能：支持img请求和xhr请求
 *
 * ../class Transport
 */
export class TransportData{
    queue:Queue
    beforeDataReport:unknown = null
    backTrackerId:unknown = null
    configReportXhr:unknown = null
    configReportUrl:unknown = null
    useImgUpload = false
    apikey = ''
    trackKey = ''
    errorDsn = ''
    trackDsn = ''
    constructor() {
        this.queue = new Queue()
    }
    imgRequest(data: any, url: string):void{
        const requestFun = () => {
            let img = new Image()
            const spliceStr = url.indexOf('?') === -1 ? '?' : '&'
            img.src = `${url}${spliceStr}data=${encodeURIComponent(JSON.stringify(data))}`
            img = null
        }
        this.queue.addFn(requestFun)
    }
    async xhrPost(data: any, url: string) {
        const requestFun = (): void => {
            const xhr = new XMLHttpRequest()
            xhr.open(EMethods.Post, url)
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
            xhr.withCredentials = true
            if (typeof this.configReportXhr === 'function') {
                this.configReportXhr(xhr, data)
            }
            xhr.send(JSON.stringify(data))
        }
        this.queue.addFn(requestFun)
    }
    getRecord(): any[] {
        const recordData = _support.record
        if (recordData && variableTypeDetection.isArray(recordData) && recordData.length > 2) {
            return recordData
        }
        return []
    }
    getDeviceInfo(): DeviceInfo | any {
        return _support.deviceInfo || {}
    }
    getTransportData(data: FinalReportType): TransportDataType {
        return {
            authInfo: this.getAuthInfo(),
            breadcrumb: breadcrumb.getStack(),
            data,
            record: this.getRecord(),
            deviceInfo: this.getDeviceInfo()
        }
    }
    async beforePost(data: FinalReportType) {
        const errorId = createErrorId(data, this.apikey)

        if (!errorId) return false
        data.errorId = errorId
        let transportData = this.getTransportData(data)
        if (typeof this.beforeDataReport === 'function') {
            transportData = await this.beforeDataReport(transportData)
            if (!transportData) return false
        }
        return transportData
    }
    getTrackerId(): string | number {
        if (typeof this.backTrackerId === 'function') {
            const trackerId = this.backTrackerId()
            if (typeof trackerId === 'string' || typeof trackerId === 'number') {
                return trackerId
            } else {
                logger.error(`trackerId:${trackerId} 期望 string 或 number 类型，但是传入 ${typeof trackerId}`)
            }
        }
        return ''
    }
    getAuthInfo(): AuthInfo {
        const trackerId = this.getTrackerId()
        const result: AuthInfo = {
            trackerId: String(trackerId),
            sdkVersion: SDK_VERSION,
            sdkName: SDK_NAME
        }
        this.apikey && (result.apikey = this.apikey)
        this.trackKey && (result.trackKey = this.trackKey)
        return result
    }
    isSdkTransportUrl(targetUrl: string): boolean {
        let isSdkDsn = false
        if (this.errorDsn && targetUrl.indexOf(this.errorDsn) !== -1) {
            isSdkDsn = true
        }
        if (this.trackDsn && targetUrl.indexOf(this.trackDsn) !== -1) {
            isSdkDsn = true
        }
        return isSdkDsn
    }
    bindOptions(options: InitOptions = {}): void {
        const {
            dsn,
            beforeDataReport,
            apikey,
            configReportXhr,
            backTrackerId,
            configReportUrl,
        } = options
        validateOption(apikey, 'apikey', 'string') && (this.apikey = apikey)
        validateOption(dsn, 'dsn', 'string') && (this.errorDsn = dsn)
        validateOption(beforeDataReport, 'beforeDataReport', 'function') && (this.beforeDataReport = beforeDataReport)
        validateOption(configReportXhr, 'configReportXhr', 'function') && (this.configReportXhr = configReportXhr)
        validateOption(backTrackerId, 'backTrackerId', 'function') && (this.backTrackerId = backTrackerId)
        validateOption(configReportUrl, 'configReportUrl', 'function') && (this.configReportUrl = configReportUrl)
    }
    /**
     * 监控错误上报的请求函数
     * @param data 错误上报数据格式
     * @returns
     */
    async send(data: FinalReportType) {

        let  dsn = this.errorDsn
        if (isEmpty(dsn)) {
            logger.error('dsn为空，没有传入监控错误上报的dsn地址，请在init中传入')
            return
        }
        const result = await this.beforePost(data)

        if (!result) return
        if (typeof this.configReportUrl === 'function') {
            dsn = this.configReportUrl(result, dsn)
            if (!dsn) return
        }

        if (isBrowserEnv) {
            return this.useImgUpload ? this.imgRequest(result, dsn) : this.xhrPost(result, dsn)
        }
    }
}
const transportData = _support.transportData || (_support.transportData = new TransportData())
export { transportData }
