<template>
  <div id="app">
    <!-- <div class="footer">
      <router-link class="footer__item" v-for="(item ,index) in navList" :key="index" :to="item.link" @click="changeTab(item,index)">
        <img :src="index == indexActive?item.urlActive:item.url" alt="">
        <span :class="index == indexActive?'footer__item--active':''">{{item.tab}}</span>
      </router-link>
    </div> -->
    <router-view />
  </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      indexActive:0,
      // navList:[
      //   {
      //     url:'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/72dedbac704b494b83a376c7b50b8521~tplv-k3u1fbpfcp-watermark.image',
      //     urlActive:'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b6e52dd2c444a22bafcf83988ae4f1a~tplv-k3u1fbpfcp-watermark.image',
      //     tab:'首页',
      //     link:'/home'
      //   },
      //   {
      //     url:'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b341f25f3d3a411ebff885cc07b78432~tplv-k3u1fbpfcp-watermark.image',
      //     urlActive:'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/05104a34ba7142e386aaa60346150bf9~tplv-k3u1fbpfcp-watermark.image',
      //     tab:'购物车',
      //     link:'/cart'
      //   },{
      //     url:'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b567ec82d9d146698214bc5259dd0724~tplv-k3u1fbpfcp-watermark.image',
      //     urlActive:'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4b85ea7fd2f4db380475db4ae154c78~tplv-k3u1fbpfcp-watermark.image',
      //     tab:'订单',
      //     link:'/order'
      //   },{
      //     url:'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d0168beb52484994b2caa0b1b5d0a040~tplv-k3u1fbpfcp-watermark.image',
      //     urlActive:'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da2749072a5942cb9f9957c8afe3c3df~tplv-k3u1fbpfcp-watermark.image',
      //     tab:'我的',
      //     link:'/my'
      //   }
      // ]
    }
  },
  methods:{
    changeTab(item,index){
      this.indexActive = index
      this.$router.push({
        path:item.link
      })
    }
  },
  setup() {
    return {}
  },
})
</script>

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
  padding: 0 .1rem .1rem 0;
  background: #fff;
  z-index: 10;
  .footer__item{
    flex: 1;
    color: rgb(133, 128, 128);
    font-size: .14rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    &--active{
      color: #FFA801;
    }
    img {
      width: 25px;
      height: 25px;
      margin-bottom: 4px;
    }
  }
}
</style>
