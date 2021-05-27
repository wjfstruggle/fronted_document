import { createStore } from 'vuex'

// vuex数据管理框架
export default createStore({
  state: {
    // name:'张三'
  },
  mutations: {
    // 第四步，对应mutation被执行
    change() {
      // 第五步，mutation执行，修改数据
      // this.state.name = '李四'
    }
  },
  actions: {
    // 第二步：store感知触发一个change的action，执行change
    change() {
      // 第三步，提交一个commit，触发mutations
      this.commit('change')
    }
  },
  modules: {
  }
})
