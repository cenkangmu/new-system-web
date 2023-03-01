import http from "../utils/http";

export const getMenuList = ()=>http.get('/menus')