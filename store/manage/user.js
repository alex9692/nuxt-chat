export const state = () => {
  return {
    updatedValues: {},
    allowSave: false
  };
};

export const mutations = {
  SET_UPDATEDVALUES: (state, payload) => {
    state.updatedValues = payload;
  },
  SET_ALLOWSAVE: (state, payload) => {
    console.log(payload);
    state.allowSave = payload;
  },
  RESET_VALUES: state => {
    state.allowSave = false;
    state.updatedValues = {};
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
  async SAVE_USERCHANGES({ commit, state, dispatch }) {
    await this.$axios.patch("/api/v1/user/updateMe", {
      ...state.updatedValues
    });
    commit("RESET_VALUES");
    dispatch("auth/LOGOUT", null, { root: true });
  }
};
