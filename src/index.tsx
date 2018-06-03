import {h, render} from 'preact';

import App from './main';

document.querySelector('#application').innerHTML = '';
render(<App />, document.querySelector('#application'));
