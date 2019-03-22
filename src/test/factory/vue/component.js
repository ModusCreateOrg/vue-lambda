import Router from "vue-router";
import Vuex from "vuex";
import { sync } from "vuex-router-sync";
import cloneDeep from "lodash.clonedeep";
import mergeWith from "lodash.mergewith";
import { createLocalVue, shallowMount } from "@vue/test-utils";

import customizer from "../customizer";
import MockRouterConfig from "../../../app/router/config.mock";
import StoreConfig from "../../../app/store/config";

export function createMockRouter({ customConfig, localVue } = {}) {
  if (!localVue) {
    localVue = createLocalVue();
    localVue.use(Router);
    localVue.use(Vuex);
  }

  const defaultConfig = cloneDeep(MockRouterConfig);
  const config = customConfig
    ? mergeWith(defaultConfig, customConfig, customizer)
    : defaultConfig;

  return new Router(config);
}

export function createMockStore({ customConfig, localVue } = {}) {
  if (!localVue) {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(Router);
  }

  const defaultConfig = cloneDeep(StoreConfig);
  const config = customConfig
    ? mergeWith(defaultConfig, customConfig, customizer)
    : defaultConfig;

  return new Vuex.Store(config);
}

export function createWrapper({ component, customOptions = {}, localVue }) {
  if (!component) {
    throw "component is required";
  } else if (!localVue) {
    localVue = createLocalVue();
    localVue.use(Router);
    localVue.use(Vuex);
  }

  const defaultOptions = {
    localVue,
    router: createMockRouter({
      customConfig: customOptions.routerConfig,
      localVue,
    }),
    store: createMockStore({
      customConfig: customOptions.storeConfig,
      localVue,
    }),
  };
  const options = mergeWith(defaultOptions, customOptions, customizer);

  if (options.store && options.router) {
    sync(options.store, options.router);
  }

  return shallowMount(component, options);
}
