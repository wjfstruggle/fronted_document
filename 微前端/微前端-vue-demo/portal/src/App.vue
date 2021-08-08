<template>
  <div id="portal-app">
    <Tips />
    <Layout v-if="showSubApp" />
    <!-- 如果没有登录信息 需要 进入router-view 登录页 -->
    <router-view v-else></router-view>
  </div>
</template>

<script>
import Tips from './Layout/components/Tips'
import Layout from '@/Layout'
import { mapGetters } from 'vuex'
export default {
  components: { Tips, Layout },
  computed: {
    ...mapGetters(['showSubApp'])
  },
}
</script>
