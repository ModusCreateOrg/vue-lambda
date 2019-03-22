const path = require("path");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const webpackMerge = require("webpack-merge");

const webpackBaseConfig = require("./webpack.base.config");

module.exports = webpackMerge(webpackBaseConfig, {
  entry: path.resolve(__dirname, "../server/index.prod.js"),
  externals: [nodeExternals()],
  output: {
    filename: "index.js",
    libraryTarget: "commonjs2",
    path: path.resolve(__dirname, "../../../dist/app"),
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../../../package.json"),
      },
      {
        from: path.resolve(__dirname, "../../../package-lock.json"),
      },
    ]),
  ],
  target: "node",
});
