<template>
    <div id="cns-main-app">
      <div>
        <main-menu :menus="menus" />
      </div>
      <section class="cns-frame-wrapper">
        <!-- 主应用渲染区，用于挂载主应用路由触发的组件 -->
        <router-view v-show="$route.name&&!vueToken" />

        <!-- 子应用渲染区，用于挂载子应用节点 -->
        <section v-show="!$route.name" id="frame"></section>
      </section>
    </div>
</template>
<script>
import MainMenu from "@/components/menu/menu.vue";
export default{
  /**
   * 菜单列表
   * key: 唯一 Key 值
   * title: 菜单标题
   * path: 菜单对应的路径
   */
  components: {
    MainMenu
  },
  watch:{
    '$route':'getPath'
  },
  data() {
    return {
      vueToken:'',
       menus:[
        {
          key: "VueMicroApp",
          title: "Vue微应用一",
          path: "/home"
        },
        {
          key: "VueContent",
          title: "Vue微应用二",
          path: "/content-home"
        }
      ]
    }
  },
  created() {
    this.vueToken = localStorage.getItem("vueToken")
  },
  methods: {
    getPath(){
      this.vueToken = localStorage.getItem("vueToken");
      this.$forceUpdate()
    }
  },
}
</script>
<style lang="scss" scoped>

</style>
