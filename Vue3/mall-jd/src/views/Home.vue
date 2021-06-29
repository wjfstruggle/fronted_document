<template>
  <div class="home">
    <!-- <position></position> -->
    <search></search>
    <banner :bannerList="bannerList"></banner>
    <serve-list></serve-list>
    <div class="grap"></div>
    <!-- <nearby></nearby> -->
    <button @click="handelClick">{{name}}</button>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, ref } from 'vue'
import Search from '@/components/search/search.vue'
import Position from '@/components/position/position.vue'
import Banner from '@/components/banner/banner.vue'
import ServeList from '@/components/serve-list/serve-list.vue'
import Nearby from '@/components/nearby/nearby.vue'
import { Toast } from 'vant'
import api from '@/api/api.js'
export default defineComponent({
  components:{
    Search,
    Position,
    Banner,
    ServeList,
    Nearby
  },
  data(){
    return {
      name:'点击'
    }
  },
  beforeCreate(){
    console.log('beforeCreate')
  },
  created() {
    console.log('created')
  },
  // setup(props) {
  //   console.log('setup')
  // }
  methods:{
    handelClick() {
      console.log('handelClick1')
    }
  },
  setup() {
    const state = reactive({
      bannerList: [], // 轮播图
      name:'点击2'
    })
    const count = ref(0)
    const handelClick =() => {
      console.log(count.value++)
    }

    const getBanners = async () => {
      const {code,data} = await api.queryBannersByPosition({position:1})
      if(code == 1) {
        state.bannerList = data;
      }
    }
    getBanners();
    return {
      ...toRefs(state),
      handelClick
    }
  }
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