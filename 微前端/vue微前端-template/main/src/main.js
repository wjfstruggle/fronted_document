import Vue from "vue";
import ElementUI from "element-ui";
import VueRouter from "vue-router";

import App from "./App.vue";
import routes from "./router";
import startQiankun from "./micro";
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.config.productionTip = false;

startQiankun();

/**
 * 注册路由实例
 * 即将开始监听 location 变化，触发路由规则
 */
const router = new VueRouter({
  mode: "history",
  routes,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#main-app");
