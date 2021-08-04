<template>
  <div>
    <span @click="handleOpenThemeBar" title="主题配置">
      <svg-icon icon-class="huaban" />
    </span>
    <div class="theme-bar-setting">
      <div @click="handleOpenThemeBar">
        <svg-icon icon-class="huaban -white" />
        <p>主题配置</p>
      </div>
    </div>
    <el-drawer
      title="主题配置"
      :visible.sync="drawerVisible"
      direction="rtl"
      append-to-body
      size="400px"
    >
      <el-scrollbar style="height: 94vh; overflow: hidden">
        <div class="el-drawer__body">
          <el-form ref="form" :model="theme" label-position="top">
            <el-form-item label="主题">
              <el-radio-group v-model="theme.color">
                <el-radio-button label="default">默认</el-radio-button>
                <el-radio-button label="green">绿色</el-radio-button>
                <el-radio-button label="blue">蓝色</el-radio-button>
                <el-radio-button label="pink">橙色</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="布局">
              <el-radio-group v-model="theme.layout">
                <el-radio-button label="vertical">纵向布局</el-radio-button>
                <el-radio-button label="horizontal">横向布局</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="头部">
              <el-radio-group v-model="theme.header">
                <el-radio-button label="fixed">固定头部</el-radio-button>
                <el-radio-button label="noFixed">不固定头部</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="多标签">
              <el-radio-group v-model="theme.tabsBar">
                <el-radio-button label="true">开启</el-radio-button>
                <el-radio-button label="false">不开启</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button @click="setDfaultTheme">恢复默认</el-button>
              <el-button type="primary" @click="handleSaveTheme">
                保存
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
    </el-drawer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ThemeBar",
  data() {
    return {
      drawerVisible: false,
      theme: {
        color: "default",
        layout: "",
        header: "fixed",
        tabsBar: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      layout: "layout",
      header: "header",
      tabsBar: "tabsBar",
    }),
  },
  created() {
    const theme = localStorage.getItem("bar-theme");

    if (null !== theme) {
      this.theme = JSON.parse(theme);
      this.handleSetTheme();
    } else {
      this.theme.color = "default";
      this.theme.layout = this.layout;
      this.theme.header = this.header;
      this.theme.tabsBar = this.tabsBar;
      this.handleSetTheme();
    }
  },
  methods: {
    ...mapActions({
      changeLayout: "changeLayout",
      changeHeader: "changeHeader",
      changeTabsBar: "changeTabsBar",
    }),
    handleOpenThemeBar() {
      this.drawerVisible = true;
    },
    handleSetTheme() {
      let { color, layout, tabsBar, header } = this.theme;
      localStorage.setItem(
        "bar-theme",
        `{
            "color":"${color}",
            "layout":"${layout}",
             "header":"${header}",
            "tabsBar":"${tabsBar}"
          }`
      );
      this.changeLayout(layout);
      this.changeHeader(header);
      this.changeTabsBar(tabsBar);
      this.$baseEventBus.$emit("setColor", this.theme.color); // 切换主题色
      this.drawerVisible = false;
    },
    handleSaveTheme() {
      this.handleSetTheme();
    },
    // 恢复默认设置
    setDfaultTheme() {
      localStorage.removeItem("bar-theme");
      this.theme.color = "default";
      this.theme.layout = this.layout;
      this.theme.header = this.header;
      this.theme.tabsBar = this.tabsBar;
      this.$baseEventBus.$emit("setColor", this.theme.color);
      this.drawerVisible = false;
      location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
@import "@/styles/variables.scss";

@mixin right-bar {
  position: fixed;
  right: 0;
  z-index: $base-z-index;
  width: 60px;
  min-height: 60px;
  text-align: center;
  cursor: pointer;
  @include background_color();
  border-radius: $base-border-radius;

  > div {
    padding-top: 10px;
    border-bottom: 0 !important;

    &:hover {
      opacity: 0.9;
    }

    & + div {
      border-top: 1px solid $base-color-white;
    }

    p {
      padding: 0;
      margin: 0;
      font-size: $base-font-size-small;
      line-height: 30px;
      color: $base-color-white;
    }
  }
}

.theme-bar-setting {
  @include right-bar;

  top: calc((100vh - 110px) / 2);

  ::v-deep {
    svg:not(:root).svg-inline--fa {
      display: block;
      margin-right: auto;
      margin-left: auto;
      color: $base-color-white;
    }

    .svg-icon {
      display: block;
      margin-right: auto;
      margin-left: auto;
      font-size: 20px;
      color: $base-color-white;
      fill: $base-color-white;
    }
  }
}

::v-deep .el-drawer__header {
  margin-bottom: 10px;
  padding: 15px 20px 0;
}

.el-drawer__body {
  padding-left: 20px;

  ::v-deep {
    // 主题栏
    .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      @include text_color();
      @include background_color();
      @include border_color();
      box-shadow: -1px 0 0 0 transparent !important;
    }

    .el-button--primary {
      @include text_color();
      @include background_color();
      @include border_color();
    }

    .el-radio-button__inner {
      padding: 9px 15px;
    }

    .el-radio-button__inner:hover {
      @include hover_color();
    }

    .el-button.el-button--default:hover {
      background-color: #fff;
      @include border_color();
      @include hover_color();
    }
  }
  .el-form-item__content button {
    padding: 9px 15px;
  }
}
</style>

<style lang="scss">
.el-drawer__wrapper {
  outline: none !important;

  * {
    outline: none !important;
  }
}

.vab-color-picker {
  .el-color-dropdown__link-btn {
    display: none;
  }
}
</style>
