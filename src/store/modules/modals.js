const state = () => ({
  requestCall: {
    visible: false,
    city: "",
  },
  response: {
    visible: false,
  },
});

const getters = {
  getRequestCall: (state) => state.requestCall,
  getResponse: (state) => state.response,
};

const actions = {
  setVisibleRequestCall({ commit }, payload) {
    commit("setVisibleRequestCall", payload);
  },
  setCityRequestCall({ commit }, payload) {
    commit("setCityRequestCall", payload);
  },
  setVisibleResponse({ commit }, payload) {
    commit("setVisibleResponse", payload);
  },
};

const mutations = {
  setVisibleRequestCall(state, payload) {
    state.requestCall.visible = payload;
  },
  setCityRequestCall(state, payload) {
    state.requestCall.city = payload;
  },
  setVisibleResponse(state, payload) {
    state.response.visible = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
