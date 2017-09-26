import {h} from 'preact';

import Sidebar from './Sidebar';

export default function(props) {
	return (
		<section id="content">
      <Sidebar />
			{props.children}
		</section>
	);
}
