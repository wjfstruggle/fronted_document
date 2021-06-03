<template>
  <div class="home">
    <position></position>
    <search></search>
    <banner></banner>
    <serve-list></serve-list>
    <div class="grap"></div>
    <nearby></nearby>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import Search from '@/components/search/search.vue'
import Position from '@/components/position/position.vue'
import Banner from '@/components/banner/banner.vue'
import ServeList from '@/components/serve-list/serve-list.vue'
import Nearby from '@/components/nearby/nearby.vue'
export default defineComponent({
  components:{
    Search,
    Position,
    Banner,
    ServeList,
    Nearby
  },
  setup() {
    
  },
})
</script>

<style lang="scss">
@import '@/assets/style/viriables.scss'; 
.home {
  padding: 0 .2rem .49rem .2rem;
  overflow-y: auto;
  .grap{
    background: #f1f1f1;
    height: .1rem;
    margin:0 -.2rem
  }
}
</style>