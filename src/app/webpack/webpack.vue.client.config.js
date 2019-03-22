const path = require("path");

const CompressionPlugin = require("compression-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const iltorbCompress = require("iltorb").compress;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssPresetEnv = require("postcss-preset-env");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config");

const plugins = [
  new VueLoaderPlugin(),
  new MiniCssExtractPlugin({
    filename: "[name].[contenthash].css",
  }),
  new webpack.DefinePlugin({
    "process.env.VUE_ENV": JSON.stringify("client"),
  }),
  // Export the Vue SSR client manifest to a temporary location so that it can be imported into the lambda bundle (in ../lambda.js)
  new VueSSRClientPlugin({
    filename: "../../tmp/app/vue-ssr-client-manifest.json",
  }),
  new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, "../../static"),
      ignore: ["README.md"],
      to: path.resolve(__dirname, "../../../dist/static"),
    },
  ]),
];

if (process.env.NODE_ENV !== "development") {
  plugins.push(
    ...[
      new CompressionPlugin({
        exclude: "vue-ssr-client-manifest.json",
        minRatio: 2,
        // Not png
        test: /\.(css|csv|gif|htm|html|ico|jpeg|jpg|js|json|svg|txt|webmanifest|xml)$/,
      }),
      new CompressionPlugin({
        algorithm(input, compressionOptions, callback) {
          return iltorbCompress(input, callback);
        },
        exclude: "vue-ssr-client-manifest.json",
        filename: "[path].br[query]",
        minRatio: 2,
        // Not png
        test: /\.(css|csv|gif|htm|html|ico|jpeg|jpg|js|json|svg|txt|webmanifest|xml)$/,
      }),
      new SWPrecacheWebpackPlugin({
        cacheId: "vue-lambda",
        dontCacheBustUrlsMatching: /./,
        filepath: path.resolve(
          __dirname,
          "../../../dist/static/service-worker.js",
        ),
        minify: true,
        navigateFallback: "/pwa.html",
        navigateFallbackWhitelist: [/^\/pwa$/],
        staticFileGlobsIgnorePatterns: [
          /^.*\.br$/,
          /^.*\.gz$/,
          /\/browserconfig\.xml$/,
          /\/logo-.*\.png$/,
          /\/robots\.txt$/,
          /\/safari-pinned-tab\.svg$/,
          /\/site\.webmanifest$/,
          /\/sitemap\.xml$/,
          /\/vue-ssr-client-manifest\.json$/,
        ],
        stripPrefix: path.resolve(__dirname, "../../../dist/static"),
      }),
    ],
  );
}

module.exports = webpackMerge(webpackBaseConfig, {
  entry: {
    app: path.resolve(__dirname, "../entry.client.js"),
  },
  module: {
    // Necessary for Vuex (in ../app.js)
    noParse: /es6-promise\.js$/,
    rules: [
      {
        loader: "vue-loader",
        options: {
          preserveWhitespace: false,
        },
        test: /\.vue$/,
      },
      {
        exclude: (file) => /node_modules/.test(file) && !/\.vue\.js/.test(file),
        loader: "babel-loader",
        test: /\.js$/,
      },
      {
        loader: "file-loader",
        options: {
          name: "[name].[hash].[ext]",
          publicPath: "/assets/",
        },
        test: /\.(png|jpg|gif|svg)$/,
      },
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV !== "development"
            ? MiniCssExtractPlugin.loader
            : "vue-style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [postcssPresetEnv()],
            },
          },
          `sass-loader${
            process.env.NODE_ENV !== "development"
              ? "?outputStyle=compressed"
              : ""
          }`,
        ],
      },
    ],
  },
  optimization: {
    runtimeChunk: {
      name: "runtime",
    },
    splitChunks: {
      chunks: "all",
    },
  },
  output: {
    path: path.resolve(__dirname, "../../../dist/static/assets"),
    publicPath: "/assets/",
  },
  plugins,
});
