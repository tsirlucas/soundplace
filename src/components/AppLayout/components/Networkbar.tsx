import {h} from 'preact';

type Props = {
  networkClass: string;
  width: number;
  isDesktop: boolean;
  scrollbarWidth: number;
};

export const Networkbar = ({networkClass, width, isDesktop, scrollbarWidth}: Props) => {
  const parsedWidth = isDesktop ? width - 250 - scrollbarWidth : width;
  const style = `width: ${parsedWidth}px;`;

  return (
    <section className={`network-bar ${networkClass}`} style={style}>
      <span>Você está offline!</span>
    </section>
  );
};
