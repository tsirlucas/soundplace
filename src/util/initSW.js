if ('serviceWorker' in navigator && location.protocol === 'https:') {
  console.log('Starting service worker...');
  registerSW();
}

function registerSW() {
  navigator.serviceWorker.register('sw.js', { scope: './' })
    .then(registerSuccess)
    .catch(console.log.bind(console));
}

function registerSuccess(reg) {
  console.log('Done. Now you\'re running offline.');
  reg.onupdatefound = onUpdateFound(reg);
}

function onUpdateFound(reg) {
  return () => {
    console.log('Service worker update found! Removing old cache before install...');
    clearCache().then(() => {
      console.log('Done! Updating service worker...');
      const installingWorker = reg.installing;

      installingWorker.onstatechange = onStateChange(installingWorker);
    });
  };
}

function clearCache() {
  return caches.keys().then((cacheNames) => {
    return Promise.all(
      cacheNames.map((cacheName) => {
        return caches.delete(cacheName);
      })
    );
  });
}

function onStateChange(installingWorker) {
  return () => {
    if (installingWorker.state === 'activated' && navigator.serviceWorker && navigator.serviceWorker.controller) {
      console.log('Service worker updated! Reloading page...');
      window.location.reload(true);
    }
  };
}
