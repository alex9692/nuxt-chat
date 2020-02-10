export const state = () => {
  return {
    myRooms: [],
    allRooms: [],
    activeRoom: null
  };
};

export const mutations = {
  SET_MYROOMS: (state, payload) => {
    state.myRooms = payload;
  },
  SET_ALLROOMS: (state, payload) => {
    state.allRooms = payload;
  },
  SET_ACTIVEROOM: (state, payload) => {
    state.activeRoom = payload;
  }
};

export const actions = {
  async FETCH_MYROOMS({ commit }) {
    try {
      const response = await this.$axios.get("/api/v1/room/myRooms");
      commit("SET_MYROOMS", response.data.data.rooms);
    } catch (error) {
      console.log(error.response);
    }
  },
  async FETCH_ALLROOMS({ commit }) {
    try {
      const response = await this.$axios.get("/api/v1/room");
      commit("SET_ALLROOMS", response.data.data.rooms);
    } catch (error) {
      console.log(error.response);
    }
  },
  SET_ACTIVEROOM({ commit, state }, payload) {
    const room = state.allRooms.find(el => el._id === payload);
    if (process.client) {
      sessionStorage.setItem("activeRoom", JSON.stringify(room));
    }
    commit("SET_ACTIVEROOM", { ...room });
  },
  GET_ACTIVEROOM({ dispatch }) {
    if (process.client) {
      const room = JSON.parse(sessionStorage.getItem("activeRoom"));
      if (room) {
        dispatch("SET_ACTIVEROOM", room._id);
      } else {
        dispatch("SET_ACTIVEROOM", null);
      }
    }
  },
  async ADD_USER({ commit, state }) {
    try {
      const response = await this.$axios.patch("/api/v1/room/addUsers", {
        slug: state.activeRoom.slug
      });
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  },
  EMPTY_ROOMS({ commit }) {
    commit("SET_MYROOMS", []);
    commit("SET_ALLROOMS", []);
    commit("SET_ACTIVEROOM", null);
  }
};

export const getters = {
  otherRooms(state) {
    return state.allRooms.filter(el => {
      return !state.myRooms.find(cur => cur._id === el._id);
    });
  },
  getMyRooms(state) {
    return JSON.parse(JSON.stringify(state.myRooms));
  }
};
