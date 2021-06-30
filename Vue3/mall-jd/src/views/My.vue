<template>
  <div>
    <div class="box">
      <button  @click='clickBtn'>点击</button>
      // to 指定挂在的元素位置
      <teleport to="body">
        <div v-show="show" class="mask">
        
        </div>
      </teleport>
      <!-- <div v-show="show" class="mask">
        
        </div> -->
      <my-son msg="打得你叫爸爸" @change="handelChange">
        获取插槽的内容
      </my-son>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import mySon from '@/components/my-son/my-son.vue'
export default defineComponent({
  components:{
    mySon
  },
  setup() {
    const show = ref(false)
    const clickBtn =() => {
      show.value = !show.value
    }
    const handelChange =() => {
      console.log('23456')
    }
    return {
      handelChange,
      clickBtn,
      show
    }
  },
})
</script>

<style>
    .box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 300px;
      height: 300px;
      background-color: aqua;
      z-index: 10;
    }

    .mask {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #000;
      opacity: .5;
    }
  </style>