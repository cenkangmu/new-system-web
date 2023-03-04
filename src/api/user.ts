import http from "../utils/http";

export type User = {
  username: string
  password: string
  head_img?: string
  id?: string
  code?: string
}
export const userLogin = (data: User) => http.post('/users/login', data)

export const getUserById = (id: string) => http(`/users/${id}`)

export const getUsers = (username: string) => http(`/users?username=${username}`)

export const addUser = (data: User) => http.post(`/users`, data)

export const updateUser = (id:string,data: User) => http.put(`/users/${id}`, data)

export const deleteUer = (id: string) => http.delete(`/users/${id}`,)

export const changeUserRoles = (roleIds:string) => http.post(`/users/changeUserRoles`, {roleIds})

export const getUserRoles = () => http.get(`/users/getUserRoles`)