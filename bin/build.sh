#!/bin/bash

set -e
set -u
set -o pipefail

DIR="${BASH_SOURCE%/*}"
if [[ ! -d "$DIR" ]]; then DIR="$PWD"; fi

export NODE_ENV="production"

echo -e "\n[Create Clean dist Directory]\n"
rm -rf ./dist
mkdir -p ./dist/tmp

echo -e "\n[Create Vue Client]\n"
"$DIR/../node_modules/.bin/webpack" --config "$DIR/../src/app/webpack/webpack.vue.client.config.js" --progress --hide-modules

echo -e "\n[Create Vue Server]\n"
"$DIR/../node_modules/.bin/webpack" --config "$DIR/../src/app/webpack/webpack.vue.server.config.js" --progress --hide-modules

echo -e "\n[Create App]\n"
"$DIR/../node_modules/.bin/webpack" --config "$DIR/../src/app/webpack/webpack.lambda.config.js" --progress --hide-modules

echo -e "\n[Create Viewer Request]\n"
"$DIR/../node_modules/.bin/webpack" --config "$DIR/../src/viewer-request/webpack.config.js" --progress --hide-modules

echo -e "\n[Compress service-worker.js]\n"
node "$DIR/compress-service-worker-js.js"

echo -e "\n[Create pwa.html]\n"
node "$DIR/create-pwa-html.js"

echo -e "\n[Install App Dependencies]\n"
cd "$DIR/../dist/app" && npm install --unsafe-perm && cd -

echo -e "\n[Clean Up]\n"
rm -fr ./dist/tmp
rm -fr ./dist/app/package.json
rm -fr ./dist/app/package-lock.json
