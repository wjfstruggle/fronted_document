<template>
<!-- 子组件 my-map.vue -->
  <div>
    {{msgF}}
    <div>
      名字：{{obj.name}} / 年龄：{{obj.age}}
    </div>
    <my-map-son></my-map-son>
  </div>
</template>
<script>
import { defineComponent, inject,toRefs } from 'vue'
import MyMapSon from '@/components/my-map-son/my-map-son.vue'
export default defineComponent({
  props:{
    list:{
      type: Array,
      default: () => []
    }
  },

  components:{
    MyMapSon
  },
  // provide 与 inject的用法
  setup(props) {
    console.log(props.list)
    const msgF = inject('msg')
    const obj = inject('obj')
    return {
      msgF,
      obj
    }
  }
})
</script>