<template>
  <div>
    <!--顶部筛选、操作-->
    <header-filter
      :filterObj="filterObj"
      :filterData.sync="filterFormData"
      :buttons="buttons"
      @buttonFun="buttonFun"
      @getData="getData"
      @resetPage="resetPage"
    ></header-filter>
    <!--api 说明-->
    <div class="api">
      <span>Attributes</span>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="arguments" label="参数" width="150px">
        </el-table-column>
        <el-table-column prop="description" label="说明" width="300px">
        </el-table-column>
        <el-table-column prop="type" label="类型" width="90px">
        </el-table-column>
        <el-table-column prop="options" label="可选值" width="200px">
        </el-table-column>
        <el-table-column prop="default" label="默认值" width="150px">
        </el-table-column>
      </el-table>
      <span>FilterObj Attributes</span>
      <el-table :data="filterObjAttribute" style="width: 100%">
        <el-table-column prop="arguments" label="参数" width="150px">
        </el-table-column>
        <el-table-column prop="description" label="说明"> </el-table-column>
        <el-table-column prop="type" label="类型" width="90px">
        </el-table-column>
        <el-table-column prop="options" label="可选值"> </el-table-column>
        <el-table-column prop="default" label="默认值" width="150px">
        </el-table-column>
      </el-table>
      <span>FilterPopover Attributes</span>
      <el-table :data="filterPopoverAttribute" style="width: 100%">
        <el-table-column prop="arguments" label="参数" width="150px">
        </el-table-column>
        <el-table-column prop="description" label="说明"> </el-table-column>
        <el-table-column prop="type" label="类型" width="90px">
        </el-table-column>
        <el-table-column prop="options" label="可选值"> </el-table-column>
        <el-table-column prop="default" label="默认值" width="150px">
        </el-table-column>
      </el-table>
      <span>Button Attributes</span>
      <el-table :data="buttonAttribute" style="width: 100%">
        <el-table-column prop="arguments" label="参数" width="150px">
        </el-table-column>
        <el-table-column prop="description" label="说明"> </el-table-column>
        <el-table-column prop="type" label="类型"> </el-table-column>
        <el-table-column prop="options" label="可选值"> </el-table-column>
        <el-table-column prop="default" label="默认值" width="150px">
        </el-table-column>
      </el-table>
      <span>Methods</span>
      <el-table :data="eventData" style="width: 100%">
        <el-table-column prop="event" label="事件名" width="150px">
        </el-table-column>
        <el-table-column prop="description" label="说明" width="300px">
        </el-table-column>
        <el-table-column prop="arguments" label="参数"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import HeaderFilter from "./components/HeaderFilter";


