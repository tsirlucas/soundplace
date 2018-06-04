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

    installingWorker.addEventListener('statechange', onStateChange);
  };
}

function onStateChange(e) {
  if (e.currentTarget.state === 'activated') {
    console.log('Done! Reloading page...');
    window.location.reload(true);
  }
}
