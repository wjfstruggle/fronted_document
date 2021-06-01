import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
const routes = [
  {
    path: '/',
    redirect:'/home'
  },{
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import( '../views/Cart.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import( '../views/Order.vue')
  },{
    path: '/my',
    name: 'My',
    component: () => import( '../views/My.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
