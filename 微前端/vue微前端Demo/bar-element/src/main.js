import './public-path';
import Vue from 'vue';
import App from './App.vue';
import routes from './router';
import store from './store';
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import '@/icons'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false;

let router = null;
let instance = null;

function render(props = {}) {
  const { container } = props;
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/element' : '/',
    mode: 'history',
    routes,
  });

  console.log('[element] 主应用传递 props', props)

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
  }).$mount(container ? container.querySelector('#elementText') : '#elementText');
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
  console.log('[element] vue app bootstraped');
}

export async function mount(props) {
  console.log('[element] props from main framework', props);
  storeTest(props);
  render(props);
}

export async function unmount() {
  instance.$destroy();
  instance = null;
  router = null;
}

export async function update(props) {
  console.log('update props', props);
}



