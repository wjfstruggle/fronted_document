<template>
  <div class="pa verify">
    <el-divider content-position="left">图片验证</el-divider>
    <div class="puzzle-item1">
      <el-button
        type="primary"
        @click="isVerificationShow = !isVerificationShow"
        >显示或隐藏验证码</el-button
      >
    </div>
    <div class="puzzle-item2">
      <PuzzleVerification
        v-model="isVerificationShow"
        :puzzleImgList="puzzleImgList"
        blockType="puzzle"
        :onSuccess="handleSuccess"
      />
    </div>
    <el-divider content-position="left">验证倒计时</el-divider>
    <div class="item1">
      <el-input
        size="large"
        style="width: 250px; margin-right: 10px"
        v-model="code"
        placeholder="请输入验证码"
      ></el-input>
      <CountDownVerification
        @handleClick="handleClick"
      ></CountDownVerification>
    </div>
  </div>
</template>

<script>
import PuzzleVerification from "./components/PuzzleVerification";
import CountDownVerification from "./components/CountDownVerification";
export default {
  components: {
    PuzzleVerification,
    CountDownVerification,
  },
  data() {
    return {
      isVerificationShow: true, //是否显示验证码
      puzzleImgList: [
        require("@/assets/images/puzleverificaton-img01.jpg"),
        require("@/assets/images/puzleverificaton-img02.jpg"),
        require("@/assets/images/puzleverificaton-img03.jpg"),
      ],
      code: "",
    };
  },
  methods: {
    handleSuccess() {
      console.log("验证成功");
    },
    handleClick() {
      this.code = Math.floor(Math.random() * (9999 - 1000) + 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";

.verify {
  .puzzle-item1 {
    margin: 20px;
  }
  .item1 {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: center;
    padding: 20px;
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