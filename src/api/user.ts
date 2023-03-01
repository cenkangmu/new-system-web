import http from "../utils/http";

export const userLogin = (data: {
  username: string,
  password: string,
  code: string
}) => http.post('/users/login', data)

export const getUserById = (id: string) => http(`/users/${id}`)

export const getUsers = (username:string) => http(`/users?username=${username}`)