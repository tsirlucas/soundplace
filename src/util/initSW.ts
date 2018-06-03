if ('serviceWorker' in navigator && location.protocol === 'https:') {
  console.log('Starting service worker...');
  registerSW();
}

function registerSW() {
  navigator.serviceWorker
    .register('sw.js', {scope: './'})
    .then(registerSuccess)
    .catch(console.log.bind(console));
}

function registerSuccess(reg) {
  console.log("Done. Now you're running offline.");
  reg.onupdatefound = onUpdateFound(reg);
}

function onUpdateFound(reg) {
  return () => {
    console.log('Updating service worker...');
    const installingWorker = reg.installing;

    installingWorker.onstatechange = onStateChange(installingWorker);
  };
}

function onStateChange(installingWorker) {
  return () => {
    if (
      installingWorker.state === 'activated' &&
      navigator.serviceWorker &&
      navigator.serviceWorker.controller
    ) {
      console.log('Done! Reloading page...');
      window.location.reload();
    }
  };
}
