export const state = () => {
  return {
    roomUsers: [],
    allUsers: []
  };
};

export const mutations = {
  SET_ROOMUSERS: (state, payload) => {
    state.roomUsers = payload;
  },
  SET_ALLUSERS: (state, payload) => {
    state.allUsers = payload;
  }
};

export const actions = {
  async FETCH_ROOMUSERS({ commit, rootState }) {
    try {
      const response = await this.$axios.get(
        `/api/v1/room/${rootState.room.activeRoom._id}/user`
      );
      commit("SET_ROOMUSERS", response.data.data.users);
    } catch (error) {
      console.log(error.response);
    }
  },
  async FETCH_ALLUSERS({ commit }) {
    try {
      const response = await this.$axios.get(`/api/v1/user/allUsers`);
      commit("SET_ALLUSERS", response.data.data.users);
    } catch (error) {
      console.log(error.response);
    }
  }
};

export const getters = {};
