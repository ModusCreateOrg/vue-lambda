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

const CreatePwaHtmlHelper = require("../src/shared/helpers/create-pwa-html-helper");
CreatePwaHtmlHelper.createPwaHtml();
