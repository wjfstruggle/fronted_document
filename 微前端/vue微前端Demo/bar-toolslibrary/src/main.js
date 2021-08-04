import './public-path';
import Vue from 'vue';
import App from './App.vue';
import routes from './router';
import store from './store';
import VueRouter from 'vue-router'
import Overall from '@/utils/overall'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/icons'

Vue.use(VueRouter)
Vue.use(Overall)
Vue.use(ElementUI);

Vue.config.productionTip = false;

let router = null;
let instance = null;

function render(props = {}) {
  const { container } = props;
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/toolslibrary' : '/',
    mode: 'history',
    routes,
  });
  console.log('[toolslibrary] 主应用传递 props', props)
  instance = new Vue({
    router,
    store,
    render: h => h(App),
    data() {
      return {
        parentRouter: props.data ? props.data.router : {},
        parentVuex: props.data ? props.data.store : {},
      }
    },
  }).$mount(container ? container.querySelector('#toolsText') : '#toolsText');
}

//全局变量来判断环境，独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

function storeTest(props) {
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
      true,
    );
  props.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name,
      },
    });
}

export async function bootstrap() {
  console.log('[toolslibrary] vue app bootstraped');
}

export async function mount(props) {
  console.log('[toolslibrary] props from main framework', props);
  storeTest(props);
  render(props);
}

export async function unmount() {
  instance.$destroy();
  instance = null;
  router = null;
}

