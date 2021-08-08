<template>
  <div class="home">
    <div id="nav">
      商品管理
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
    
  },
  methods: {
    go() {
      this.$router.push({ path: '/aboutaaa' })
    }
  }
}
</script>

<style lang="less" scoped>
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

