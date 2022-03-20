import axios from "axios";
import { baseURL } from "../../api/api";
export default {
  namespaced: true,
  state: {
    token: localStorage.getItem("token"),
    user: (() => {
      let json = {};
      try {
        json = JSON.parse(localStorage.getItem("user"));
      } catch (_) {
        ("");
      }
      return json;
    })(),
  },
  getters: {
    isLoggedIn: ({ token }) => !!token,
  },
  actions: {
    async login({ commit }, data) {
      var response = await axios.post(baseURL + "/auth/login", data);
      if (response.status == 200) {
        commit("saveSession", response.data);
      } else {
        throw Error(response.status + " " + response.data);
      }
      return response;
    },
    async register({ commit }, data) {
      var response = await axios.post(baseURL + "/auth/register", data);
      if (response.status == 200) {
        commit("saveSession", response.data);
      } else {
        throw Error(response.status + " " + response.data);
      }
      return response;
    },
    async refresh(context) {
      if (!context.getters.isLoggedIn) return;
      const response = await axios.get(baseURL + "/rest/user", {
        params: {
          login: context.state.user.login,
          token: context.state.token,
        },
      });

      if (response.status == 200) context.commit("saveSession", response.data);
      else {
        context.dispatch("logout");
        throw Error(response.status + " " + response.data);
      }
      return response;
    },
    async save(context) {
      const response = await axios.put(
        baseURL + "/rest/user",
        context.state.user
      );
      return response;
    },
    logout(context) {
      context.commit("clear");
    },
  },
  mutations: {
    saveSession(state, data) {
      if (data.token) {
        state.token = data.token;
        localStorage.setItem("token", state.token);
        axios.defaults.headers.common["Authorization"] = data.token;
      }

      state.user = data.user;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    clear(state) {
      state.token = null;
      localStorage.removeItem("token");

      state.user = null;
      localStorage.removeItem("user");

      delete axios.defaults.headers.common["Authorization"];
    },
  },
};
