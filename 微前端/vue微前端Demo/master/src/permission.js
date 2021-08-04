import router from "./router";
import store from "./store";

const whiteList = ["/login", '/404', '/401']; // 不重定向白名单

router.beforeEach((to, from, next) => {
  // console.log("路由拦截", to.path);

  if (store.getters.gettoken) {
    // 判断是否有token
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      if (store.getters.getroles.length === 0) {
        // 判断当前用户是否已拉取完user_info信息
        store
          .dispatch("GetInfo")
          .then(res => {
            const roles = res.result.roles;
            //根据角色 生成响应的路由
            store.dispatch("GenerateRoutes", { roles }).then(() => {
              //生成可访问的路由表
              router.addRoutes(store.getters.getaddRouters); // 动态添加可访问路由表
              // next();
              next({ ...to, replace: true }); // hack方法 确保addRoutes已完成 ,设置replace: true，这样导航就不会留下历史记录
            });
          })
          .catch(err => {
            console.log(err);
          });
      } else {  // 有用户信息
        next(); //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      }
    }
  } else {  // 无token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next("/login");
    }
  }
});
