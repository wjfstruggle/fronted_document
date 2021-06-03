<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <div class="nearby__item" v-for="item in 4" :key="item">
      <img class="nearby__item__img" src="http://www.dell-lee.com/imgs/vue3/near.png" alt="">
      <div class="nearby_content">
        <span class="nearby_content__title">沃尔玛</span>
        <div class="nearby_content__tagbox">
          <span class="nearby_content__tag">月销1万+</span>
          <span class="nearby_content__tag">起送¥元</span>
          <span class="nearby_content__tag">基础运费¥5元</span>
        </div>
        <p class="nearby_content__line">vip尊享满80减10的出校活动消费券</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '@/assets/style/viriables.scss'; 
.nearby{
  .nearby__item {
    display: flex;
    align-items: center;
    &__img {
      width: .56rem;
      height: .56rem;
      margin-right: 0.2rem;
    }
  }
  .nearby_content{
    color: $content-colofont;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #f1f1f1;
    &__title{
      font-size: .16rem;
      display: block;
      margin-top: .1rem;
    }
    &__tagbox{
      padding: .1rem 0 0 0;
    }
    &__tag {
      margin-right: 0.1rem;
    }
    &__line{
      color: rgb(255, 61, 61);
    }
  }
}
</style>