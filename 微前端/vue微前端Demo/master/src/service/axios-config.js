import axios from "axios";
import { Message } from "element-ui";

/****** 创建axios实例 ******/
const service = axios.create({
  timeout: 5000 // 请求超时时间
});

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 发送请求之前
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    const res = response.data;
    if (res.code !== 200) {
      Message({
        type: "error",
        message: res.message,
        duration: 5 * 1000
      });
    } else {
      return response.data;
    }
  },
  function (error) {
    // 响应错误
    return Promise.reject(error);
  }
);

export default service;
