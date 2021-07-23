import {_support} from "../../utils/src";
import rrweb from 'rrweb/lib/rrweb'



export class RecordScreen {
    maxFrame:number=140
    frame:any[] = [];
    stopFn:Function;
    record:any = rrweb;
    recordStart(){
        const newThis = this;
        this.stopFn = this.record.record({
            emit(event) {
                if(newThis.frame.length>newThis.maxFrame){
                    newThis.frame.shift()
                }
                newThis.frame.push(event)
            }
        })
    }
    stopRecord(){
        this.stopFn && this.stopFn()
    }
    recordPlay(){
        const rePlayer = new this.record.Replayer(this.frame);
        rePlayer.play();
    }
}
const recordScreen = _support.recordScreen || (_support.recordScreen = new RecordScreen())
export { recordScreen }
