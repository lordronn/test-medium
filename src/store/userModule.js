import axios from "axios";

export const userModule = {
  state: () => ({
    // role: "reader",
    role: "writer",
    users: [],
  }),
  getters: {},
  mutations: {
    logout(state) {
      state.role = "";
    },
    addUsers(state, users) {
      state.users = users;
    },
    checkUser(state, userInfo) {
      const newUser = state.users.find((user) => {
        if (user.login === userInfo.userEmail) {
          return user;
        } else return false;
      });
      if (newUser.password === userInfo.userPassword) {
        state.role = newUser.role;
        state.userActive = true;
        return true;
      } else false;
    },
  },
  actions: {
    async getUsers({ commit }) {
      try {
        const response = await axios.get("http://localhost:3000/users");
        commit("addUsers", response.data);
      } catch (e) {
        console.log(e);
      }
    },
  },
  namespaced: true,
};
