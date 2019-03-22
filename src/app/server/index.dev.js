const path = require("path");

const { createBundleRenderer } = require("vue-server-renderer");
const express = require("express");
const MemoryFileSystem = require("memory-fs");
const webpack = require("webpack");
const WebpackDevMiddleware = require("webpack-dev-middleware");
const WebpackHotMiddleware = require("webpack-hot-middleware");

const clientWebpackConfig = require("../webpack/webpack.vue.client.config");
const serverWebpackConfig = require("../webpack/webpack.vue.server.config");
const { VUE_TEMPLATE, getHtmlWithVueMetaInjected } = require("./index.base");

const readGeneratedFile = (fileSystem, webpackConfig, file) => {
  const fullPath = path.join(webpackConfig.output.path, file);
  try {
    return fileSystem.readFileSync(fullPath, "utf-8");
  } catch (error) {
    console.error("ERROR: Error reading file from file system:", {
      error,
      file,
    });
    return;
  }
};

function setupWebpackMiddleware(app, callback) {
  let serverBundle;
  let clientManifest;
  let readyPromiseResolver;
  const readyPromise = new Promise((resolve) => {
    readyPromiseResolver = resolve;
  });
  const onReady = (...args) => {
    readyPromiseResolver();
    callback(...args);
  };
  const onReadyIfReady = () => {
    if (clientManifest && serverBundle) {
      onReady(serverBundle, {
        clientManifest,
      });
    }
  };

  // Client
  const clientWebpackCompiler = webpack(clientWebpackConfig);
  const webpackDevMiddleware = WebpackDevMiddleware(clientWebpackCompiler, {
    publicPath: clientWebpackConfig.output.publicPath,
    noInfo: true,
  });

  app.use(webpackDevMiddleware);

  clientWebpackCompiler.plugin("done", (stats) => {
    stats = stats.toJson();
    stats.errors.forEach((error) => console.error(error));
    stats.warnings.forEach((error) => console.warn(error));
    if (stats.errors.length) {
      return;
    }

    clientManifest = JSON.parse(
      readGeneratedFile(
        webpackDevMiddleware.fileSystem,
        clientWebpackConfig,
        "../../tmp/app/vue-ssr-client-manifest.json",
      ),
    );
    onReadyIfReady();
  });

  app.use(WebpackHotMiddleware(clientWebpackCompiler, { heartbeat: 5000 }));

  // Server
  const serverWebpackCompiler = webpack(serverWebpackConfig);
  const memoryFs = new MemoryFileSystem();
  serverWebpackCompiler.outputFileSystem = memoryFs;

  serverWebpackCompiler.watch({}, (error, stats) => {
    if (error) {
      throw error;
    }
    stats = stats.toJson();
    if (stats.errors.length) {
      return;
    }

    serverBundle = JSON.parse(
      readGeneratedFile(
        memoryFs,
        serverWebpackConfig,
        "../tmp/app/vue-ssr-server-bundle.json",
      ),
    );
    onReadyIfReady();
  });

  return readyPromise;
}

// Update webpack client config
clientWebpackConfig.devtool = "source-map";
clientWebpackConfig.entry.app = [
  "webpack-hot-middleware/client",
  clientWebpackConfig.entry.app,
];
clientWebpackConfig.optimization.minimize = false;
clientWebpackConfig.output.filename = "[name].js";
clientWebpackConfig.output.pathinfo = true;
clientWebpackConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
);

// Update webpack server config
serverWebpackConfig.devtool = "source-map";
serverWebpackConfig.optimization.minimize = false;
serverWebpackConfig.output.pathinfo = true;

const app = express();

let bundleRenderer;
let readyPromise = setupWebpackMiddleware(
  app,
  (serverBundle, { clientManifest }) => {
    bundleRenderer = createBundleRenderer(serverBundle, {
      clientManifest,
      runInNewContext: false,
      template: VUE_TEMPLATE,
    });
  },
);

require("./dev/static")({ app });

app.get("*", (request, response, next) => {
  readyPromise.then(() => {
    response.setHeader("cache-control", "no-cache, no-store, must-revalidate");
    response.setHeader("content-type", "text/html");

    const bundleRendererContext = {
      state: null,
      uri: request.url,
      vueMeta: null,
    };

    bundleRenderer
      .renderToString(bundleRendererContext)
      .then((htmlWithoutVueMeta) => {
        const html = getHtmlWithVueMetaInjected(
          htmlWithoutVueMeta,
          bundleRendererContext.vueMeta.inject(),
        );

        response.status(bundleRendererContext.httpCode);
        response.send(html);
      })
      .catch((error) => {
        console.error("ERROR: Render error:", error);
        next(error);
      });
  });
});

app.listen(80);
