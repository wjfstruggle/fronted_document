import axios from 'axios';
import { setStore, getStore, removeStore } from '@/utils/LocalstorageUtil.js';

/**创建axios实例*/
const service = axios.create({
  //baseURL: 'http://www.baidu.com', //填写域名
  timeout: 30000, // 请求超时时间
  withCredentials:true
});

/**request拦截器（请求前统一拦截）*/
service.interceptors.request.use(
  config => {
  // Do something before request is sent
    // console.log("请求地址="+config.url);

    if(getStore('ent_reject') == 1){
      return;
    }

    if(config.method=='get'){
      // console.log("请求参数="+JSON.stringify(config.params));
    }else{
      // console.log("请求参数="+JSON.stringify(config.data));
    }

    //注意post请求需要使用qs的stringify格式化一下（config.data = JSON.stringify(config.data);）
    config.data = JSON.stringify(config.data);
    config.headers = {
      //post提交json字符串时使用的头配置
      'Content-Type': 'application/json;charset=UTF-8',
      'token' : getStore("mall_token"),
      // 'token' : 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ4aWFvaG9uZ21hbyIsInVzZXJJZCI6Ijc0ODMyMDQ1NzEyNDc4MjA4IiwibmFtZSI6InhpYW9ob25nbWFvIiwiZW50ZXJwcmljZUlkIjoiNzQ4MzIwNDU3MDgyODM5MDQiLCJ1c2VyQ2F0ZWdvcnkiOiJlbnRlcnByaXNlIiwiZXhwIjoxNTk3NzQ3MjkwfQ.mzR3TGFADzx5J4ASqXxqGMKGV1z5a0EIck75nFR5ZUJzUM-fCyENJO54oCMzmUeazOjayzkdxD_51WLwXZ9UVMyk5SbwCzpoKJ2brJFfSpS4ztf6W-BNFTXmvYUKDWkRJ7dSNtFCfUGWmMwcK_StDQoVC3G0Xro-02kRT61wwzw',
    }
  return config;
}, error => {
  // Do something with request error
    // console.log(error);
    Promise.reject(error);
})

/**respone拦截器（返回后统一拦截）*/
service.interceptors.response.use(
  response => {
    // console.log("请求结果=" + JSON.stringify(response.data));

    if((undefined != response.data.code && response.data.code == 40101) || (response.data.code == 500 && response.data.msg.indexOf("token超时") != -1)) {
      console.info("========登录超时，请重新登录========");
    }

    return response.data;

  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          console.log('错误请求')
          break;
        case 401:
          console.log('未授权，请重新登录')
          break;
        case 403:
          console.log('拒绝访问')
          break;
        case 404:
          console.log('请求错误,未找到该资源')
          break;
        case 405:
          console.log('请求方法未允许')
          break;
        case 408:
          console.log('请求超时')
          break;
        case 500:
          console.log('服务器端出错')
          break;
        case 501:
          console.log('网络未实现')
          break;
        case 502:
          console.log('网络错误')
          break;
        case 503:
          console.log('服务不可用')
          break;
        case 504:
          console.log('网络超时')
          break;
        case 505:
          console.log('http版本不支持该请求')
          break;
        default:
          console.log(`连接错误${err.response.status}`)
      }
    } else {
      console.log('连接到服务器失败')
    }
    return Promise.reject(error);
  }
);

export default service;
