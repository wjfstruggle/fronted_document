<template>
  <div class="serve-list">
    <div class="serve-list__item" v-for="item in 10" :key="item">
      <img class="serve-list__img" src="https://cloud-staging.jzjiv.com/424130694027593_27bxPq6o.jpg" alt="">
      <span class="serve-list__desc">测试商圈</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '@/assets/style/viriables.scss'; 
  .serve-list{
    margin-top: .12rem;
    display: flex;
    flex-wrap: wrap;
    &__item {
      width: 20%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }
    &__img {
      width: .4rem;
      height: .4rem;
    }
    &__desc {
      text-align: center;
      color: $content-colofont;
      font-size: .13rem;
      padding: .1rem 0;
    }
  }
</style>