const path = require("path");

const express = require("express");

module.exports = ({ app }) => {
  app.use(
    express.static(path.resolve(__dirname, "../../../../static"), {
      index: false,
      setHeaders: (response) => {
        response.setHeader(
          "Cache-Control",
          "no-cache, no-store, must-revalidate",
        );
      },
    }),
  );
};
