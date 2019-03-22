import Vue from "vue";
import Meta from "vue-meta";
import { sync } from "vuex-router-sync";

import Layout from "./components/layout/Layout.vue";
import createStore from "./store";
import createRouter from "./router";

/*
 * Export a function that creates the Vue app for SSR.
 * Used in './entry.client.js' and './entry.server.js'.
 */
const createApp = () => {
  const store = createStore();
  const router = createRouter();

  sync(store, router);

  Vue.use(Meta);

  const app = new Vue({
    render: (h) => h(Layout),
    router,
    store,
  });

  return { app, router, store };
};

export default createApp;
