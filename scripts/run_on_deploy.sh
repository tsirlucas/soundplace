set -euo pipefail

echo -e "machine github.com\n  login $GITHUB_TOKEN" >> ~/.netrc

gh-pages -d build

echo -e "\nPurging Cloudflare cache...\n"

curl -X DELETE "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE/purge_cache" \
    -H "X-Auth-Email: tsirlucas@gmail.com" \
    -H "X-Auth-Key: $CLOUDFLARE_TOKEN" \
    -H "Content-Type: application/json" \
    --data "{\"purge_everything\":true}"

echo -e "\nCloudflare cache purged!\n"

cd build
sudo chown -R travis:travis /home/travis/
docker pull emazzotta/lighthouse-badges
docker run --privileged=true\
    -v $(pwd):/home/chrome/reports \
    --cap-add=SYS_ADMIN \
    emazzotta/lighthouse-badges \
    /bin/bash -c "chown $UID:$UID & lighthouse-badges --urls https://www.soundplace.io/ --save-report"

mv www_soundplace_io_.html ./assets/report.html
cd ..
gh-pages -d build;
