import React from 'react';
import {icons} from './Icons.constants';

type Props = {
  icon: string;
  color?: string;
  size: string;
};

export const Icon = (props: Props) => {
  const styles = {
    svg: {
      display: 'inline-block',
      verticalAlign: 'middle',
    },
    path: {
      fill: props.color || '',
    },
  };
  return (
    <svg
      style={styles.svg}
      width={`${props.size}`}
      height={`${props.size}`}
      viewBox={`0 0 24 24`}
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="1.414"
    >
      <path style={styles.path} d={icons[props.icon]} />
    </svg>
  );
};
