import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elementUi from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
if (process.env.NODE_ENV === 'development') { require('../mock/mock') }
Vue.config.productionTip = false

Vue.use(elementUi);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
