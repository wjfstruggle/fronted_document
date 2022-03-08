<template>
  <div>{{ obj}}</div>
</template>
<script>
import { defineComponent,inject } from "vue";

export default defineComponent({
  setup() {
    console.log("setup");
    const obj = inject('user')
    return {
      obj
    }
  },
});
</script>
