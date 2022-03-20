import axios from "axios";
export default {
  namespaced: true,

  state: {
    token: localStorage.getItem("token") || null,
    login: localStorage.getItem("login") || null,
    user: {},
  },
  getters: {
    isLoggedIn: ({ token, user }) => !!token || user == null || user == {},
  },
  actions: {
    async login({ commit, state }, data) {
      const baseURL = "http://localhost:3000";
      var response = await axios.post(baseURL + "/auth/login", data);

      if (response.status == 200) {
        state.user = response.data.user;
        commit("saveSession", response);
        return true;
      } else {
        throw new Error(response.status + " " + response.data);
      }
    },
    async register({ commit, state }, data) {
      const baseURL = "http://localhost:3000";
      if (data.password != data.repassword) {
        throw new Error("Пароли не совпадают");
      }
      var response = await axios.post(baseURL + "/auth/register", data);
      if (response.status == 200) {
        state.user = response.data.user;
        commit("saveSession", response);
        return true;
      } else {
        throw new Error(response.status + " " + response.data);
      }
    },
    async refresh(context) {
      const baseURL = "http://localhost:3000";
      const response = await axios.post(baseURL + "/me/user", {
        login: context.state.login,
        token: context.state.token,
      });
      console.log(response);
      if (response.status == 200) context.state.user = response.data;
      else {
        context.dispatch("exit");
      }
      console.log(context.state.user);
    },
    async save(context) {
      const baseURL = "http://localhost:3000";
      const response = await axios.put(baseURL + "/me/user", {
        login: context.state.login,
        token: context.state.token,
        user: context.state.user,
      });
      if (response.status == 200) context.state.user = response.data;
      console.log(context.state.user);
    },
    exit(context) {
      context.commit("clear");
    },
  },
  mutations: {
    clear(state) {
      state.login = null;
      state.token = null;
      state.user = {};
      localStorage.clear();
    },
    saveSession(state, response) {
      state.token = response.data.token;
      state.login = response.data.user.login;
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("login", response.data.user.login);
    },
  },
};
