<template>
  <div class="search">
    <span class="iconfont">&#xe649;</span>
    <span class="search__text">大型互联网领域多场景最佳实践</span>
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