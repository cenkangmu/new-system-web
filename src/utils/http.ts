import axios, {AxiosRequestConfig} from "axios";
import ApiCom from "./ApiCom";
import logout from "./logout";

const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 15000
})
http.interceptors.request.use((config) => {
  config.headers["Authorization"] = localStorage.token || ''
  return config
})

http.interceptors.response.use(({data, headers}) => {

  if (data.state === 503) {
    ApiCom.Alert({
      message: data.msg,
      type: 'error',
      showIcon: true
    })
    setTimeout(logout, 1000)
    return
  }

  localStorage.token = headers.authorization || ''
  return data
})
export default http