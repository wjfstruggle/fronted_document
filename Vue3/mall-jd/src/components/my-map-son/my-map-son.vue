<template>
<!-- 子孙组件 my-map-son.vue -->
  <div>
    <div>
      名字：{{obj.name}} / 年龄：{{obj.age}}
    </div>
  </div>
</template>
<script>
import { defineComponent, inject } from 'vue'
export default defineComponent({
  // provide 与 inject的用法
  setup() {
    const obj = inject('my-map-son')
    return {
      obj
    }
  }
})
</script>