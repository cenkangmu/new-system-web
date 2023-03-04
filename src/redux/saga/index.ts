import {all} from 'redux-saga/effects'
import sagaInit from './sagaInit'
import {getMenus ,getUserMenus} from "../../api/menu";
const getUserMenuArr = sagaInit('getUserMenus', 'changeUserMenus', getUserMenus,(data)=>data? data.data:[]  )

const getAllMenus = sagaInit('getAllMenus', 'changeAllMenus', ()=>new Promise(res=>{
  getMenus({
    label:'',path:'',type:'',p_id:''
  }).then(data=>res(data))
}),(data)=>data? data.data:[]  )

export default function *sageAll(){
  yield all([
    getUserMenuArr(),
    getAllMenus()
  ])
}