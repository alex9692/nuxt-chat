export const state = () => {
  return {
    messages: []
  };
};

export const mutations = {
  SET_MESSAGES: (state, payload) => {
    state.messages = payload;
  },
  ADD_MESSAGE: (state, payload) => {
    state.messages.push(payload);
  }
};

export const actions = {
  async FETCH_ROOMMESSAGES({ commit, rootState }) {
    try {
      const response = await this.$axios.get(
        `/api/v1/room/${rootState.room.activeRoom._id}/message`
      );
      commit("SET_MESSAGES", response.data.data.messages);
    } catch (error) {
      console.log(error.response);
    }
  },
  async CREATE_MESSAGE({ commit, rootState }, payload) {
    try {
      const response = await this.$axios.post(
        `/api/v1/room/${rootState.room.activeRoom._id}/message`,
        payload
      );
      this.$socket.emit("get-message", response.data.data.message);
    } catch (error) {
      console.log(error.response);
    }
  },
  ADD_MESSAGE({ commit }, payload) {
    commit("ADD_MESSAGE", payload);
  },
  EMPTY_MESSAGES({ commit }) {
    commit("SET_MESSAGES", []);
  }
};

export const getters = {};
