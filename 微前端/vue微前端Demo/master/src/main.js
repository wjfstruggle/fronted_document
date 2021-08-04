import Vue from "vue"
import { vueRender } from "./core/render"
import '@/icons';
import "./permission";
import "../mock";
import Overall from '@/utils/overall'
import ElementUI from 'element-ui'
import serviceManger from "@/service";
import 'element-ui/lib/theme-chalk/display.css'
import '@/styles/element-variables.scss'

Vue.use(Overall)

Vue.use(ElementUI, {
  size: 'small',
})

Vue.prototype.$serviceManger = serviceManger;


/**
 * 启动微前端
 */
import startQiankun from './core/registerBar'

startQiankun([
  {
    name: 'element', // 应用的名字
    devEntry: '//localhost:20000', // 默认会加载这个html 解析里面的js 动态的执行 （子应用必须支持跨域）fetch
    routerBase: '/element/', // 激活的路径
  },
  {
    name: 'table',
    devEntry: '//localhost:20001',
    routerBase: '/table/',
  },
  {
    name: 'toolslibrary',
    devEntry: '//localhost:20002',
    routerBase: '/toolslibrary/',
  },
])

vueRender({}, true)
