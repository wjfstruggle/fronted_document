<template>
  <div>
    <el-popover placement="bottom" width="150" trigger="manual" v-model="visible">
      <el-checkbox-group v-model="checkList">
        <el-checkbox
          :label="item.label"
          v-for="(item, index) in checkLabels"
          :key="index"
          style="display: block"
        ></el-checkbox>
      </el-checkbox-group>
      <el-button @click="handlerFilterFunc('filter')">筛选</el-button>
      <el-button @click="handlerFilterFunc('cancel')">取消</el-button>
      <el-button slot="reference" @click="visible = !visible">筛选展示列</el-button>
    </el-popover>

    <el-table :data="tableData" border>
      <el-table-column
        type="index"
        label="序号"
        align="center"
      ></el-table-column>
      <el-table-column
        v-for="(col, index) in colums"
        :key="index"
        align="center"
        :prop="col.prop"
        :label="col.label"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          salary: 10000,
        },
        {
          date: "2016-05-04",
          name: "张小龙",
          address: "上海市普陀区金沙江路 1517 弄",
          salary: 12000,
        },
        {
          date: "2016-05-01",
          name: "赵小牛",
          address: "上海市普陀区金沙江路 1519 弄",
          salary: 9000,
        },
        {
          date: "2016-05-03",
          name: "李小狗",
          address: "上海市普陀区金沙江路 1516 弄",
          salary: 20000,
        },
        {
          date: "2016-05-06",
          name: "孙小猪",
          address: "上海市普陀区金沙江路 1519 弄",
          salary: 5500,
        },
      ],
      colums: [
        {
          prop: "date",
          label: "日期",
        },
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "address",
          label: "地址",
        },
        {
          prop: "salary",
          label: "工资",
        },
      ],
      checkList: [],
      checkLabels: [],
      visible:false
    };
  },
  computed: {
    canDo() {
      return this.checkList.length > 0;
    },
  },
  mounted() {
    this.checkLabels = JSON.parse(JSON.stringify(this.colums));
  },
  methods: {
    handlerFilterFunc(type) {
      if (type === "filter") {
        let newArr = [];
        if(this.checkList.length > 0){
this.checkList.filter((item) => {
          this.colums.filter((colItem) => {
            if (colItem.label == item) {
              newArr.push(colItem);
            }
          });
        });
        this.colums = newArr;
        }
        
      } else if (type === "cancel") {
        this.checkList = [];
        this.colums = this.checkLabels;
      }
      this.visible = false;
    },
  },
};
</script>

<style>
</style>