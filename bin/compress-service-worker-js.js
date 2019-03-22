#!/usr/bin/env node

require("@babel/register")({
  presets: ["@babel/preset-env"],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-transform-runtime",
    "syntax-trailing-function-commas",
    "dynamic-import-node",
  ],
});

const CreateServiceWorkerJsHelper = require("../src/shared/helpers/compress-service-worker-js-helper");
CreateServiceWorkerJsHelper.compressServiceWorkerJs();
