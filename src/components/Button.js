import {h} from 'preact';

import '../style/components/_button.scss';

const Button = (props) => (
  <a href={props.href || '#'}
     className={`button ${props.className}`}
     onClick={props.onClick}>{props.children}</a>
);

export default Button;
