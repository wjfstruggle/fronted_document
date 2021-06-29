<template>
  <div class="search">
    <span class="iconfont">&#xe649;</span>
    <span class="search__text">搜你感兴趣的内容</span>
  </div>
</template>
<style lang="scss" scoped>
@import '@/assets/style/viriables.scss'; 
.search{
    line-height: .3rem;
    background: #eee;
    border-radius: .08rem;
    display: flex;
    align-items: center;
    margin-top: 20px;
    .iconfont{
      padding: 0 .08rem 0 .12rem;
    }
    &__text {
      color: $content-colofont;
      font-size: .13rem;
      display: inline-block;
    }
  }
</style>