import Vue from 'vue'
import VueRouter from 'vue-router'
// import '../public-path';
Vue.use(VueRouter)

// const _import = require('./import-development')

const routes = [
  {
    path: "/HeaderFilter",
    name: "headerFilter",
    // component: _import("@/views/HeaderFilter/index"),
    component: () => import("@/views/HeaderFilter/index"),
  },
  {
    path: "/VerificationCode",
    name: "verificationCode",
    // component: _import("@/views/VerificationCode/index"),
    component: () => import("@/views/VerificationCode/index"),
  },
  {
    path: "/UploadFiles",
    name: "uploadFiles",
    // component: _import("@/views/UploadFiles/index"),
    component: () => import("@/views/UploadFiles/index"),
  },
]

export default routes
