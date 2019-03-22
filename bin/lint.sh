#!/bin/bash

set -e
set -u
set -o pipefail

DIR="${BASH_SOURCE%/*}"
if [[ ! -d "$DIR" ]]; then DIR="$PWD"; fi

cd "$DIR/.."

echo -e "\n[Lint css]\n"
"$DIR/../node_modules/.bin/stylelint" "./src/**/*.{css,htm,html,scss,vue}" ${1-}

echo -e "\n[Lint js: config: /]\n"
"$DIR/../node_modules/.bin/eslint" "./.*.{js,json}" --report-unused-disable-directives ${1-}

echo -e "\n[Lint js: config: /src]\n"
"$DIR/../node_modules/.bin/eslint" "./src/**/.*.{js,json}" --report-unused-disable-directives ${1-}

echo -e "\n[Lint js: config: /src]\n"
"$DIR/../node_modules/.bin/eslint" "./src/**/.*.{js,json}" --report-unused-disable-directives ${1-}

echo -e "\n[Lint js: /src]\n"
"$DIR/../node_modules/.bin/eslint" "./src/**/*.{js,json,vue}" --report-unused-disable-directives ${1-}

echo -e "\n[Lint js: /bin]\n"
"$DIR/../node_modules/.bin/eslint" "./bin/**/*.{js,json,vue}" --report-unused-disable-directives ${1-}
