import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('@/pages/login/login.vue')
  }
];


export default routes
