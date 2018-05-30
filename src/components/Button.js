import {h} from 'preact';

const Button = (props) => (
  <a href={props.href || '#'} className={`button ${props.className}`} onClick={props.onClick}>
    {props.children}
  </a>
);

export default Button;
