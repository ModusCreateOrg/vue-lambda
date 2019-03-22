#!/bin/bash

set -e
set -u
set -o pipefail

DIR="${BASH_SOURCE%/*}"
if [[ ! -d "$DIR" ]]; then DIR="$PWD"; fi

aws cloudformation deploy --template-file "$DIR/../.aws/support.yaml" --stack-name "$STACK_NAME" --no-fail-on-empty-changeset --capabilities CAPABILITY_IAM --parameter-overrides S3BucketNameArtifacts="$S3_BUCKET_NAME_ARTIFACTS" S3BucketNameStatic="$S3_BUCKET_NAME_STATIC" --tags Application="vue-lambda" Environment="production"
aws cloudformation update-termination-protection --enable-termination-protection --stack-name "$STACK_NAME"
