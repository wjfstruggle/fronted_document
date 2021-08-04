<template>
  <div class="filterPopover">
    <el-popover width="600" placement="top-start" trigger="click">
      <div class="filterPopoverContent">
        <el-form label-position="top" ref="popoverForm" :model="filterData">
          <el-form-item
            v-for="(item, index) in data"
            :key="index"
            :label="item.label"
            :prop="item.field"
          >
            <el-input
              v-if="item.type === 'input'"
              @keyup.native="
                $event.target.value = $event.target.value.replace(
                  /(^\s*)|(\s*$)/g,
                  ''
                )
              "
              v-model="filterData[item.field]"
              :placeholder="`请输入${item.label}`"
            ></el-input>
            <el-date-picker
              v-if="item.type === 'daterange'"
              v-model="filterData[item.field]"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
            <el-date-picker
              v-if="item.type === 'monthrange'"
              v-model="filterData[item.field]"
              type="monthrange"
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              value-format="yyyy-MM"
            >
            </el-date-picker>
            <el-time-picker
              v-if="item.type === 'timerange'"
              is-range
              v-model="filterData[item.field]"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            >
            </el-time-picker>
            <el-select
              v-if="item.type === 'select'"
              v-model="filterData[item.field]"
              filterable
              :placeholder="`请选择${item.label}`"
              class="inputClassPl"
            >
              <el-option
                v-for="v in item.options"
                :key="v.value"
                :label="v.label"
                :value="v.value"
              >
              </el-option>
            </el-select>
            <el-cascader
              v-if="item.type === 'cascader'"
              class="inputClassPl"
              style="width: 100%"
              v-model="filterData[item.field]"
              :options="item.options"
              :props="{ multiple: item.multiple }"
              clearable
            >
            </el-cascader>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn-search-bt">
        <el-button type="" class="btn btn-re" @click="resetFn('popoverForm')"
          >重置</el-button
        >
        <el-button type="primary" class="btn search-btn" @click="searchFn"
          >搜索</el-button
        >
      </div>
      <!--下拉按鈕-->
      <i class="el-icon-caret-bottom" slot="reference"></i>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "FilterPopover",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    filterData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {
    filterData: {
      deep: true,
      immediate: true,
      handler(val) {},
    },
  },
  methods: {
    resetFn(formName) {
      this.$refs[formName].resetFields();
      for (let i in this.filterData) {
        this.filterData[i] = "";
      }
      console.log("重置表单", this.filterData);
    },
    searchFn() {
      this.$emit("childSearchFn", this.filterData);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/theme.scss";

.filterPopover {
  width: 20px;
  display: inline-block;
  .el-icon-caret-bottom {
    height: 36px;
    width: 20px;
    line-height: 36px;
    color: #84878e;
    cursor: pointer;
    font-size: 16px;
  }
}

.el-popover {
  .el-form {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      width: 45%;
      padding: 0 10px;
      margin-bottom: 0;
    }
  }
  .el-date-editor {
    width: 100% !important;
  }
  .btn-search-bt {
    margin-top: 10px;
    text-align: right;
    .el-button {
      width: 80px;
      height: 40px;
      font-size: 14px;
      &:hover {
        opacity: 0.8;
      }
    }
    .search-btn {
      @include text_color();
      @include border_color();
      @include background_color();
    }
    .btn-re {
      background-color: #fff !important;
      @include border_color();
      @include hover_color();
    }
  }

  .filterPopoverContent {
    .el-form-item--small .el-form-item__label {
      line-height: 26px !important;
    }
    ::v-deep {
      .el-form-item__content {
        .el-input__inner:focus {
          @include border_color();
        }
      }
    }
  }
  .el-form-item__label {
    padding-bottom: 0 !important;
  }
  .el-date-editor .el-range-separator {
    width: 10%;
    line-height: 32px;
  }
}
</style>

<style lang="scss">
@import "@/styles/theme.scss";

.el-input.is-active .el-input__inner,
.el-input__inner:focus {
  @include border_color();
}
.el-scrollbar {
  .el-select-dropdown__item.selected {
    @include hover_color();
  }
}
.el-date-table td.today span {
  @include hover_color();
}
.el-range-editor.is-active,
.el-range-editor.is-active:hover {
  @include border_color();
}
.el-date-table td.available:hover {
  @include hover_color();
}
.el-month-table td {
  &.today {
    .cell {
      @include hover_color();
    }
  }
  .cell:hover {
    @include hover_color();
  }
}
.el-time-panel__btn.confirm {
  @include hover_color();
}

.el-cascader-node.in-active-path,
.el-cascader-node.is-active,
.el-cascader-node.is-selectable.in-checked-path {
  @include hover_color();
}

.el-date-table {
  td.end-date span,
  td.start-date span {
    @include text_color();
    @include background_color();
  }
}
.el-picker-panel__icon-btn:hover {
  @include hover_color();
}

.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  @include text_color();
  @include border_color();
  @include background_color();
}
.el-checkbox__inner:hover {
  @include border_color();
}

.el-month-table {
  td.end-date .cell,
  td.start-date .cell {
    @include text_color();
    @include background_color();
  }
}
.el-cascader {
  .el-input .el-input__inner:focus,
  .el-input.is-focus .el-input__inner {
    @include border_color();
  }
}
</style>
