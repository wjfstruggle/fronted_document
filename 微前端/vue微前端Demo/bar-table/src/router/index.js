import Vue from 'vue'
import VueRouter from 'vue-router'
// import '../public-path';
Vue.use(VueRouter)

// const _import = require('./import-development')

const routes = [
  {
    path: "/example",
    name: "example",
    // component: _import("@/views/example"),
    component: () => import("@/views/example"),
  },
  {
    path: "/example2",
    name: "example2",
    // component: _import("@/views/example2"),
    component: () => import("@/views/example2"),
  },

]

// const router = new VueRouter({
//   mode: 'history',
//   // base: window.__POWERED_BY_QIANKUN__ ? '/element' : '/',
//   // base: process.env.BASE_URL,
//   base: '/element',
//   routes
// })

export default routes
