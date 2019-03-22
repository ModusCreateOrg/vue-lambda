const path = require("path");

const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  context: __dirname,
  devtool: process.env.NODE_ENV === "development" ? "source-map" : false,
  entry: path.resolve(__dirname, "./index.js"),
  mode: "production",
  module: {
    rules: [
      {
        exclude: (file) => /node_modules/.test(file),
        loader: "babel-loader",
        test: /\.js$/,
      },
    ],
  },
  optimization: {
    minimize: process.env.NODE_ENV !== "development",
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          mangle: true,
          output: {
            comments: false,
          },
        },
      }),
    ],
    nodeEnv: process.env.NODE_ENV,
  },
  output: {
    filename: "index.js",
    libraryTarget: "commonjs2",
    path: path.resolve(__dirname, "../../dist/viewer-request"),
    pathinfo: process.env.NODE_ENV === "development",
    publicPath: "/",
  },
  performance: {
    hints: false,
  },
  plugins: [
    new FriendlyErrorsPlugin(),
    new webpack.EnvironmentPlugin(["NODE_ENV"]),
  ],
  resolve: {
    extensions: [".js"],
  },
  target: "node",
  watchOptions: {
    ignored: /node_modules/,
  },
};
