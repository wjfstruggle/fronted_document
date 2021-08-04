<template>
  <div class="prevent-reclick">
    <el-divider content-position="left">防止重复点击</el-divider>
    <el-button class="btn" plain v-preventReClick>提交</el-button>
  </div>
</template>
<script>
import { preventReClick } from "@/utils/modules/preventReclick";

export default {
  name: "preventReclick",
  data() {
    return {};
  },
  directives: {
    preventReClick,
  },
};
</script>

<style lang="scss" scoped>
.prevent-reclick {
  .btn {
    margin-right: 20px;
  }
}
</style>