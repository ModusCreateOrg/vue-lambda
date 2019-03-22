#!/bin/bash

set -e
set -u
set -o pipefail

DIR="${BASH_SOURCE%/*}"
if [[ ! -d "$DIR" ]]; then DIR="$PWD"; fi

echo -e "\n[Check css]\n"
"$DIR/../node_modules/.bin/stylelint-config-prettier-check"

echo -e "\n[Check js: /]\n"
"$DIR/../node_modules/.bin/eslint" --print-config "$DIR/../.eslintrc.js" | "$DIR/../node_modules/.bin/eslint-config-prettier-check"

echo -e "\n[Check js: /app]\n"
"$DIR/../node_modules/.bin/eslint" --print-config "$DIR/../src/app/.eslintrc.js " | "$DIR/../node_modules/.bin/eslint-config-prettier-check"

echo -e "\n[Check js: /app/webpack]\n"
"$DIR/../node_modules/.bin/eslint" --print-config "$DIR/../src/app/webpack/.eslintrc.js " | "$DIR/../node_modules/.bin/eslint-config-prettier-check"

echo -e "\n[Check js: /test]\n"
"$DIR/../node_modules/.bin/eslint" --print-config "$DIR/../src/test/.eslintrc.js" | "$DIR/../node_modules/.bin/eslint-config-prettier-check"

echo -e "\n[Check js: /shared]\n"
"$DIR/../node_modules/.bin/eslint" --print-config "$DIR/../src/shared/.eslintrc.js " | "$DIR/../node_modules/.bin/eslint-config-prettier-check"
