#!/usr/bin/env bash
# dist/ を S3 に上げ、CloudFront のキャッシュを消す。terraform apply のあとに、手で実行する。
# 使い方: AWS_PROFILE=<プロファイル> scripts/upload.sh
set -euo pipefail
cd "$(dirname "$0")/.."

BUCKET=$(terraform -chdir=infra output -raw bucket_name)
DIST_ID=$(terraform -chdir=infra output -raw distribution_id)

npm ci
npm run build

# ファイル名にハッシュが付く assets/ は長く保存、それ以外（index.html など）は毎回確認させる。
aws s3 sync dist/ "s3://${BUCKET}/" --delete --exclude "assets/*" --cache-control "no-cache"
aws s3 sync dist/assets/ "s3://${BUCKET}/assets/" --delete --cache-control "public,max-age=31536000,immutable"
aws cloudfront create-invalidation --distribution-id "${DIST_ID}" --paths "/*"
