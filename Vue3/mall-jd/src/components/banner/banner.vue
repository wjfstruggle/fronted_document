<template>
  <div class="banner">
    <img class="banner__img" :src="bannerList[2].coverPhoto?bannerList[2].coverPhoto:''" alt="">
  </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props:['bannerList'],
  setup() {
    
  },
})
</script>

<style lang="scss" scoped>
  .banner{
    padding: .12rem 0;
    height: 0;
    overflow: hidden;
    padding-bottom: 42.5%;
    &__img{
      width: 100%;
      border-radius: .08rem;
    }
  }
</style>