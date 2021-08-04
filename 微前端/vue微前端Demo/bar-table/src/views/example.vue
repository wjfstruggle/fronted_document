<template>
  <div>
    <el-table
      :data="tableData"
      border
      height="450"
      :summary-method="getSummaries"
      show-summary
      style="width: 100%"
    >
      <el-table-column fixed type="selection" width="55"> </el-table-column>
      <el-table-column prop="date" label="日期" sortable width="150">
      </el-table-column>
      <el-table-column prop="val" label="数值" width="150"> </el-table-column>
      <el-table-column label="配送信息">
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column label="地址">
          <el-table-column prop="province" label="省份" width="120">
          </el-table-column>
          <el-table-column prop="city" label="市区" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址" width="300">
          </el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
        width="100"
        :filters="[
          { text: '家', value: '家' },
          { text: '公司', value: '公司' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '家' ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.tag }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-divider />
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>功能说明</span>
      </div>
      <div class="text item">
        1、支持多行表头； 2、支持单行选择/多行选择； 3、支持表头和表列的固定；
        4、支持字段排序； 5、支持字段筛选；6、支持统计行
      </div>
    </el-card>
  </div>
</template>

<script>
import Sortable from "sortablejs";
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          val: 100,
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          tag: "家",
        },
        {
          date: "2016-05-04",
          val: 100,
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          tag: "家",
        },
        {
          date: "2016-05-01",
          val: 100,
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          tag: "公司",
        },
        {
          date: "2016-05-03",
          val: 100,
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          tag: "公司",
        },
      ],
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "统计";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += " 份";
        } else {
          sums[index] = "——";
        }
      });

      return sums;
    },
    filterTag(){
      console.log('临时修改')
    }
  },
};
</script>

<style>
</style>