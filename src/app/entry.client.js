import "es6-promise/auto";

import createApp from "./app";

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
  // Prime the store with the server initialized state that was automatically inlined into the page markup
  store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
  app.$mount("#vue-lambda");
});

if ("https:" === location.protocol && "serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}
