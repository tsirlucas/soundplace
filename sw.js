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

importScripts("workbox-v3.4.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.4.1"});

importScripts(
  "precache-manifest.7e7712d0ad5177f261bec8955be17a9c.js"
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
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/");

workbox.routing.registerRoute(/^https:\/\/lh3\.googleusercontent\.com\//, workbox.strategies.cacheFirst({ cacheName: "googleusercontent-cache", plugins: [new workbox.expiration.Plugin({"maxEntries":100000,"maxAgeSeconds":31536000,"purgeOnQuotaError":false}), new workbox.cacheableResponse.Plugin({"statuses":[0,200,201,301,304,302]})] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/i\.ytimg\.com\//, workbox.strategies.cacheFirst({ cacheName: "ytimg-cache", plugins: [new workbox.expiration.Plugin({"maxEntries":100000,"maxAgeSeconds":31536000,"purgeOnQuotaError":false}), new workbox.cacheableResponse.Plugin({"statuses":[0,200,201,301,304,302]})] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/api-soundplace\.com\/stream\//, workbox.strategies.cacheFirst({ cacheName: "stream-cache", plugins: [{ cacheWillUpdate: ({ request, response }) => { return caches.match(request.url, { ignoreSearch: true }).then(res => { /* ignore repeated songs */ if (res) { return null; } /* cache only save=true param */ if (request.url.includes('?save=true')) { return response; } /* ignore any other thing */ return null; }); }, cachedResponseWillBeUsed: ({ request, cachedResponse }) => { if (cachedResponse) { return cachedResponse; } /* this will match same url/diff query string where the original failed */ return caches.match(request.url, { ignoreSearch: true }); } }, new workbox.expiration.Plugin({"maxEntries":100000,"maxAgeSeconds":31536000,"purgeOnQuotaError":false}), new workbox.cacheableResponse.Plugin({"statuses":[0,200,201,206,301,304,302]})] }), 'GET');
