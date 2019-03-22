const ResponseHelper = require("./response-helper");

const HEADER_STRICT_TRANSPORT_SECURITY_KEY = "strict-transport-security";
const HEADER_STRICT_TRANSPORT_SECURITY_VALUE =
  "max-age=31536000; includeSubDomains; preload";

const HEADER_VALUE_KEY = "value";

const isNotLowerCaseUri = ({ uri = "" } = { uri: "" }) =>
  uri !== uri.toLowerCase();

const isTrailingSlash = ({ uri = "" } = { uri: "" }) =>
  uri.length > 1 && uri.endsWith("/");

const isQueryString = ({ queryString = "" } = { queryString: "" }) =>
  queryString ? true : false;

const on301 = (
  { toUri = "", uri = "", callback = () => {} } = {
    toUri: "",
    uri: "",
    callback: () => {},
  },
) => {
  console.warn(`WARN: HTTP ${ResponseHelper.Constants.STATUS_VALUE_301}`, {
    uri,
    to: toUri,
  });
  callback(null, {
    headers: {
      location: [{ [HEADER_VALUE_KEY]: toUri }],
      [HEADER_STRICT_TRANSPORT_SECURITY_KEY]: [
        { [HEADER_VALUE_KEY]: HEADER_STRICT_TRANSPORT_SECURITY_VALUE },
      ],
    },
    status: ResponseHelper.Constants.STATUS_VALUE_301,
    statusDescription: ResponseHelper.httpCodeToStatusDescription({
      httpCode: ResponseHelper.Constants.STATUS_VALUE_301,
    }),
  });
};

const isInvalidRequest = (
  { request = { headers: {}, querystring: "", uri: "" } } = {
    request: { headers: {}, querystring: "", uri: "" },
  },
) => {
  const { querystring, uri } = request;

  return (
    isTrailingSlash({ uri }) ||
    isNotLowerCaseUri({ uri }) ||
    isQueryString({ querystring })
  );
};

const onInvalidRequest = (
  {
    request = { headers: {}, querystring: "", uri: "" },
    callback = () => {},
  } = {
    request: { headers: {}, querystring: "", uri: "" },
    callback: () => {},
  },
) => {
  const { querystring, uri } = request;

  if (isTrailingSlash({ uri })) {
    const toUri = uri.substring(0, uri.length - 1);
    on301({ toUri, uri, callback });
  } else if (isNotLowerCaseUri({ uri })) {
    const toUri = uri.toLowerCase();
    on301({ toUri, uri, callback });
  } else if (isQueryString({ querystring })) {
    const toUri = uri;
    on301({ toUri, uri, callback });
  } else {
    console.error("ERROR: Unhandled invalid request");
    callback("Unhandled invalid request.");
  }
};

module.exports = {
  isInvalidRequest,
  onInvalidRequest,
};
