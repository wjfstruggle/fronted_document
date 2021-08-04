<template>
  <div class="timechangement">
    <div class="with-seperator">
      <el-divider content-position="left">时间格式化</el-divider>
      <span class="simple"> 示例</span>
      <span class="simple"> {{ simpleTime }}</span>
      <el-input
        class="s-input"
        v-model="dateSymble"
        placeholder="请输入日期分隔符"
      ></el-input>
      <el-input
        class="s-input"
        v-model="timeSymble"
        placeholder="请输入时间分隔符"
      ></el-input>
      <el-button class="btn" plain @click="changeTimeFormat">转换</el-button>
      <span>{{ timeformatResult }}</span>
    </div>
    <div class="with-seperator">
      <el-divider content-position="left">时间戳转成日期格式</el-divider>
      <span class="simple"> 示例</span>
      <el-input
        class="m-input"
        v-model="timestamp"
        placeholder="请输入10位或13位数的时间戳"
      ></el-input>
      <el-input
        class="s-input"
        v-model="dateSymble"
        placeholder="请输入日期分隔符"
      ></el-input>
      <el-input
        class="s-input"
        v-model="timeSymble"
        placeholder="请输入时间分隔符"
      ></el-input>
      <el-button class="btn" plain @click="changeTimestamp">转换</el-button>
      <span>{{ timestampResult }}</span>
    </div>
    <div class="with-seperator">
      <el-divider content-position="left">时分秒转成时间戳</el-divider>
      <span class="simple"> 示例</span>
      <el-time-picker
        class="m-input"
        v-model="stampTime"
        value-format="HH:mm:ss"
        placeholder="请选择时间"
      >
      </el-time-picker>
      <el-button class="btn" plain @click="changeTime">转换</el-button>
      <span>{{ timeResult }}</span>
    </div>
    <div class="with-seperator">
      <el-divider content-position="left">时间跨度</el-divider>
      <span class="simple"> 示例</span>
      <el-date-picker
        class="m-input"
        v-model="timespacing"
        type="datetime"
        default-time="12:00:00"
        :picker-options="pickerOptions"
        placeholder="选择日期时间"
      >
      </el-date-picker>
      <el-button class="btn" plain @click="changeTimespacing">转换</el-button>
      <span>{{ timespacingResult }}</span>
    </div>
  </div>
</template>

<script>
import { parseTime, formatTime, countDown } from "@/utils/modules/datetime";

export default {
  name: "DateTime",
  data() {
    return {
      simpleTime: "",
      dateSymble: "/",
      timeSymble: ":",
      timeformatResult: "",
      timestamp: "",
      timestampResult: "",
      stampTime: "",
      timeResult: "",
      timespacing: "",
      timespacingResult: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  created() {
    this.simpleTime = new Date();
  },
  methods: {
    // 日期格式化
    changeTimeFormat() {
      let format =
        "{y}" +
        this.dateSymble +
        "{m}" +
        this.dateSymble +
        "{d} {h}" +
        this.timeSymble +
        "{i}" +
        this.timeSymble +
        "{s}";
      this.timeformatResult = parseTime(this.simpleTime, format);
    },
    // 日期格式化
    changeTimestamp() {
      let format =
        "{y}" +
        this.dateSymble +
        "{m}" +
        this.dateSymble +
        "{d} {h}" +
        this.timeSymble +
        "{i}" +
        this.timeSymble +
        "{s}";
      if (
        this.timestamp.trim().length === 10 ||
        this.timestamp.trim().length === 13
      ) {
        this.timestampResult = parseTime(this.timestamp, format);
        return;
      }
      this.$baseMessage("请正确输入10位或13位时间戳", "error");
    },
    // 时分秒转时间戳
    changeTime() {
      if (this.stampTime.trim().length === 0) {
        this.$baseMessage("请选择时间", "error");
        return;
      }
      this.timeResult = countDown(this.stampTime);
    },
    // 时间跨度
    changeTimespacing() {
      if (this.timespacing === "") {
        this.$baseMessage("请选择时间", "error");
        return;
      }
      let time = this.timespacing.getTime();
      this.timespacingResult = formatTime(time);
      return;
    },
  },
};
</script>

<style lang="scss" scoped>
.timechangement {
  .simple {
    font-size: 14px;
  }
  .s-input {
    margin: 20px 10px;
    width: 50px;
  }
  .m-input {
    margin: 20px 20px;
    width: 250px;
  }
  .btn {
    margin-right: 20px;
  }
}
</style>

<style lang="scss">
@import "@/styles/theme.scss";

.el-date-table td.current:not(.disabled) span {
  @include background_color();
  @include text_color();
}
.el-button--text {
  @include hover_color();
}
.el-backtop {
  @include hover_color();
}
</style>

