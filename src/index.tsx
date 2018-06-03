import {h, render} from 'preact';

function init() {
  document.querySelector('#application').innerHTML = '';
  const App = require('./main').default;
  render(<App />, document.querySelector('#application'));
}

// first render:
init();

// add hot module replacement:
if (module['hot']) {
  module['hot'].accept('./main', init);
}
