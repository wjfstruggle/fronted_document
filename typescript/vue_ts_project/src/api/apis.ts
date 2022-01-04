// 存放接口url
import axios, {ResponseData} from './index';
import { AxiosPromise } from 'axios';

interface LoginReqArguInterface { // 用户登录
  userName:string,
  password:number|string
}
export const LoginReq = (params:LoginReqArguInterface):AxiosPromise<ResponseData> => {
  return axios.request({
    url:"/user/login",
    params,
    method:"POST"
  })
}