<template>
  <div class="vue-admin-beautiful-wrapper">
    <div
      v-if="'horizontal' === layout"
      class="layout-container-horizontal"
      :class="{
        fixed: header === 'fixed',
        'no-tabs-bar': tabsBar === 'false' || tabsBar === false,
      }"
    >
      <div :class="header === 'fixed' ? 'fixed-header' : ''">
        <top-bar />
        <div
          v-if="tabsBar === 'true' || tabsBar === true"
          :class="{ 'tag-view-show': tabsBar }"
        >
          <div class="vab-main">
            <tabs-bar />
          </div>
        </div>
      </div>
      <div class="vab-main main-padding">
        <app-main />
      </div>
    </div>
    <div
      v-else
      class="layout-container-vertical"
      :class="{
        fixed: header === 'fixed',
        'no-tabs-bar': tabsBar === 'false' || tabsBar === false,
      }"
    >
      <side-bar />
      <div class="vab-main" :class="collapse ? 'is-collapse-main' : ''">
        <div :class="header === 'fixed' ? 'fixed-header' : ''">
          <nav-bar />
          <tabs-bar v-if="tabsBar === 'true' || tabsBar === true" />
        </div>
        <app-main />
      </div>
    </div>
    <el-backtop />
  </div>
</template>

<script>
import TopBar from "./components/TopBar/index";
import SideBar from "./components/SideBar/index";
import AppMain from "./components/AppMain/index";
import TabsBar from "./components/TabsBar/index";
import NavBar from "./components/NavBar/index";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Layout",
  components: {
    TopBar,
    SideBar,
    AppMain,
    TabsBar,
    NavBar,
  },
  computed: {
    ...mapGetters({
      layout: "layout",
      tabsBar: "tabsBar",
      header: "header",
      collapse: "collapse",
    }),
  },
  created() {
    const theme = localStorage.getItem("bar-theme");

    if (null !== theme) {
      this.changeColor(JSON.parse(theme).color);
    } else {
      this.changeColor("default");
    }
  },
  mounted() {
    this.$baseEventBus.$on("setColor", (data) => {
      this.changeColor(data);
    });
  },
  methods: {
    changeColor(val) {
      window.document.documentElement.setAttribute("data-theme", val);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
@import "@/styles/theme.scss";

@mixin fix-header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: $base-z-index - 2;
  width: 100%;
  overflow: hidden;
}

.vue-admin-beautiful-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  .layout-container-horizontal {
    position: relative;

    &.fixed {
      padding-top: calc(#{$base-top-bar-height} + #{$base-tabs-bar-height});
    }

    &.fixed.no-tabs-bar {
      padding-top: $base-top-bar-height;
    }

    ::v-deep {
      .vab-main {
        width: 90%;
        margin: auto;
      }

      .fixed-header {
        @include fix-header;
      }

      .tag-view-show {
        background: $base-color-white;
        box-shadow: $base-box-shadow;
      }

      .nav-bar-container {
        .fold-unfold {
          display: none;
        }
      }

      .main-padding {
        .app-main-container {
          margin-top: $base-padding;
          margin-bottom: $base-padding;
          padding: $base-padding;
          background: $base-color-white;
        }
      }
    }
  }

  .layout-container-vertical {
    position: relative;

    .mask {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: $base-z-index - 1;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background: #000;
      opacity: 0.5;
    }

    &.fixed {
      padding-top: calc(#{$base-nav-bar-height} + #{$base-tabs-bar-height});
    }

    &.fixed.no-tabs-bar {
      padding-top: $base-nav-bar-height;
    }

    .vab-main {
      position: relative;
      min-height: 100%;
      margin-left: $base-left-menu-width;
      background: #f6f8f9;
      transition: $base-transition;

      ::v-deep {
        .fixed-header {
          @include fix-header;

          left: $base-left-menu-width;
          width: $base-right-content-width;
          box-shadow: $base-box-shadow;
          transition: $base-transition;
        }

        .nav-bar-container {
          position: relative;
          box-sizing: border-box;
        }

        .tabs-bar-container {
          box-sizing: border-box;
        }

        .app-main-container {
          width: calc(
            100% - #{$base-padding} - #{$base-padding} - #{$base-padding} - #{$base-padding}
          );
          margin: $base-padding auto;
          padding: $base-padding;
          background: $base-color-white;
          border-radius: $base-border-radius;
        }
      }

      &.is-collapse-main {
        margin-left: $base-left-menu-width-min;

        ::v-deep {
          .fixed-header {
            left: $base-left-menu-width-min;
            width: calc(100% - 65px);
          }
        }
      }
    }
  }
}
</style>
