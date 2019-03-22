const compressionHelper = require("../shared/helpers/compression-helper");
const requestHelper = require("../shared/helpers/request-helper");

const ERROR_URI_PREFIX = "/error/";
const INVALID_URI = "/404";

exports.handler = (event, context, callback) => {
  const { request } = event.Records[0].cf;
  const { headers, uri } = request;

  if (requestHelper.isInvalidRequest({ request })) {
    return requestHelper.onInvalidRequest({ request, callback });
  }

  // Prevent direct requests to error pages
  if (uri.startsWith(ERROR_URI_PREFIX)) {
    // Replace with a URI that will result in an HTTP 404 error
    request.uri = INVALID_URI;
  }

  // Create a custom, cacheable header to store the best acceptable compression method
  request.headers = {
    ...headers,
    ...compressionHelper.getXAcceptEncodingHeader({ headers, uri }),
  };

  return callback(null, request);
};
