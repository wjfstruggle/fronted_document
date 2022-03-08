<template>
  <div class="home">
    <!-- <position></position> -->
    <search></search>
    <!-- <banner :bannerList="bannerList"></banner> -->
    <serve-list></serve-list>
    <test></test>
    <div class="grap"></div>
    <!-- <nearby></nearby> -->
    <button @click="handelClick">{{name}}</button>
    <div @click="handelClick">{{objname.name}}</div>
    <div @click="handelClick">{{user}}</div>
    <div @click="handelClick">{{user2}}</div>
    <button @click="handelClick2">增加{{count}}</button>
    <button @click="handelClick3">监听</button>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, ref, computed, watch,watchEffect ,provide} from 'vue'
import Search from '@/components/search/search.vue'
import Position from '@/components/position/position.vue'
// import Banner from '@/components/banner/banner.vue'
import ServeList from '@/components/serve-list/serve-list.vue'
import Nearby from '@/components/nearby/nearby.vue'
import test from './test.vue'
import { Toast } from 'vant'
import api from '@/api/api.js'
export default defineComponent({
  components:{
    Search,
    Position,
    // Banner,
    ServeList,
    Nearby,
    test
  },
  data(){
    return {
      name:'点击',
      source:'监听'
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
    },
    handelClick3() {
      this.source = "监听2" + Math.random()
    }
  },
  setup() {
    provide('user','兄弟')
    const state = reactive({
      bannerList: [], // 轮播图
      name:'点击2',
      count: 0
    })
    const objname = reactive({name:'我的对象'})
    const objname2 = reactive({
      name:'jenny',
      age:16
    })
    const count = ref(0)
    const handelClick =() => {
      console.log(count.value++)
    }
    const handelClick2 =() => {
      state.count++
    }
    setTimeout(() => {
      objname.name = '你的对象'
    },3000)
    const getBanners = async () => {
      const {code,data} = await api.queryBannersByPosition({position:1})
      if(code == 1) {
        state.bannerList = data;
      }
    }
    getBanners();
    // 计算属性computed
    const user = computed(() => {
      return objname.name + '是谁'
    })
    //  set 和 get
    const user2 = computed({
      get() {
        return objname2.name+ '_'+ objname2.age
      },
      set(val) {
        const age = val.split("_")
        objname2.name = objname2.name + age[1]
      }
    })
    const firstName = ref('');
    const lastName = ref('');
    watch(() => state.count,
      (count, prevCount) => {
        console.log('我被监听了',count, prevCount);
      })
      watch([firstName, lastName], (newValues, prevValues) => {
        console.log(newValues, prevValues);
      })
      firstName.value = "John";
      lastName.value = "Smith";

    watchEffect(() => {
      console.log('我被监听了',count.value); // 我被监听了 0
    })
    return {
      objname,
      count,
      ...toRefs(state),
      handelClick,
      user,
      user2,
      objname2,
      handelClick2
    }
  },
  watch: {
    'source'(newVal, oldVal) {
      console.log('我被监听了')
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