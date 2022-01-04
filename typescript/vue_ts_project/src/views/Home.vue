<template>
  <el-container>
    <el-header>Header</el-header>
    <el-main>Main</el-main>
  </el-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    
  },
})
export default class Home extends Vue {}
</script>
<style lang="scss" scoped>
.title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #505458;
}
i {
  margin: 0 8px 0 5px;
  font-size: 14px;
}
.forgetPassword {
  float: right;
}
</style>