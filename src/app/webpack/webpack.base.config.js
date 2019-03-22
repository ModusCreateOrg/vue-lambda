const path = require("path");

const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

const sanitizeModuleId = (moduleId) => {
  const moduleIdSplitByExclamationPoints = moduleId.split("!");
  const lastModuleIdExcludingQueryString = moduleIdSplitByExclamationPoints[
    moduleIdSplitByExclamationPoints.length - 1
  ].split("?", 1)[0];
  const filename = path.posix.basename(
    lastModuleIdExcludingQueryString,
    ".vue",
  );
  const lowercaseFilename = filename.toLowerCase();
  const sanitizedFilename = lowercaseFilename.replace(/[^a-z]/gi, "");

  return sanitizedFilename;
};

const generateChunkName = (chunk) =>
  Array.from(chunk.modulesIterable, (module) =>
    module.id
      ? sanitizeModuleId(module.id)
      : path.relative(module.context, module.request),
  )
    .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
    .join("_");

module.exports = {
  context: path.resolve(__dirname, "../"),
  devtool: false,
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          mangle: true,
          output: {
            comments: false,
          },
          safari10: true,
        },
      }),
    ],
    nodeEnv: process.env.NODE_ENV,
  },
  output: {
    filename: "[name].[contenthash].js",
    hashDigestLength: 32,
    hashFunction: "md5",
    pathinfo: false,
    publicPath: "/",
  },
  performance: {
    hints: false,
  },
  plugins: [
    new FriendlyErrorsPlugin(),
    new webpack.EnvironmentPlugin(["NODE_ENV"]),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NamedChunksPlugin((chunk) => {
      if (chunk.name) {
        return chunk.name;
      }

      return generateChunkName(chunk);
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HashedModuleIdsPlugin({
      hashDigest: "hex",
      hashDigestLength: 32,
      hashFunction: "md5",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../assets"),
    },
    extensions: [".js"],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
};
