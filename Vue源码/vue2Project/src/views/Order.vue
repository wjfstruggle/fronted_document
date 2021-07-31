<template>
  <div class="order">订单列表页</div>
</template>

<script>
export default {
  name: "Order",
  data() {
    return {}; 
  },
  watch: {
    '$route'(to, from) {
      console.log(to, from);
    },
  },
};
</script>