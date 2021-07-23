import { voidFun } from '@monitoring/shared'
/**
 * 原生try函数
 * ../param fn try中执行的函数体
 * ../param errorFn 报错时执行的函数体，将err传入
 */
export function nativeTryCatch(fn:voidFun, errorFn?: (err: any) => void){
    try{
        fn();
    }catch (err){
        console.log(err);
        if (errorFn) {
            errorFn(err)
        }
    }
}
