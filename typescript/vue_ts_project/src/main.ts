import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elementUi from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import axios from "@/utils/axios"
if (process.env.NODE_ENV === 'development') { require('../mock/mock') }
Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(elementUi);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
