<template>
  <div class="s-canvas">
    <el-button type="primary" :disabled="isDisabled" @click="handleClick">{{
      tipText
    }}</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tipText: "获取验证码",
      downCount: 60,
      isDisabled: false,
    };
  },
  methods: {
    /**点击获取验证码按钮回调父组件方法*/
    handleClick() {
      this.countDown();
      this.$emit("handleClick");
    },
    /**60秒倒计时*/
    countDown() {
      const that = this;
      //发送验证码按钮置灰，不可点击
      this.isDisabled = true;
      this.buttonType = "info";
      //60秒倒计时
      let interval = window.setInterval(function () {
        that.tipText = that.downCount + "秒后再次获取";
        that.downCount = that.downCount - 1;
        if (that.downCount <= 0) {
          that.downCount = 60;
          that.tipText = "获取验证码";
          //发送验证码按钮恢复可点击
          that.isDisabled = false;
          that.buttonType = "primary";
          window.clearInterval(interval);
        }
      }, 1000);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/theme.scss";

.s-canvas {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  align-items: center;
  .code-button {
    background: #69d258;
    border-radius: 5px;
    color: #fff;
    font-size: 14px;
    border: none;
    outline: none;
  }

  .el-button--primary {
    @include text_color();
    @include border_color();
    @include background_color();
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
