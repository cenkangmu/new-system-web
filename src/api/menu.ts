import http from "../utils/http";

export type Menu = {
  label: string
  path: string
  type: string
  p_id: string
  id?: string
}

export const getMenuById = (id: string) => http(`/menus/${id}`)

export const getMenus = (data?:Menu) => http(`/menus`,{params:data})

export const getUserMenus = () => http.post(`/menus/user`)

export const addMenu = (data: Menu) => http.post(`/menus`, data)

export const updateMenu = (id:string,data: Menu) => http.put(`/menus/${id}`, data)

export const deleteUer = (id: string) => http.delete(`/menus/${id}`,)