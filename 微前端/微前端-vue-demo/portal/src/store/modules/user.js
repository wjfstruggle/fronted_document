import { JSEncrypt } from 'jsencrypt'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { KEY } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const encryptor = new JSEncrypt()
encryptor.setPublicKey(KEY)
const user = {
  state: {
    token: getToken(),
    userInfo: {
      currentCampusNames: '总部',
      currentRoleId: '0ef60b0d745849f7af9a90d94c00300,f',
      currentRoleName: 'admin',
      id: '6',
      loginName: 'cg',
      menu: [],
      mobile: '18811117311',
      skinId: 'blackgold',
      staffNo: '111111',
      status: true,
      systemUpdateTime: '系统更新于 2021-8-3 08:07:14',
      updateBy: '超管',
      updateDate: '',
      userName: '超管'
    },
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_ROLES: (state, menu) => {
      state.roles = menu
    }
  },

  actions: {
    // 登录
    login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password.trim()
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (username === 'admin' && password === 'admin') {
            const token = encryptor.encrypt('asasas')
            setToken(token)
            commit('SET_TOKEN', token)
            resolve()
          } else {
            reject('账号密码错误')
          }
        }, 800)
      })
    },
    // 获取用户信息
    getUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        const userInfo = {
          currentCampusNames: '总部111',
          currentRoleId: '0ef60b0d745849f7af9a90d94c00300,f',
          currentRoleName: 'admin',
          id: '6',
          loginName: 'cg',
          menu: [  // 子应用与菜单
            {
              appName: '微应用一',
              appPrefix: '/sub-app1',
              icon: 'el-icon-bell',
              // noDisplay: true,  // 是否具有该权限
              // ...  一些其他的信息
              appMenus: [
                { 
                  menuName: '订单管理',
                  path: '/',
                  icon: 'zht-icon-success',
                  // ...  权限等信息 
                },
                {
                  menuName: '售后管理',
                  path: '/afterSaleManage',
                  icon: 'el-icon-user',
                },
                {
                  menuName: '营销管理',
                  path: '/marketManage',
                  icon: 'el-icon-user',
                },
              ]
            },
            {
              appName: '微应用二',
              appPrefix: '/sub-app2',
              // noDisplay: true,
              appMenus: [
                {
                  menuName: '商品管理',
                  path: '/',
                  icon: 'el-icon-user',
                  children: [
                    {
                      menuName: '商品组件',
                      path: '/wareCom',
                      icon: 'el-icon-user',
                    }
                  ]
                },
                {
                  menuName: '投票管理',
                  path: '/voteManage',
                  icon: 'el-icon-user'
                }
              ]
            },
            {
              appName: '微应用三',
              appPrefix: '/sub-app3',
              // noDisplay: true,
              appMenus: [
                {
                  menuName: '服务列表',
                  path: '/',
                  icon: 'el-icon-user'
                },
                {
                  menuName: '弹窗列表',
                  path: '/popupManage',
                  icon: 'el-icon-user'
                }
              ]
            },
          ],
        }
        if (userInfo.menu && userInfo.menu.length) {
          commit('SET_ROLES', userInfo.menu)
          commit('SET_USERINFO', userInfo)
          resolve(userInfo)
        } else {
          reject()
        }
      })
    },
    // 动态修改权限
    changeRoles({ dispatch }) {
      return new Promise(async resolve => {
        const { data } = await dispatch('getUserInfo')
        resetRouter()
        const { menu, id } = data.userInfo
        const accessRoutes = await dispatch('generateRoutes', { id, menu }) // 动态修改权限后 重绘侧边菜单
        // dynamically add accessible routes
        router.addRoutes(accessRoutes)
        resolve()
      })
    },
    // 登出
    logOut({ commit, state }) {
      return new Promise((resolve, reject) => {
      })
    },
    // 前端 登出
    fedLogOut({ commit }) {
      return new Promise(resolve => {
        sessionStorage.clear(true)
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
