import createApp from "./app";

/*
 * Export a function that creates the Vue app on the server side and loads the
 * appropriate route. This function is called by the bundle renderer in the
 * renderToString method (in ./server/index.base.js) and is automatically passed the
 * bundle renderer's context.
 */
export default (bundleRendererContext) =>
  new Promise((resolve, reject) => {
    const { app, router, store } = createApp();
    const { uri } = bundleRendererContext;
    const { fullPath: properlyStructuredUri, matched } = router.resolve(
      uri,
    ).route;
    let httpCode = 200;

    if (uri !== properlyStructuredUri) {
      httpCode = 301;
      return reject({
        httpCode,
        toUri: properlyStructuredUri,
      });
    } else if (!matched.length) {
      httpCode = 404;
      return reject({
        httpCode,
      });
    }

    router.push(uri);

    return router.onReady(() => {
      // Expose the state on the bundle renderer's context so that it will be
      // automatically inlined into the page markup
      Object.assign(bundleRendererContext, {
        httpCode,
        state: store.state,
        vueMeta: app.$meta(),
      });

      resolve(app);
    });
  });
