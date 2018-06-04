set -euo pipefail

git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"

gh-pages -d build

echo -e "\nPurging Cloudflare cache...\n"

curl -X DELETE "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE/purge_cache" \
    -H "X-Auth-Email: tsirlucas@gmail.com" \
    -H "X-Auth-Key: $CLOUDFLARE_TOKEN" \
    -H "Content-Type: application/json" \
    --data "{\"purge_everything\":true}"

echo -e "\nCloudflare cache purged!\n"

cd build
lighthouse-badges --urls https://www.soundplace.io/ --save-report
mv www_soundplace_io_.html ./assets/report.html
cd ..
gh-pages -d build;
