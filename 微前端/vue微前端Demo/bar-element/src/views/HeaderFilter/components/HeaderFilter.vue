/******************************
组件信息： 列表页顶部筛选+操作按钮
传参数格式:
1、filterObj：【对象】控制表单类型、对应字段等
  filterObj: {
    name: // input placeholder
    filterPopover: { // 下拉筛选(无则不写)
      data: [{
        name: //标题
        type: // 表单类型 input\select\daterange\monthrange\timerange\cascader
        field: // 对应字段
        dataType: // 数据类型 string\array\object
        multiple: // 当type为cascader时特有(是否多选)
        options: // 下拉表单特有
      }]
    }
  }
2、filterData：【对象】form表单绑定对象
  filterData: {} // 表单字段
3、buttons：【数组】控制按钮类型、图标、点击事件
    buttons: [{
      name: // 按钮文本,
      num: // 数量,
      type: // 类型：text\primary\''，空表示图标
      icon: // 可直接使用el-icon-xxx，空则不显示图标
      iconUrl: require('@/assets/images/...') // 自定义图标路径
      fun: 'showUnregisterBusiness'  // 按钮点击事件名
    }]
4、getData：【筛选事件】
5、buttonFun： 【按钮点击事件出口】
    // 页面内定义或引用 @/mixins/views-mixin.js
    buttonFun(fun){
      this[fun]()
    },
6、firstSelect: 是不是下拉选项为第一个选项

例: <header-filter :filterObj="filterObj" :filterData.sync="filterFormData" :buttons="buttons"
                  @getData="getData" @buttonFun="buttonFun"></header-filter>
******************************/

<template>
  <el-header class="headerFilter">
    <el-row class="top">
      <!--左侧筛选-->
      <el-col :span="12" v-if="!firstSelect">
        <div class="headerFilterInput">
          <el-input
            :placeholder="`请输入${filterObj.name}`"
            class="inputClass1"
            clearable
            @keyup.native="
              $event.target.value = $event.target.value.replace(
                /(^\s*)|(\s*$)/g,
                ''
              )
            "
            @blur="filterData.keyword = trimSpace(filterData.keyword)"
            v-model="filterData.keyword"
          >
            <div slot="prepend" class="isFlex">
              <i class="el-icon-search"></i>
              <!--下拉筛选-->
              <filter-popover
                v-if="filterObj.filterPopover"
                :filterData="filterData"
                :data="filterObj.filterPopover.data"
                @childSearchFn="searchFn"
              ></filter-popover>
            </div>
            <el-button class="searchBtn" slot="append" @click="searchFn"
              >搜索</el-button
            >
          </el-input>
        </div>
      </el-col>
      <el-col :span="12" v-if="firstSelect">
        <div class="headerFilterSelect">
          <div class="isSelectFlex">
            <i class="el-icon-search"></i>
            <!--下拉筛选-->
            <filter-popover
              v-if="filterObj.filterPopover"
              :filterData="filterData"
              :data="filterObj.filterPopover.data"
              @childSearchFn="searchFn"
            ></filter-popover>
          </div>
          <el-select
            style="background: #f4f8f9; padding-bottom: 10px; width: 336px"
            class="inputClass"
            v-model="filterData.keyword"
            :placeholder="`请选择${filterObj.name}`"
          >
            <el-option
              v-for="item in filterObj.filterPopover.data[0].options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <div class="pa searchTxt" @click="searchFn">搜索</div>
        </div>
      </el-col>
      <!--右侧操作-->
      <el-col :span="12" class="rightButtons" v-if="buttons">
        <div
          style="display: inline-block; margin-left: 10px"
          v-for="(item, index) in buttons"
          :key="index"
        >
          <el-button
            v-if="item.isHasPermission == null ? true : item.isHasPermission"
            :type="item.type"
            :icon="item.icon"
            @click="myEmit(item.fun)"
          >
            <img v-if="item.iconUrl" class="share" :src="item.iconUrl" />
            <span v-if="item.type === 'text' && item.num === 0"
              >暂无{{ item.name }}</span
            >
            <span v-else>{{ item.name }}</span>
            <span v-if="item.num">（{{ item.num }}）</span>
          </el-button>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
import FilterPopover from "./FilterPopover";
export default {
  name: "HeaderFilter",
  components: {
    FilterPopover,
  },
  props: {
    filterObj: {
      type: Object,
      default: () => {},
    },
    filterData: {
      type: Object,
      default: () => {},
    },
    buttons: {
      type: Array,
      default: () => [],
    },
    firstSelect: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    searchFn() {
      // 发起搜索
      this.$emit("resetPage", 1);
      this.$emit("getData");
    },
    myEmit(fun) {
      this.$emit("buttonFun", fun);
    },
    trimSpace(str) {
      //删除左右两端的空格
      if (str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/theme.scss";

.headerFilter {
  height: 50px !important;
  padding: 0 !important;
  .isFlex {
    display: flex;
  }
  .el-icon-search {
    width: 40px;
    height: 38px;
    border-right: none;
    position: static;
    display: inline-block;
    &:before {
      content: "\e778";
      line-height: 38px;
      margin-left: 15px;
    }
  }
  .headerFilterInput {
    width: 400px;
  }
  .rightButtons {
    text-align: right;
    display: flex;
    justify-content: flex-end;
    i {
      cursor: pointer;
    }
    .el-button {
      //图标按钮
      height: 40px;
      width: 40px;
      line-height: 40px;
      @include border_color();
      @include hover_color();
      padding: 0;
      &:hover {
        opacity: 0.5;
        @include text_color();
        @include border_color();
        @include background_color();
      }
    }
    .el-button--primary {
      width: 120px;
      height: 40px;
      font-size: 14px;
      padding: 0 15px;
      @include text_color();
      @include background_color();
      &:hover {
        opacity: 0.8;
      }
    }
    .el-button--text {
      // 文字按钮
      padding: 0;
      width: auto;
      height: 40px;
      font-size: 14px;
      border: none;
      background: transparent;
      @include text_color();
    }
  }
  .el-input-group__append .el-button {
    width: 70px;
    &:hover {
      @include hover_color();
    }
  }
  .headerFilterSelect {
    width: 400px;
    display: flex;
    background-color: #fff;
    height: 40px;
  }
  .isSelectFlex {
    display: flex;
    border: 1px solid #d7dae1;
    border-right: none;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  .searchTxt {
    width: 70px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    left: 350px;
    top: 0;
    border: 1px solid #d7dae1;
    background: #f2f5f8;
    font-size: 14px;
    color: #84878e;
    cursor: pointer;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
  }
}
</style>

<style lang="scss">
.headerFilter {
  .el-input-group__prepend {
    padding: 0 !important;
    background: #fff;
  }
  .headerFilterInput .el-input__inner {
    padding-left: 10px !important;
  }
  .el-button {
    i {
      margin-left: 2px;
      font-size: 16px;
    }
  }
  .el-input--small .el-input__inner {
    padding-left: 10px !important;
  }
}
</style>
