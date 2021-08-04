/**
 * @description 通用配置|主题配置导出
 */
 const setting = require('./setting.config')
 const theme = require('./theme.config')
 module.exports = Object.assign({}, setting, theme)