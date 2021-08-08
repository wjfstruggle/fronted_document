import Vue from 'vue'
import VueRouter from 'vue-router'
import OrderManage from '@/views/orderManage/orderManage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'orderManage',
    component: OrderManage
  },
  {
    path: '/afterSaleManage',
    name: 'afterSaleManage',
    component: () => import('@/views/afterSaleManage/afterSaleManage.vue'),
  },
  {
    path: '/marketManage',
    name: 'marketManage',
    component: () => import ('@/views/marketManage/marketManage.vue')
  },
]

const router = new VueRouter({
mode: 'history',
base:process.env.VUE_APP_BASE_PATH ||
(window.__POWERED_BY_QIANKUN__ ? "/sub-app1" : '/'),
  routes
})

export default router
