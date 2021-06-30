<template>
  <div>
    <button @click="handelClick"> 子组件</button>
  </div>
</template>
<script>
import { defineComponent,h } from 'vue'

export default defineComponent({
  setup(props,{attrs, slots, emit}) {
    console.log(attrs.msg) // 打得你叫爸爸
    console.log(slots.default()) // 
    // return ()=> h('div',{},slots.default()) // 输出自定义组件插槽的内容
    const handelClick =() => {
      emit('change')
    }
    return {
      handelClick
    }
  },
})
</script>
