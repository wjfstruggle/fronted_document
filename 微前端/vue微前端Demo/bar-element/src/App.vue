<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/HeaderFilter">搜索框</router-link>
      |
      <router-link to="/VerificationCode">验证码</router-link>
      |
      <router-link to="/UploadFiles">上传</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>