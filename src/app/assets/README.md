# App assets

Files in this directory are copied into `dist/static/assets` during a build with cache-bust renaming and are served from `/assets/*`.

The only files that should reside here are those that are shared across multiple components/views.

Obtain an href to an asset by requiring it, e.g.: `const assetHref = require(./path/to/asset.ext);`
