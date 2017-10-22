import { h } from 'preact';

const Networkbar = ({ networkClass, width, isDesktop, scrollbarWidth }) => {
  const parsedWidth = isDesktop ? width - 250 - scrollbarWidth : width;
  const style = `width: ${parsedWidth}px;`;

  return (
    <section className={`network-bar ${networkClass}`} style={style}>
      <span>Você está offline!</span>
    </section>
  );
};

export default Networkbar;
