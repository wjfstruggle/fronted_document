import Vue from 'vue'
import VueRouter from 'vue-router'
import serveManage from '@/views/serveManage/serveManage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'serveManage',
    component: serveManage
  },
  {
    path: '/popupManage',
    name: 'popupManage',
    component: () => import('@/views/popupManage/popupManage.vue')
  }
]

const router = new VueRouter({
mode: 'history',
base:process.env.VUE_APP_BASE_PATH ||
(window.__POWERED_BY_QIANKUN__ ? "/sub-app3" : '/'),
  routes
})

export default router
