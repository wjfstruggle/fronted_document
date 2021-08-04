<template>
  <el-menu-item :index="handlePath(routeChildren.path)" @click="handleLink">
    <i :class="item.meta.icon"></i>
    <span>{{ routeChildren.meta.title }}</span>
  </el-menu-item>
</template>

<script>
import { isExternal } from "@/utils/validate";
import path from "path";

export default {
  name: "MenuItem",
  props: {
    routeChildren: {
      type: Object,
      default() {
        return null;
      },
    },
    item: {
      type: Object,
      default() {
        return null;
      },
    },
    fullPath: {
      type: String,
      default: "",
    },
  },
  methods: {
    handlePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.fullPath)) {
        return this.fullPath;
      }
      return path.resolve(this.fullPath, routePath);
    },
    handleLink() {
      const routePath = this.routeChildren.path;

      if (isExternal(routePath)) {
        window.location.href = routePath;
      } else if (isExternal(this.fullPath)) {
        window.location.href = this.fullPath;
      } else if (this.$route.path !== path.resolve(this.fullPath, routePath)) {
        this.$router.push(path.resolve(this.fullPath, routePath)).catch((err) => console.log(err));
      }
    },
  },
};
</script>
