import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// const _import = require('./import-development')

const routes = [
  {
    path: "/DateTime",
    name: "datetime",
    component: () => import("@/views/DateTime/index"),
  },
  {
    path: "/PreventReclick",
    name: "preventreclick",
    component: () => import("@/views/PreventReclick/index"),
  },
  {
    path: "/Validate",
    name: "validate",
    component: () => import("@/views/Validate/index"),
  }
]

export default routes
