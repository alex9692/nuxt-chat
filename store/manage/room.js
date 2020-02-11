export const state = () => {
  return {
    updatedValues: {},
    allowSave: false,
    newRoom: "",
    roomId: ""
  };
};

export const mutations = {
  SET_UPDATEDVALUES: (state, payload) => {
    state.updatedValues = payload;
  },
  SET_NEWROOM: (state, payload) => {
    state.newRoom = payload;
  },
  SET_ALLOWSAVE: (state, payload) => {
    state.allowSave = payload;
  },
  SET_ROOMID: (state, payload) => {
    state.roomId = payload;
  },
  RESET_VALUES: state => {
    state.allowSave = false;
    state.updatedValues = {};
    (state.newRoom = ""), (state.roomId = "");
  }
};

export const actions = {
  SET_UPDATEDVALUES({ commit, state }, payload) {
    const updatedVal = { ...state.updatedValues, ...payload };
    for (let key in updatedVal) {
      if (!updatedVal[key]) {
        Reflect.deleteProperty(updatedVal, key);
      }
    }
    commit("SET_UPDATEDVALUES", updatedVal);
  },
  async SAVE_ROOMCHANGES({ commit, state, dispatch }) {
    try {
      if (Object.keys(state.updatedValues).length > 0) {
        const resp1 = await this.$axios.patch(
          `/api/v1/room/${state.roomId}/updateMyRoom`,
          {
            ...state.updatedValues
          }
        );
        console.log(resp1);
      }
      if (state.newRoom) {
        const resp2 = await this.$axios.post("/api/v1/room", {
          roomName: state.newRoom
        });
        console.log(resp2);
      }
      commit("RESET_VALUES");
      this.$router.push("/");
    } catch (error) {
      console.log(error.response);
    }
  }
};
