<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss" scope>
#app {
  a.router-link-exact-active {
    color: #a523c2;
    border-bottom: 2px solid #a523c2;
  }
}
</style>
