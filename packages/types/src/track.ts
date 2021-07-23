export interface DeviceInfo {
    //网络类型: 4g,3g,5g,wifi
    netType: string
    clientWidth: number
    clientHeight: number
    // 像素密度倍率(计算屏幕实际宽高 可使用此参数： 例 height = clientHeight * radio)
    ratio: number
}

