/**
 * @description 所有全局配置的状态管理
 */

import defaultSettings from '@/config'

const { tabsBar, layout, header } = defaultSettings
const theme =
  JSON.parse(localStorage.getItem('bar-theme')) || ''

const settings = {
  state: {
    tabsBar: theme.tabsBar || tabsBar,
    collapse: false,  // 是否水平折叠
    layout: theme.layout || layout,
    header: theme.header || header,
  },
  getters: {
    collapse: (state) => state.collapse,
    header: (state) => state.header,
    layout: (state) => state.layout,
    tabsBar: (state) => state.tabsBar,
  },
  mutations: {
    changeLayout: (state, layout) => {
      if (layout) state.layout = layout
    },
    changeHeader: (state, header) => {
      if (header) state.header = header
    },
    changeTabsBar: (state, tabsBar) => {
      if (tabsBar) state.tabsBar = tabsBar
    },
    changeCollapse: (state) => {
      state.collapse = !state.collapse
    },
    foldSideBar: (state) => {
      state.collapse = true
    },
    openSideBar: (state) => {
      state.collapse = false
    },
  },
  actions: {
    changeLayout({ commit }, layout) {
      commit('changeLayout', layout)
    },
    changeHeader({ commit }, header) {
      commit('changeHeader', header)
    },
    changeTabsBar({ commit }, tabsBar) {
      commit('changeTabsBar', tabsBar)
    },
    changeCollapse({ commit }) {
      commit('changeCollapse')
    },
    foldSideBar({ commit }) {
      commit('foldSideBar')
    },
    openSideBar({ commit }) {
      commit('openSideBar')
    },
  }
}


export default settings
