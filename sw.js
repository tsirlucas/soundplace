importScripts('workbox-sw.prod.v2.1.3.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "200.html",
    "revision": "74bb92561d468f2b7a61f292cf79d1b3"
  },
  {
    "url": "404.html",
    "revision": "74bb92561d468f2b7a61f292cf79d1b3"
  },
  {
    "url": "assets/report.html",
    "revision": "07fff4d1e6803085aa562628971f98b3"
  },
  {
    "url": "bundle.js",
    "revision": "29257e088c63b5299d2e4d39c4a2ff4a"
  },
  {
    "url": "index.html",
    "revision": "74bb92561d468f2b7a61f292cf79d1b3"
  },
  {
    "url": "raven.min.js",
    "revision": "452716b418a89a84ccfd77be827204e1"
  },
  {
    "url": "style.css",
    "revision": "f10be361fe04a17fc0ef495f876c7b70"
  }
];

const workboxSW = new self.WorkboxSW({
  "skipWaiting": true,
  "clientsClaim": true,
  "directoryIndex": "index.html"
});
workboxSW.precache(fileManifest);
workboxSW.router.registerNavigationRoute("index.html");workboxSW.router.registerRoute(/^https:\/\/scontent\.xx\.fbcdn\.net\//, workboxSW.strategies.cacheFirst({
  "cacheName": "scontent-cache",
  "cacheableResponse": {
    "statuses": [
      0,
      200,
      201,
      301,
      304,
      302
    ]
  },
  "cacheExpiration": {
    "maxAgeSeconds": 31536000
  }
}), 'GET');
workboxSW.router.registerRoute(/^https:\/\/mosaic\.scdn\.co\//, workboxSW.strategies.cacheFirst({
  "cacheName": "mosaic-cache",
  "cacheableResponse": {
    "statuses": [
      0,
      200,
      201,
      301,
      304,
      302
    ]
  },
  "cacheExpiration": {
    "maxAgeSeconds": 31536000
  }
}), 'GET');
workboxSW.router.registerRoute(/^https:\/\/i\.scdn\.co\//, workboxSW.strategies.cacheFirst({
  "cacheName": "iscdn-cache",
  "cacheableResponse": {
    "statuses": [
      0,
      200,
      201,
      301,
      304,
      302
    ]
  },
  "cacheExpiration": {
    "maxAgeSeconds": 31536000
  }
}), 'GET');
workboxSW.router.registerRoute(/^https:\/\/pl\.scdn\.co\//, workboxSW.strategies.cacheFirst({
  "cacheName": "plscdn-cache",
  "cacheableResponse": {
    "statuses": [
      0,
      200,
      201,
      301,
      304,
      302
    ]
  },
  "cacheExpiration": {
    "maxAgeSeconds": 31536000
  }
}), 'GET');
workboxSW.router.registerRoute(/^https:\/\/youtube-cacheable-audio-stream\.herokuapp\.com\//, workboxSW.strategies.cacheFirst({
  "cacheName": "stream-cache",
  "cacheableResponse": {
    "statuses": [
      200,
      201
    ]
  },
  "cacheExpiration": {
    "maxAgeSeconds": 31536000
  }
}), 'GET');
