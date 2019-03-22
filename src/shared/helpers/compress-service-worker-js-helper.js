const fs = require("fs");
const path = require("path");
const iltorb = require("iltorb");

const compressionHelper = require("./compression-helper");

function getJs() {
  return fs.readFileSync(
    path.resolve(__dirname, "../../../dist/static/service-worker.js"),
  );
}

function saveJsWithCompressionExtension(
  { js = "", compressionExtension = "" } = {
    js: "",
    compressionExtension: "",
  },
) {
  fs.writeFileSync(
    path.resolve(
      __dirname,
      `../../../dist/static/service-worker.js${compressionExtension}`,
    ),
    js,
  );
}

function compressServiceWorkerJs() {
  const js = getJs();
  saveJsWithCompressionExtension({
    js: compressionHelper.compressWithGzip({ string: js }),
    compressionExtension: compressionHelper.COMPRESSION_GZIP_EXTENSION,
  });
  saveJsWithCompressionExtension({
    js: compressionHelper.compressWithBrotli({ iltorb, string: js }),
    compressionExtension: compressionHelper.COMPRESSION_BROTLI_EXTENSION,
  });
}

module.exports = {
  compressServiceWorkerJs,
};
