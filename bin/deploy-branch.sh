#!/bin/bash

set -e
set -u
set -o pipefail

DIR="${BASH_SOURCE%/*}"
if [[ ! -d "$DIR" ]]; then DIR="$PWD"; fi

FILENAME_BRANCH_YAML="branch.yaml"
FILENAME_LAMBDA_ZIP="lambda.zip"

SRC_BRANCH_YAML_PATH="$DIR/../.aws/$FILENAME_BRANCH_YAML"
DIST_BRANCH_YAML_PATH="$DIR/../dist/$FILENAME_BRANCH_YAML"
DIST_APP_LAMBDA_ZIP_PATH="$DIR/../dist/app/$FILENAME_LAMBDA_ZIP"
DIST_VIEWER_REQUEST_LAMBDA_ZIP_PATH="$DIR/../dist/viewer-request/$FILENAME_LAMBDA_ZIP"

STACK_NAME="vue-lambda-$BRANCH_SLUG"

cp $SRC_BRANCH_YAML_PATH $DIST_BRANCH_YAML_PATH

LAMBDA_APP_SHA1SUM="$(sha1sum $DIST_APP_LAMBDA_ZIP_PATH | sed 's/ .*$//')"
LAMBDA_VIEWER_REQUEST_SHA1SUM="$(sha1sum $DIST_VIEWER_REQUEST_LAMBDA_ZIP_PATH | sed 's/ .*$//')"

sed -i "s/LambdaVersionApp/LambdaVersionApp$LAMBDA_APP_SHA1SUM/g" "$DIST_BRANCH_YAML_PATH"
sed -i "s/LambdaVersionViewerRequest/LambdaVersionViewerRequest$LAMBDA_VIEWER_REQUEST_SHA1SUM/g" "$DIST_BRANCH_YAML_PATH"

aws cloudformation describe-stacks --stack-name "$STACK_NAME" && export STACK_ALREADY_EXISTS=true || export STACK_ALREADY_EXISTS=false
aws cloudformation deploy --template-file "$DIST_BRANCH_YAML_PATH" --stack-name "$STACK_NAME" --no-fail-on-empty-changeset --capabilities CAPABILITY_IAM --parameter-overrides BranchSlug="$BRANCH_SLUG" Subdomain="$SUBDOMAIN" Commit="$COMMIT" --tags Application="website" Environment="$ENVIRONMENT" Branch="$BRANCH"
$STACK_ALREADY_EXISTS || $IS_NOT_MASTER_BRANCH || aws cloudformation update-termination-protection --enable-termination-protection --stack-name "$STACK_NAME"
