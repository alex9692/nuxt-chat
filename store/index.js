export const state = () => {
  return {};
};

export const mutations = {};

export const actions = {
  async nuxtServerInit(context) {
    await context.dispatch("auth/PERSIST_USER");
    if (context.rootGetters["auth/isAuth"]) {
      console.log('aa')
      await context.dispatch("room/FETCH_MYROOMS");
      await context.dispatch("room/FETCH_ALLROOMS");
    }
  }
};
