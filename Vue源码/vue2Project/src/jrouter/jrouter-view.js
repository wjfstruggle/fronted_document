export default {
  render(h) {
    // 标记当前router-view的深度
    this.$vnode.data.routerView = true;
    let depth = 0;
    let parent = this.$parent;
    while (parent) {
      const vnodeData = parent.$vnode && parent.$vnode.data
      if (vnodeData) {
        if (vnodeData.routerView) {
          // 说明当前parent是一个router-view
          depth++
        }
      }
      parent = parent.$parent;
    }
    //获取path对应的component
    // const {
    //   routeMap,
    //   current
    // } = this.$router;
    // console.log(routeMap, current);

    // const component = routeMap[current].component || null;
    let component = null;
    let route = this.$router.matched[depth]
    if (route) {
      component = route.component
    }
    return h(component)
  }
}