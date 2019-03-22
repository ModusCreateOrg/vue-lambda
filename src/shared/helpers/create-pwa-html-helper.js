const fs = require("fs");
const path = require("path");

const iltorb = require("iltorb");

const compressionHelper = require("./compression-helper");
const SsrHelper = require("./ssr-helper").default;

function saveHtmlWithCompressionExtension(
  { html = "", compressionExtension = "" } = {
    html: "",
    compressionExtension: "",
  },
) {
  fs.writeFileSync(
    path.resolve(
      __dirname,
      `../../../dist/static/pwa.html${compressionExtension}`,
    ),
    html,
  );
}

function createPwaHtml() {
  SsrHelper.getHtml({ uri: "/pwa" }).then((html) => {
    saveHtmlWithCompressionExtension({
      html,
    });
    saveHtmlWithCompressionExtension({
      html: compressionHelper.compressWithGzip({ string: html }),
      compressionExtension: compressionHelper.COMPRESSION_GZIP_EXTENSION,
    });
    saveHtmlWithCompressionExtension({
      html: compressionHelper.compressWithBrotli({ iltorb, string: html }),
      compressionExtension: compressionHelper.COMPRESSION_BROTLI_EXTENSION,
    });
  });
}

module.exports = {
  createPwaHtml,
};
