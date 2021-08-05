import Home from "@/pages/home/home.vue";

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    /**
     * path: 路径为 / 时触发该路由规则
     * name: 路由的 name 为 Home
     * component: 触发路由时加载 `Home` 组件
     */
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('../pages/login/login.vue')
  }
];

export default routes;
