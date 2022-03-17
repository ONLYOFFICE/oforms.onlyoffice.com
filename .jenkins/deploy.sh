#!/bin/bash
readonly NAME_BUCKET="$3"
readonly CLOUD_FRONT_DISTRIBUTION_ID="$4"
readonly REGION="$5"

export AWS_ACCESS_KEY_ID="$1"
export AWS_SECRET_ACCESS_KEY="$2"
export AWS_DEFAULT_REGION="$REGION"

build_site() {
  echo "=== build site ==="
  cd ${WORKSPACE}
  yarn
  yarn build
  if [[ "$?" -ne 0 ]]; then
    echo "yarn build failed"
    exit 1
  fi
}

delete_old_site() {
  echo "=== delete old site ==="
  if [[ -d "${WORKSPACE}/public" ]]; then
    aws s3 rm s3://${NAME_BUCKET} --recursive
  else
    echo 'No directory'
    exit 1
  fi
}

deploy_site() {
  echo "=== deploy site ==="
  aws s3 cp ${WORKSPACE}/public/ s3://${NAME_BUCKET}/ --recursive
}

invalidation_cloud_front() {
  echo "=== start invalidation ==="
  aws cloudfront create-invalidation \
    --distribution-id ${CLOUD_FRONT_DISTRIBUTION_ID} \
    --paths "/*"
}

main() {
  echo "Deploy from ${BRANCH_NAME} is starting."
  build_site
  delete_old_site
  deploy_site
  invalidation_cloud_front
  echo "=== Finish ==="
}

main