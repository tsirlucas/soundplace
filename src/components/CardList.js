import { h } from 'preact';

const CardList = ({ items }) => (
  <section className="cardlist-container">
    {items.map((item) => <CardListItem item={item} />)}
  </section>
);

const CardListItem = ({ item }) => (
  <div className="cardlist-item" onClick={() => console.log('ola')}>
    <figure>
      <div className="cardlist-item-cover">
        <img data-src={item.cover || 'http://via.placeholder.com/200x200'} alt={item.name}/>
      </div>
      <div className="cardlist-item-title">
        <figcaption>
          <span>{item.name}</span>
        </figcaption>
      </div>
    </figure>
  </div>
);

export default CardList;