export default {
  name: "index",
  components: {
    HeaderFilter,
  },
  data() {
    return {
      // 顶部筛选表单值
      filterObj: {
        name: "用户名称",
        filterPopover: {
          data: [
            {
              label: "用户名称",
              type: "input",
              field: "keyword",
              dataType: "string",
            },
            {
              label: "状态",
              type: "select",
              field: "status",
              dataType: "string",
              options: [
                {
                  label: "全部",
                  value: "",
                },
                {
                  label: "禁用",
                  value: "0",
                },
                {
                  label: "启用",
                  value: "1",
                },
              ],
            },
            {
              label: "日期",
              type: "daterange",
              field: "date",
              dataType: "array",
            },
            {
              label: "月份",
              type: "monthrange",
              field: "month",
              dataType: "array",
            },
            {
              label: "时间",
              type: "timerange",
              field: "time",
              dataType: "array",
            },
            {
              label: "级联选择器",
              type: "cascader",
              field: "cascader",
              dataType: "string",
              multiple: false,
              options: [
                {
                  value: "zhinan",
                  label: "指南",
                  children: [
                    {
                      value: "shejiyuanze",
                      label: "设计原则",
                      children: [
                        {
                          value: "yizhi",
                          label: "一致",
                        },
                        {
                          value: "fankui",
                          label: "反馈",
                        },
                      ],
                    },
                    {
                      value: "daohang",
                      label: "导航",
                      children: [
                        {
                          value: "cexiangdaohang",
                          label: "侧向导航",
                        },
                        {
                          value: "dingbudaohang",
                          label: "顶部导航",
                        },
                      ],
                    },
                  ],
                },
                {
                  value: "zujian",
                  label: "组件",
                  children: [
                    {
                      value: "basic",
                      label: "Basic",
                      children: [
                        {
                          value: "layout",
                          label: "Layout 布局",
                        },
                        {
                          value: "color",
                          label: "Color 色彩",
                        },
                        {
                          value: "typography",
                          label: "Typography 字体",
                        },
                        {
                          value: "icon",
                          label: "Icon 图标",
                        },
                        {
                          value: "button",
                          label: "Button 按钮",
                        },
                      ],
                    },
                    {
                      value: "form",
                      label: "Form",
                      children: [
                        {
                          value: "radio",
                          label: "Radio 单选框",
                        },
                        {
                          value: "checkbox",
                          label: "Checkbox 多选框",
                        },
                        {
                          value: "input",
                          label: "Input 输入框",
                        },
                        {
                          value: "input-number",
                          label: "InputNumber 计数器",
                        },
                        {
                          value: "select",
                          label: "Select 选择器",
                        },
                        {
                          value: "cascader",
                          label: "Cascader 级联选择器",
                        },
                        {
                          value: "switch",
                          label: "Switch 开关",
                        },
                        {
                          value: "slider",
                          label: "Slider 滑块",
                        },
                        {
                          value: "time-picker",
                          label: "TimePicker 时间选择器",
                        },
                        {
                          value: "date-picker",
                          label: "DatePicker 日期选择器",
                        },
                        {
                          value: "datetime-picker",
                          label: "DateTimePicker 日期时间选择器",
                        },
                        {
                          value: "upload",
                          label: "Upload 上传",
                        },
                        {
                          value: "rate",
                          label: "Rate 评分",
                        },
                        {
                          value: "form",
                          label: "Form 表单",
                        },
                      ],
                    },
                    {
                      value: "data",
                      label: "Data",
                      children: [
                        {
                          value: "table",
                          label: "Table 表格",
                        },
                        {
                          value: "tag",
                          label: "Tag 标签",
                        },
                        {
                          value: "progress",
                          label: "Progress 进度条",
                        },
                        {
                          value: "tree",
                          label: "Tree 树形控件",
                        },
                        {
                          value: "pagination",
                          label: "Pagination 分页",
                        },
                        {
                          value: "badge",
                          label: "Badge 标记",
                        },
                      ],
                    },
                    {
                      value: "notice",
                      label: "Notice",
                      children: [
                        {
                          value: "alert",
                          label: "Alert 警告",
                        },
                        {
                          value: "loading",
                          label: "Loading 加载",
                        },
                        {
                          value: "message",
                          label: "Message 消息提示",
                        },
                        {
                          value: "message-box",
                          label: "MessageBox 弹框",
                        },
                        {
                          value: "notification",
                          label: "Notification 通知",
                        },
                      ],
                    },
                    {
                      value: "navigation",
                      label: "Navigation",
                      children: [
                        {
                          value: "menu",
                          label: "NavMenu 导航菜单",
                        },
                        {
                          value: "tabs",
                          label: "Tabs 标签页",
                        },
                        {
                          value: "breadcrumb",
                          label: "Breadcrumb 面包屑",
                        },
                        {
                          value: "dropdown",
                          label: "Dropdown 下拉菜单",
                        },
                        {
                          value: "steps",
                          label: "Steps 步骤条",
                        },
                      ],
                    },
                    {
                      value: "others",
                      label: "Others",
                      children: [
                        {
                          value: "dialog",
                          label: "Dialog 对话框",
                        },
                        {
                          value: "tooltip",
                          label: "Tooltip 文字提示",
                        },
                        {
                          value: "popover",
                          label: "Popover 弹出框",
                        },
                        {
                          value: "card",
                          label: "Card 卡片",
                        },
                        {
                          value: "carousel",
                          label: "Carousel 走马灯",
                        },
                        {
                          value: "collapse",
                          label: "Collapse 折叠面板",
                        },
                      ],
                    },
                  ],
                },
                {
                  value: "ziyuan",
                  label: "资源",
                  children: [
                    {
                      value: "axure",
                      label: "Axure Components",
                    },
                    {
                      value: "sketch",
                      label: "Sketch Templates",
                    },
                    {
                      value: "jiaohu",
                      label: "组件交互文档",
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      // 顶部筛选表单值
      filterFormData: {
        keyword: "",
        status: "",
        date: "",
        month: "",
        time: "",
        cascader: "",
      },
      buttons: [
        {
          name: "新增",
          type: "primary",
          icon: "el-icon-plus",
          fun: "newBusiness",
        },
        {
          name: "",
          type: "",
          icon: "el-icon-refresh",
          fun: "getData",
        },
      ],
      tableData: [
        {
          arguments: "filterObj",
          description: "控制表单类型、对应字段等(必填)",
          type: "object",
          options: "详情见FilterObj Attributes",
          default: "--",
        },
        {
          arguments: "filterData",
          description: "form表单绑定对象",
          type: "object",
          options: "--",
          default: "--",
        },
        {
          arguments: "buttons",
          description: "控制按钮类型、图标、点击事件",
          type: "object",
          options: "详情见Buttons Attributes",
          default: "--",
        },
        {
          arguments: "firstSelect",
          description: "第一个搜索项是否为下拉选项",
          type: "boolean",
          options: "true/false",
          default: "false",
        },
      ],
      filterObjAttribute: [
        {
          arguments: "name",
          description: "搜索框提示文字(必填)",
          type: "string",
          options: "--",
          default: "--",
        },
        {
          arguments: "filterPopover",
          description: "下拉选项",
          type: "object",
          options: "详情见FilterPopover Attributes",
          default: "--",
        },
      ],
      filterPopoverAttribute: [
        {
          arguments: "name",
          description: "标题（必填）",
          type: "string",
          options: "--",
          default: "--",
        },
        {
          arguments: "type",
          description: "类型（必填）",
          type: "string",
          options: "input/select/daterange/monthrange/timerange/cascader",
          default: "--",
        },
        {
          arguments: "field",
          description: "对应字段(必填)",
          type: "string",
          options: "--",
          default: "--",
        },
        {
          arguments: "dataType",
          description: "数据类型（必填）",
          type: "string",
          options: "string/array/object",
          default: "string",
        },
        {
          arguments: "multiple",
          description: "是否多选,只对 type='cascader' 有效",
          type: "boolean",
          options: "true/false",
          default: "false",
        },
        {
          arguments: "options",
          description: "下拉选项（当type = select时必填）",
          type: "array",
          options: "--",
          default: "--",
        },
      ],
      buttonAttribute: [
        {
          arguments: "name",
          description: "按钮文本",
          type: "string",
          options: "--",
          default: "--",
        },
        {
          arguments: "num",
          description: "数量",
          type: "string",
          options: "--",
          default: "--",
        },
        {
          arguments: "type",
          description: "类型",
          type: "string",
          options: "text/primary/' '",
          default: "--",
        },
        {
          arguments: "icon",
          description: "图标",
          type: "string",
          options: "--",
          default: "--",
        },
        {
          arguments: "iconUrl",
          description: "自定义图标路径",
          type: "string",
          options: "--",
          default: "--",
        },
        {
          arguments: "fun",
          description: "事件名",
          type: "string",
          options: "--",
          default: "--",
        },
      ],
      eventData: [
        {
          event: "getData",
          description: "当用户点击搜索按钮或刷新按钮时触发",
          arguments: "--",
        },
        {
          event: "buttonFun",
          description: "当用户点击自定义按钮时触发",
          arguments: "--",
        },
        {
          event: "resetPage",
          description: "当用户点击重置按钮时触发",
          arguments: "--",
        },
      ],
    };
  },
  methods: {
    buttonFun(fun) {
      this[fun]();
    },
    resetPage(page) {
      console.log("重置");
    },
    getData() {
      console.log(this.filterFormData);
      console.log("获取");
    },
    newBusiness() {
      console.log("新增");
    },
  },
};
</script>

<style lang="scss" scoped>
.api {
  margin: 35px 10px;
  ::v-deep {
    .el-table {
      margin: 20px 0 40px;
    }
  }
}
</style>