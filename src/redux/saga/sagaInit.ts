import {take, fork, call, put} from 'redux-saga/effects'
import {resolve} from "dns";

function sagaInit(sagaType:string, reduxType:string, fn:()=>Promise<any>, callback?:(e:any)=>any) {
  return function* () {
    while (true) {
      //	take 拦截组件发来action
      yield take(sagaType)
      //	fork 同步执行异步处理函数
      yield fork(function* () {
        let data:any = yield call(fn)//拿到异步返回的数据
        //处理数据
        const res = callback ? callback(data) : null
        yield put({
          type: reduxType,
          data: res || data
        })
      })
    }
  }
}

export default sagaInit