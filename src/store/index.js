import { createStore } from "vuex";
import modals from "./modules/modals";

export default createStore({
  modules: {
    modals,
  },
});
