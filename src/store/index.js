import { createStore } from "vuex";
import auth from "./modules/auth";
import courses from "./modules/courses";
export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { auth, courses },
});
