import Vuex from "vuex";
import cloneDeep from "lodash.clonedeep";
import mergeWith from "lodash.mergewith";
import { createLocalVue } from "@vue/test-utils";

import customizer from "../customizer";
import StoreConfig from "../../../app/store/config";

function createMockStore({ customConfig, localVue } = {}) {
  if (!localVue) {
    localVue = createLocalVue();
    localVue.use(Vuex);
  }

  const defaultConfig = cloneDeep(StoreConfig);
  const config = customConfig
    ? mergeWith(defaultConfig, customConfig, customizer)
    : defaultConfig;

  return new Vuex.Store(config);
}

export default createMockStore;
