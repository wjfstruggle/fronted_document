<template>
  <div id="nav">
    <div class="footer">
      <div class="footer__item">
        <img src="@/assets/img/tab-benefits.png" alt="">
        <span>首页</span>
      </div>
      <div class="footer__item">
        <img src="@/assets/img/tab-class.png" alt="">
        <span>分类</span>
      </div>
      <div class="footer__item">
        <img src="@/assets/img/tab-cart.png" alt="">
        <span>购物车</span>
      </div>
      <div class="footer__item">
        <img src="@/assets/img/tab-my.png" alt="">
        <span>我的</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.footer{
  border-top: 1px solid rgb(224, 224, 224);
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  display: flex;
  text-align: center;
  padding: 0 .18rem;
  .footer__item{
    flex: 1;
    color: rgb(133, 128, 128);
    font-size: .14rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 25px;
      height: 25px;
      margin-bottom: 4px;
    }
  }
}
</style>
