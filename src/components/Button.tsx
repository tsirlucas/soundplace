import {h} from 'preact';

interface EventHandler<E extends Event> {
  (event: E): void;
}

interface Props {
  href?: string;
  className?: string;
  onClick?: EventHandler<MouseEvent>;
  children?: Element;
}

export const Button = (props: Props) => (
  <a href={props.href || '#'} className={`button ${props.className}`} onClick={props.onClick}>
    {props.children}
  </a>
);
