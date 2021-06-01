<template>
  <div class="home">
    <div class="position">
      <i class="iconfont">&#xe604;</i>
        <p>广东省广州市天河区</p>
      <i class="iconfont">&#xe613;</i>
    </div>
  </div>
</template>
<style lang="scss">
@import '../assets/style/viriables.scss'; 
.home {
  padding: 0 10px;
  .position{
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: $content-colofont;
  }
  .iconfont{
    font-size: .2rem;
  }
}
</style>