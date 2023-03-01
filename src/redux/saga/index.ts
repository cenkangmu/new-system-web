import {all} from 'redux-saga/effects'
import sagaInit from './sagaInit'
import {getMenuList} from "../../api/menu";
const getMenus = sagaInit('getMenus', 'changeMenus', getMenuList,(data)=>data? data.data:[]  )
export default function *sageAll(){
  yield all([getMenus()])
}