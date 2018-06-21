# Sound Place

A Preact/Redux/RxJS/redux-observable PWA where you can manage and listen to Spotify and Youtube playlists and songs.

[![Greenkeeper badge](https://badges.greenkeeper.io/tsirlucas/soundplace.svg?token=e89f78d8d624e9199c4384185ba87645ef4309023ffbaaeee1133b0183921fd6&ts=1508702348672)](https://greenkeeper.io/)
[![build status](https://travis-ci.com/tsirlucas/soundplace.svg?token=ZNhrvg7GyFkRokuwtw6s&branch=master)](https://travis-ci.com/tsirlucas/soundplace) 
[![Code Climate](https://codeclimate.com/repos/59a2011dbfeab8029a0010cb/badges/1b62d2d8c9421cfbda42/gpa.svg)](https://codeclimate.com/repos/59a2011dbfeab8029a0010cb/feed)
[![gzip size](http://img.badgesize.io/https://www.soundplace.io/index.html?compression=gzip)](https://www.soundplace.io/bundlesize.gz)

## Features and toolbelt

- [X] [Typescript](https://www.typescriptlang.org)
- [x] [Preact](https://github.com/developit/preact) as [React](https://github.com/facebook/react) alternative
- [x] [React Router](https://github.com/ReactTraining/react-router) with some proper logics to create plain-routes even on v4, resulting in only 80kb (not minified and with browser-history included)
- [x] [Redux](http://redux.js.org/) to manage application state
- [x] [redux-observable](https://github.com/redux-observable/redux-observable) as middleware
- [x] [RxJS](https://github.com/Reactive-Extensions/RxJS) to use observable collections
- [x] Built with [Webpack](https://github.com/webpack/webpack)
- [x] Transpiled with [Babel](https://babeljs.io/)
- [x] [Sass](https://github.com/sass/sass) as css preprocessor
- [x] [gh-pages](https://pages.github.com/) to deploy production environment
- [x] [Cloudflare](https://www.cloudflare.com) as CDN
- [x] [Travis](https://travis-ci.com/) Integration
- [x] [Greenkeeper](https://greenkeeper.io/) Dependency Manager
- [x] [BundleSize](https://github.com/siddharthkp/bundlesize) < 100kb automatic check on PRs
- [x] [Lighthouse-CI](https://github.com/ebidel/lighthouse-ci) 100 score automatic check on PRs
- [x] [Code Climate](https://codeclimate.com/) automatic check on PRs
- [x] [Sentry](https://sentry.io/) for error tracking
- [x] [Workbox](https://github.com/GoogleChrome/workbox) to generate service-worker and runtime caching
- [x] Background player even on blocked screen with [Media Session API](https://developers.google.com/web/updates/2017/02/media-session)
- [x] Offline strategy using observables to concat cache and API results (first show cached, then automatically updates from network in real-time)
- [x] Offline strategy to cache songs and let user select what to cache
- [x] Let user remove songs from cache
- [x] Offline bar to tell users when they're running offline
- [x] No requests when there's no connection (falls back to cache-only)




## Phoenix backend

Our backend is a Phoenix application running on a Docker container
[See the project here](https://github.com/lucasmedeirosleite/sound_place)

## Running locally

1. Clone the repository: `git clone https://github.com/tsirlucas/soundplace.git`
2. `cd soundplace`
3. `npm install`
4. `npm run dev`
