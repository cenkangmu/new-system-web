import Home from "../views/home";
import UserList from "../views/system/userList";
import roleList from '../views/system/roleList';
import MenuList from "../views/system/menuList";
interface routeObj {
  [prop:string]:any
}
 const router:routeObj =  {
  '/home':Home,
   '/system/user-list':UserList,
   '/system/role-list':roleList,
   '/system/menu-list':MenuList,
}

export default router