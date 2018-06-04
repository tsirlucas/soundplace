/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

importScripts(
  "precache-manifest.989669cc22b45f317115d49dcdf6500a.js"
);

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {
  "directoryIndex": "index.html"
});

workbox.routing.registerNavigationRoute("index.html");

workbox.routing.registerRoute(/^https:\/\/scontent\.xx\.fbcdn\.net\//, workbox.strategies.cacheFirst({ cacheName: "scontent-cache", plugins: [new workbox.expiration.Plugin({"maxEntries":200,"maxAgeSeconds":31536000}), new workbox.cacheableResponse.Plugin({"statuses":[0,200,201,301,304,302]})] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/mosaic\.scdn\.co\//, workbox.strategies.cacheFirst({ cacheName: "mosaic-cache", plugins: [new workbox.expiration.Plugin({"maxEntries":200,"maxAgeSeconds":31536000}), new workbox.cacheableResponse.Plugin({"statuses":[0,200,201,301,304,302]})] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/i\.scdn\.co\//, workbox.strategies.cacheFirst({ cacheName: "iscdn-cache", plugins: [new workbox.expiration.Plugin({"maxEntries":200,"maxAgeSeconds":31536000}), new workbox.cacheableResponse.Plugin({"statuses":[0,200,201,301,304,302]})] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/pl\.scdn\.co\//, workbox.strategies.cacheFirst({ cacheName: "plscdn-cache", plugins: [new workbox.expiration.Plugin({"maxEntries":200,"maxAgeSeconds":31536000}), new workbox.cacheableResponse.Plugin({"statuses":[0,200,201,301,304,302]})] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/youtube-cacheable-audio-stream\.herokuapp\.com\//, workbox.strategies.cacheFirst({ cacheName: "stream-cache", plugins: [new workbox.expiration.Plugin({"maxEntries":200,"maxAgeSeconds":31536000}), new workbox.cacheableResponse.Plugin({"statuses":[200,201]})] }), 'GET');
