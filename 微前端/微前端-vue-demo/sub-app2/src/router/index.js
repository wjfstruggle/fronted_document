import Vue from 'vue'
import VueRouter from 'vue-router'
import wareManage from '@/views/wareManage/wareManage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'wareManage',
    component: wareManage,
    children: [
      {
        path: '/wareCom',
        component: () => import('@/views/wareCom/wareCom.vue')
      }
    ]
  },
  {
    path: '/voteManage',
    name: 'voteManage',
    component: () => import('@/views/voteManage/voteManage.vue')
  }
]

const router = new VueRouter({
mode: 'history',
base:process.env.VUE_APP_BASE_PATH ||
(window.__POWERED_BY_QIANKUN__ ? "/sub-app2" : '/'),
  routes
})

export default router
