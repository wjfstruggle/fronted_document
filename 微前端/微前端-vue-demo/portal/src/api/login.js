import axios from 'axios'

// 登录
export const login = (username, password) => {
  return axios({
    url: '/user/authenCheck',
    data: {}
  })
}