const { createBundleRenderer } = require("vue-server-renderer");

const {
  VUE_TEMPLATE,
  isOriginResponse,
  isOriginResponseWithStatus,
  renderHtml,
} = require("./index.base");
const ResponseHelper = require("../../shared/helpers/response-helper");
// Import the Vue SSR client manifest and server bundle that were generated in
// the Vue client (in webpack.vue.client.config.js) and server
// (in webpack.vue.server.config.js) webpack
const serverBundle = require("../../../dist/tmp/app/vue-ssr-server-bundle.json");
const clientManifest = require("../../../dist/tmp/app/vue-ssr-client-manifest.json");

const bundleRenderer = createBundleRenderer(serverBundle, {
  clientManifest,
  shouldPrefetch: () => false,
  shouldPreload: (file, type) => type === "script",
  template: VUE_TEMPLATE,
});

/*
 * AWS lambda function for the Vue SSR app.
 */
exports.handler = (event, context, callback) => {
  const { request, response } = event.Records[0].cf;

  if (isOriginResponseWithStatus(response, "200")) {
    return callback(null, response);
  } else if (isOriginResponseWithStatus(response, "403")) {
    // Convert S3 403 error to 404
    response.status = ResponseHelper.Constants.STATUS_VALUE_404;
    response.statusDescription = ResponseHelper.httpCodeToStatusDescription({
      httpCode: ResponseHelper.Constants.STATUS_VALUE_404,
    });
  } else if (isOriginResponse(response)) {
    console.error("ERROR: unhandled origin response", request, response);
    response.status = ResponseHelper.Constants.STATUS_VALUE_500;
    response.statusDescription = ResponseHelper.httpCodeToStatusDescription({
      httpCode: ResponseHelper.Constants.STATUS_VALUE_500,
    });
  }

  renderHtml(bundleRenderer, request, response, callback);
};
