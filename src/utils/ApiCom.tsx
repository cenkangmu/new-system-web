import {Alert, AlertProps} from "antd";
import store from "../redux/store";

function createUUID(length = 16): string {
  let str = Math.random().toString(32).substring(2)
  if (str.length >= length) {
    return str.substring(0, length)
  } else {
    return str + createUUID(length - str.length)
  }
}

export default {
  createUUID,
  Alert(props:AlertProps,time:number=1500,onClose?:()=>void) {
    const id = createUUID()
    store.dispatch({type: 'addComp', id, data: <Alert key={id} {...props}/>})
    setTimeout(()=>{
      store.dispatch({type:'delComp', id})
      onClose && onClose()
    },time)
  }
}