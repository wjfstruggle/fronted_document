const config = {
  VUE_MICRO_APP: process.env.VUE_APP_VUE_MICRO_APP,
  VUE_APP_CONTENT: process.env.VUE_APP_CONTENT
};
// 导出当前环境的配置，默认为 dev 环境
export default config;
