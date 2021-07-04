let Vue;

class Store {
  constructor(options = {}) {
    // 保存⽤户配置的mutations选项
    this._mutations = options.mutations || {};
    // 保存⽤户配置的actions选项
    this._actions = options.actions || {};
    // 保存⽤户配置的getters选项
    this._wrappedGetters = options.getters || {};
    // 定义computed选项
    const computed = {};
    this.getters = {};
    const store = this;
    Object.keys(this._wrappedGetters).forEach(key => {
      // 获取用户定义的getter
      const fn = store._wrappedGetters[key];
      // 转换为computed可以使用无参数形式
      computed[key] = function () {
        return fn(store.state)
      }
      // 为getter定义只读属性
      Object.defineProperty(store.getters, key, {
        get: () => store._vm[key]
      })
    })
    // 1.对state做响应式处理
    // Vue.util.defineReactive(this, 'state', {})
    // this._vm.foo = 'fooooooo'
    this._vm = new Vue({
      data() {
        return {
          // 不做代理
          $$state: options.state,
        }
      },
      computed
    })

    // 绑定this
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }
  get state() {
    return this._vm._data.$$state
  }
  set state(val) {
    console.error('please use replaceState to reset state');
  }

  // commit('add', 2)
  commit(type, payload) {
    // 根据type从用户配置的mutations中获取那个函数
    const entry = this._mutations[type]
    if (!entry) {
      console.error('unknown mutation！');
      return
    }
    entry(this.state, payload)
  }
  dispatch(type, payload) {
    const enter = this._actions[type]
    if (!enter) {
      console.error('unknown action！');
      return
    }
    enter(this, payload)
  }
}

function install(_Vue) {
  Vue = _Vue

  // 注册$store
  Vue.mixin({
    beforeCreate() {
      // 此处this指的是组件实例
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    },
  });
}

// 导出对象是Vuex
export default {
  Store,
  install
}