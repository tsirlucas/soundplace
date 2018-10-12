import React from 'react';
import {Cover} from 'models';

type Item = {
  name: string;
  cover: Cover;
};

type ListProps = {
  items: {[index: string]: Item};
  open: (item: Item) => void;
};

type ItemProps = {
  item: Item;
  open: (item: Item) => void;
};

const CardList = ({items, open}: ListProps) => (
  <section className="cardlist-container">
    {items &&
      Object.values(items).map((item, i) => <CardListItem key={i} item={item} open={open} />)}
  </section>
);

const CardListItem = ({item, open}: ItemProps) => (
  <div className="cardlist-item" onClick={() => open(item)}>
    <figure>
      <div className="cardlist-item-cover">
        <img data-src={item.cover.medium || 'http://via.placeholder.com/200x200'} alt={item.name} />
      </div>
      <div className="cardlist-item-title">
        <figcaption>
          <div>
            <span>{item.name}</span>
          </div>
        </figcaption>
      </div>
    </figure>
  </div>
);

export default CardList;
