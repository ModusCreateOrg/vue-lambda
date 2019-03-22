const COMPRESSION_BROTLI_ENCODING = "br";
const COMPRESSION_BROTLI_EXTENSION = ".br";
const COMPRESSION_GZIP_ENCODING = "gzip";
const COMPRESSION_GZIP_EXTENSION = ".gz";
const COMPRESSION_NONE_ENCODING = "none";
const COMPRESSION_NONE_EXTENSION = "";
const HEADER_ACCEPT_ENCODING = "accept-encoding";
const HEADER_CONTENT_ENCODING = "content-encoding";
const HEADER_X_ACCEPT_ENCODING = "x-accept-encoding";
const PRECOMPRESSED_EXTENSIONS = ["png"];

const ENCODING_BASE64 = "base64";
const HEADER_VALUE_KEY = "value";

function compressWithGzip({ string = "" } = { string: "" }) {
  const zlib = require("zlib");
  return zlib.gzipSync(string, { level: zlib.Z_BEST_COMPRESSION });
}

// DEV: iltorb is externalized to improve portability
function compressWithBrotli(
  { iltorb = { compressSync: () => "" }, string = "" } = {
    iltorb: { compressSync: () => "" },
    string: "",
  },
) {
  return iltorb.compressSync(Buffer.from(string, "utf8"));
}

function getAcceptableEncoding({ headers = {} } = { headers: {} }) {
  return headers &&
    HEADER_X_ACCEPT_ENCODING in headers &&
    headers[HEADER_X_ACCEPT_ENCODING].length &&
    HEADER_VALUE_KEY in headers[HEADER_X_ACCEPT_ENCODING][0]
    ? headers[HEADER_X_ACCEPT_ENCODING][0][HEADER_VALUE_KEY]
    : COMPRESSION_NONE_ENCODING;
}

// DEV: iltorb is externalized to improve portability
function getBrCompressedResponseProperties(
  { html = "", iltorb = { compressSync: () => "" } } = {
    html: "",
    iltorb: { compressSync: () => "" },
  },
) {
  try {
    return {
      body: iltorb
        .compressSync(Buffer.from(html, "utf8"))
        .toString(ENCODING_BASE64),
      bodyEncoding: ENCODING_BASE64,
      headers: {
        [HEADER_CONTENT_ENCODING]: [
          { [HEADER_VALUE_KEY]: COMPRESSION_BROTLI_ENCODING },
        ],
      },
    };
  } catch (error) {
    console.error("ERROR: Failed to compress using Brotli", { error });
  }
  return {};
}

function getCompressedResponseProperties(
  {
    encoding = COMPRESSION_NONE_ENCODING,
    html = "",
    iltorb = { compressSync: () => "" },
  } = {
    encoding: COMPRESSION_NONE_ENCODING,
    html: "",
    iltorb: { compressSync: () => "" },
  },
) {
  switch (encoding) {
    case COMPRESSION_BROTLI_ENCODING: {
      return getBrCompressedResponseProperties({ html, iltorb });
    }
    case COMPRESSION_GZIP_ENCODING: {
      return getGzipCompressedResponseProperties({ html });
    }
    default: {
      return {};
    }
  }
}

function getCompressionExtension({ headers = {} } = { headers: {} }) {
  switch (getAcceptableEncoding({ headers })) {
    case COMPRESSION_BROTLI_ENCODING: {
      return COMPRESSION_BROTLI_EXTENSION;
    }
    case COMPRESSION_GZIP_ENCODING: {
      return COMPRESSION_GZIP_EXTENSION;
    }
    default: {
      return COMPRESSION_NONE_EXTENSION;
    }
  }
}

function getGzipCompressedResponseProperties({ html = "" } = { html: "" }) {
  const zlib = require("zlib");
  return {
    body: zlib
      .gzipSync(html, { level: zlib.Z_BEST_COMPRESSION })
      .toString(ENCODING_BASE64),
    bodyEncoding: ENCODING_BASE64,
    headers: {
      [HEADER_CONTENT_ENCODING]: [
        { [HEADER_VALUE_KEY]: COMPRESSION_GZIP_ENCODING },
      ],
    },
  };
}

function getOptimalEncoding(
  { headers = {}, uri = "" } = { headers: {}, uri: "" },
) {
  if (
    headers &&
    HEADER_ACCEPT_ENCODING in headers &&
    headers[HEADER_ACCEPT_ENCODING].length &&
    HEADER_VALUE_KEY in headers[HEADER_ACCEPT_ENCODING][0]
  ) {
    const acceptableEncodings = headers[HEADER_ACCEPT_ENCODING][0][
      HEADER_VALUE_KEY
    ].split(", ");
    if (uri.endsWith(COMPRESSION_BROTLI_EXTENSION)) {
      return COMPRESSION_BROTLI_ENCODING;
    } else if (uri.endsWith(COMPRESSION_GZIP_EXTENSION)) {
      return COMPRESSION_GZIP_ENCODING;
    } else if (isBrCompressible({ acceptableEncodings, uri })) {
      return COMPRESSION_BROTLI_ENCODING;
    } else if (isGzipCompressible({ acceptableEncodings, uri })) {
      return COMPRESSION_GZIP_ENCODING;
    }
  }

  return COMPRESSION_NONE_ENCODING;
}

function getXAcceptEncodingHeader(
  { headers = {}, uri = "" } = { headers: {}, uri: "" },
) {
  return {
    [HEADER_X_ACCEPT_ENCODING]: [
      {
        [HEADER_VALUE_KEY]: getOptimalEncoding({ headers, uri }),
      },
    ],
  };
}

function isBrCompressible(
  { acceptableEncodings = [], uri = "" } = { acceptableEncodings: [], uri: "" },
) {
  return (
    acceptableEncodings.indexOf(COMPRESSION_BROTLI_ENCODING) >= 0 &&
    !isPrecompressed({ uri })
  );
}

function isGzipCompressible(
  { acceptableEncodings = [], uri = "" } = { acceptableEncodings: [], uri: "" },
) {
  return (
    acceptableEncodings.indexOf(COMPRESSION_GZIP_ENCODING) >= 0 &&
    !isPrecompressed({ uri })
  );
}

function isPrecompressed({ uri = "" } = { uri: "" }) {
  const lastPeriodIndex = uri.lastIndexOf(".");
  if (lastPeriodIndex < 0) {
    return false;
  }

  return (
    PRECOMPRESSED_EXTENSIONS.indexOf(uri.substring(lastPeriodIndex + 1)) >= 0
  );
}

module.exports = {
  COMPRESSION_BROTLI_ENCODING,
  COMPRESSION_BROTLI_EXTENSION,
  COMPRESSION_GZIP_ENCODING,
  COMPRESSION_GZIP_EXTENSION,
  COMPRESSION_NONE_ENCODING,
  COMPRESSION_NONE_EXTENSION,
  HEADER_ACCEPT_ENCODING,
  HEADER_X_ACCEPT_ENCODING,
  PRECOMPRESSED_EXTENSIONS,
  compressWithGzip,
  compressWithBrotli,
  getAcceptableEncoding,
  getBrCompressedResponseProperties,
  getCompressedResponseProperties,
  getCompressionExtension,
  getGzipCompressedResponseProperties,
  getOptimalEncoding,
  getXAcceptEncodingHeader,
  isBrCompressible,
  isGzipCompressible,
  isPrecompressed,
};
