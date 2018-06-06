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
    "revision": "3f0ed074dfcab18d8d8e6b57c1e253f2"
  },
  {
    "url": "404.html",
    "revision": "3f0ed074dfcab18d8d8e6b57c1e253f2"
  },
  {
    "url": "asset-manifest.json",
    "revision": "36d1d85d4d13e75c2f26b4ccdf492b28"
  },
  {
    "url": "assets/img/android-chrome-192x192.png",
    "revision": "59e221032ab061cad83b6ce2bcddbde8"
  },
  {
    "url": "assets/img/android-chrome-512x512.png",
    "revision": "cf3fdf7af60a294d6d3f48cb7ad82488"
  },
  {
    "url": "assets/img/apple-touch-icon.png",
    "revision": "a0e46feb3cc577478b127936e739dd08"
  },
  {
    "url": "assets/img/favicon-16x16.png",
    "revision": "d712b605ed58419c7e6d4ab885d147b7"
  },
  {
    "url": "assets/img/favicon-32x32.png",
    "revision": "2f7ce797cf8f198dedb9a9f38b7ef13b"
  },
  {
    "url": "assets/img/mstile-150x150.png",
    "revision": "ba817517b2c4e1ba1ce802c4d4fafdb4"
  },
  {
    "url": "assets/manifest.json",
    "revision": "e7f7832f2ee2c344f7c998f9eabcb448"
  },
  {
    "url": "assets/report.html",
    "revision": "07fff4d1e6803085aa562628971f98b3"
  },
  {
    "url": "bundle.js",
    "revision": "c7c8cbf678ecb509c49a7ad9ede4bc1d"
  },
  {
    "url": "index.html",
    "revision": "3f0ed074dfcab18d8d8e6b57c1e253f2"
  },
  {
    "url": "raven.min.js",
    "revision": "452716b418a89a84ccfd77be827204e1"
  },
  {
    "url": "style.css",
    "revision": "bcbb58bb52e47e4b97a36f34ded6168b"
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
