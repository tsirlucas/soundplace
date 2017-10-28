set -eu pipefail

node_modules/now/download/dist/now switch soundplace --token $NOW_TOKEN

URL=$(node_modules/now/download/dist/now ./build -n prs-soundplace --token $NOW_TOKEN --static --public -f)

echo -e "\nRunning lighthouse tests on: $URL\n"

node ./node_modules/lighthouse-ci/runlighthouse.js $URL --runner=chrome --score=100
