<template>
  <div>
    <!-- 父组件 -->
    <My-Map :list="list"></My-Map>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, ref, computed, watch,watchEffect, provide } from 'vue'
import MyMap from '@/components/my-map/my-map.vue'
export default defineComponent({
  components:{
    MyMap
  },
  // provide 与 inject的用法
  setup() {
    const msg = ref('子组件传递信息')
    const state = reactive({
      obj:{
        name: '网校账',
        age: 19
      }
    })
    const list = [1,2,3,4]
    provide('msg',msg)
    provide('obj',state.obj)
    // 传给子孙组件
    provide('my-map-son',state.obj)
    return {
      ...toRefs(state),
      list
    }
  }
})
</script>