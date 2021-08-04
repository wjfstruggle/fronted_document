<template>
  <div>
    <menu-item
      v-if="!item.children && !item.hidden"
      :item="item"
      :full-path="fullPath"
      :route-children="routeChildren"
    />
    <submenu
      v-if="item.children && !item.hidden"
      :item="item"
      :full-path="fullPath"
      :route-children="routeChildren"
    >
      <side-bar-item
        v-for="route in item.children"
        :key="route.path"
        :full-path="handlePath(route.path)"
        :item="route"
      />
    </submenu>
  </div>
</template>

<script>
import MenuItem from "./MenuItem";
import Submenu from "./Submenu";
import { isExternal } from "@/utils/validate";
import path from "path";

export default {
  name: "SideBarItem",
  components: {
    MenuItem,
    Submenu,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    fullPath: {
      type: String,
      default: "",
    },
  },
  created() {
    this.handleChildren(this.item.children, this.item);
  },
  methods: {
    handleChildren(children = [], parent) {
      if (children === null) children = [];

      const showChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          this.routeChildren = item;
          return true;
        }
      });
      if (showChildren.length === 1) {
        return true;
      }

      if (showChildren.length === 0) {
        this.routeChildren = {
          ...parent,
          path: "",
          notShowChildren: true,
        };
        return true;
      }
      return false;
    },
    handlePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.fullPath)) {
        return this.fullPath;
      }
      return path.resolve(this.fullPath, routePath);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.vab-nav-icon {
  margin-right: 4px;
}

::v-deep {
  .el-tag {
    float: right;
    height: 16px;
    padding-right: 4px;
    padding-left: 4px;
    margin-top: calc((#{$base-menu-item-height} - 16px) / 2);
    line-height: 16px;
    border: 0;
  }
}
</style>
