<template>
  <div>
    Vue微应用2首页
  </div>
</template>
<script>
export default {
  name: "content-home",
    data() {
    return {
    }
  },
  computed: {
    currentRoute() {
      const menu = this.menus.find(item => item.route === this.$route.path)
      return menu ? menu.key : "vue";
    }
  },
}
</script>