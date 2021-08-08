<template>
  <section class="cns-main-menu"  v-if="vueToken">
    <el-menu mode="inline" theme="dark" :selectedKeys="[selectKey]">
      <el-menu-item v-for="item in menus" :key="item.key" @click="changeMenu(item)">
        <router-link :to="{path: item.path }">
          <el-icon v-if="item.icon" :type="item.icon" />
          <span>{{item.title}}</span>
        </router-link>
      </el-menu-item>
    </el-menu>
  </section>
</template>

<script>

export default {
  props:{
    menus:{
      type: Array, 
      default:()=> []
    }
  },
  data(){
    return {
      selectKey:''
    }
  },
  watch:{
  },
  created() {
    this.vueToken = localStorage.getItem("vueToken")
  },
  methods: {
    changeMenu(item) {
      const { key } = item;
      this.selectKey = key;
    }
  },
}
</script>

<style lang="scss" scoped>
.cns-main-menu {
  width: 100%;
  height: 100%;
  .cns-menu {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    a {
      color: #fff;
      text-decoration: none;
    }
  }
  .cns-parent-title {
    font-size: 13px;
    color: rgba(233, 241, 255, 0.75);
  }
  .cns-child-title {
    font-size: 13px;
    color: #fff;
  }
  .cns-child-title:hover {
    color: #408fff;
  }
  /deep/ .cns-menu-sub {
    background: rgb(12, 28, 53);
  }
}
</style>