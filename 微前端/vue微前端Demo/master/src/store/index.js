import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import user from "./modules/user";
import routes from "./modules/routes";
import settings from "./modules/settings";
import tabsBar from "./modules/tabsBar";


export default new Vuex.Store({
  modules: {
    user,
    routes,
    settings,
    tabsBar
  }
});


