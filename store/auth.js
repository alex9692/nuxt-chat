export const state = () => {
  return {
    token: null,
    user: null,
    onlineUsers: []
  };
};

export const mutations = {
  SET_USERINFO: (state, { token, user }) => {
    state.token = token;
    state.user = user;
  }
};

export const actions = {
  async PERSIST_USER({ commit }) {
    try {
      const response = await this.$axios.get("/api/v1/user/getMe");
      const token = response.data.data.token;
      const user = response.data.data.user;
      this.$socket.emit("connection-established", user);
      commit("SET_USERINFO", { token, user });
    } catch (error) {}
  },
  async LOGIN({ commit, dispatch }, payload) {
    try {
      const response = await this.$axios.post("/api/v1/auth/login", payload);
      const token = response.data.data.token;
      const user = response.data.data.user;
      commit("SET_USERINFO", { token, user });
      this.$socket.emit("connection-established", user);
      setTimeout(() => {
        dispatch("LOGOUT");
      }, 3599990);
      this.$router.push({ path: "/" });
    } catch (error) {
      console.log(error.response);
    }
  },
  async REGISTER(_, payload) {
    try {
      const response = await this.$axios.post("/api/v1/auth/register", payload);
      console.log(response);
      this.$router.push({ path: "/login" });
    } catch (error) {
      console.log(error.response);
    }
  },
  async LOGOUT({ commit, state, dispatch }) {
    await this.$axios.post("/api/v1/auth/logout");
    this.$socket.emit("log-out", state.user);
    commit("SET_USERINFO", { token: null, user: null });
    dispatch("message/EMPTY_MESSAGES", null, { root: true });
    dispatch("room/EMPTY_ROOMS", null, { root: true });
    this.$router.push({ path: "/login" });
  }
};

export const getters = {
  isAuth: state => {
    return !!state.token;
  }
};
