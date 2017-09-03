import {h} from 'preact';

import '../style/components/_card.scss';

const Card = ({children}) => (
  <section className="card">
    {children}
  </section>
);

export default Card;
