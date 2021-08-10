import axios from "axios";

export const userModule = {
  namespaced: true,
  state: () => ({
    role: "",
    users: [],
    check: true,
  }),
  getters: {
    checkRoleWriter(state) {
      return state.role === "writer";
    },
    checkRoleReader(state) {
      return state.role === "reader";
    },
  },
  mutations: {
    logout(state) {
      state.role = "";
    },
    addUsers(state, users) {
      state.users = users;
    },
    logIn(state, role) {
      state.role = role;
      state.check = true;
    },
    unCheckUser(state) {
      state.check = false;
    },
  },
  actions: {
    async getUsers({ commit }) {
      try {
        const response = await axios.get("http://localhost:3000/users");
        commit("addUsers", response.data);
      } catch (error) {
        console.error(error);
      }
    },
    searchUser({ commit, state }, userInfo) {
      const user = state.users.find(
        (user) =>
          user.login === userInfo.userEmail &&
          String(user.password) === userInfo.userPassword
      );
      if (user === undefined) return commit("unCheckUser");
      commit("logIn", user.role);
    },
  },
};
