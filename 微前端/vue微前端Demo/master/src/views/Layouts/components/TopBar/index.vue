<template>
  <div class="top-bar-container">
    <div class="vab-main">
      <el-row>
        <el-col :xl="7" :lg="7" :md="7" :sm="7" :xs="7">
          <logo />
        </el-col>
        <el-col :xl="12" :lg="12" :md="12" :sm="12" :xs="12">
          <el-menu
            :background-color="variables['menu-background']"
            :text-color="variables['menu-color']"
            :active-text-color="variables['menu-color-active']"
            :default-active="activeMenu"
            mode="horizontal"
            menu-trigger="hover"
          >
            <template v-for="route in routes">
              <side-bar-item
                v-if="!route.hidden"
                :key="route.path"
                :full-path="route.path"
                :item="route"
              />
            </template>
          </el-menu>
        </el-col>
        <el-col :xl="5" :lg="5" :md="5" :sm="5" :xs="5">
          <div class="right-panel">
            <full-screen-bar @refresh="refreshRoute" />
            <theme-bar class="hidden-md-and-down" />
            <avatar />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import SideBarItem from "../SideBar/components/SideBarItem";
import logo from "../Logo/Logo";
import avatar from "../Avatar/index";
import ThemeBar from "../ThemeBar/index";
import FullScreenBar from "../FullScreenBar/index";
import variables from "@/styles/variables.scss";
import { mapGetters } from "vuex";

export default {
  name: "TopBar",
  components: {
    SideBarItem,
    avatar,
    ThemeBar,
    FullScreenBar,
    logo,
  },
  data() {
    return {
      pulse: false,
      menuTrigger: "hover",
    };
  },
  computed: {
    ...mapGetters({
      routes: "getrouters",
      visitedRoutes: "visitedRoutes",
    }),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    variables() {
      return variables;
    },
  },
  methods: {
    async refreshRoute() {
      this.$baseEventBus.$emit("reload-router-view");
      this.pulse = true;
      setTimeout(() => {
        this.pulse = false;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
@import "@/styles/variables.scss";

.top-bar-container {
  display: flex;
  align-items: center;
  justify-items: flex-end;
  height: $base-top-bar-height;
  background: $base-menu-background;

  .vab-main {
    background: $base-menu-background;

    ::v-deep {
      .el-menu {
        &.el-menu--horizontal {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          height: $base-top-bar-height;
          border-bottom: 0 solid transparent !important;

          .el-menu-item,
          .el-submenu__title {
            padding: 0 15px;
          }

          .el-menu-item,
          .el-submenu .el-submenu__title {
            height: $base-top-bar-height;
            line-height: $base-top-bar-height;
          }

          @media only screen and (max-width: 767px) {
            .el-menu-item,
            .el-submenu__title {
              padding: 0 8px;
            }

            li:nth-child(4),
            li:nth-child(5) {
              display: none !important;
            }
          }

          .el-submenu .el-menu--horizontal .el-submenu__title {
            height: $base-menu-item-height;
            line-height: $base-menu-item-height;
          }
        }

        svg {
          width: 1rem;
          margin-right: 3px;
        }

        &--horizontal {
          .el-menu {
            .el-menu-item,
            .el-submenu__title {
              height: $base-menu-item-height;
              line-height: $base-menu-item-height;
            }
          }

          .el-submenu,
          .el-menu-item {
            &.is-active {
              border-bottom: 1.5px solid transparent;
              @include background_color(); /* 混入背景颜色样式示例 */
              @include border_color();
              .el-submenu__title {
                border-bottom: 1.5px solid transparent;
                @include border_color();
              }
            }
          }

          > .el-menu-item {
            .el-tag {
              margin-top: calc(#{$base-top-bar-height} / 2 - 7.5px);
              margin-left: 5px;
            }

            @media only screen and (max-width: 1199px) {
              .el-tag {
                display: none;
              }
            }

            // &.is-active {
            //   background-color: transparent !important;
            //   border-bottom: 1px solid $base-color-blue !important;
            // }
          }

          .el-submenu .el-submenu__icon-arrow {
            position: absolute;
            top: 50%;
            right: 0;
            margin-top: -4px;
            transition: transform 0.3s;
            font-size: 12px;
          }
        }
      }
    }
  }

  .right-panel {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: $base-top-bar-height;

    ::v-deep {
      .user-name {
        color: rgba($base-color-white, 0.9);
      }

      .user-name + i {
        color: rgba($base-color-white, 0.9);
      }

      svg {
        width: 1em;
        height: 1em;
        margin-right: 15px;
        font-size: $base-font-size-big;
        color: rgba($base-color-white, 0.9);
        cursor: pointer;
        fill: rgba($base-color-white, 0.9);
      }

      button {
        svg {
          margin-right: 0;
          color: rgba($base-color-white, 0.9);
          cursor: pointer;
          fill: rgba($base-color-white, 0.9);
        }
      }

      .el-badge {
        margin-right: 15px;
      }
    }
  }
}
</style>
