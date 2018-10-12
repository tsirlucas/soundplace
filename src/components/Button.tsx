import React, {MouseEvent} from 'react';

interface Props {
  href?: string;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  children?: Element | string;
}

export const Button = (props: Props) => (
  <a href={props.href || '#'} className={`button ${props.className}`} onClick={props.onClick}>
    {props.children}
  </a>
);
