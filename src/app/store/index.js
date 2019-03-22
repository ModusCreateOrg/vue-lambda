import Vue from "vue";
import Vuex from "vuex";
import StoreConfig from "./config";

Vue.use(Vuex);

const createStore = () => {
  return new Vuex.Store(StoreConfig);
};

export default createStore;
