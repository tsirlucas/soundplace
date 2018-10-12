import React from 'react';

type Props = {
  networkClass: string;
  width: number;
  isDesktop: boolean;
};

export const Networkbar = ({networkClass, width, isDesktop}: Props) => {
  const parsedWidth = isDesktop ? width - 250 : width;
  const style = {width: `${parsedWidth}px`};

  return (
    <section className={`network-bar ${networkClass}`} style={style}>
      <span>You're running offline!</span>
    </section>
  );
};
