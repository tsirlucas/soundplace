import { h } from 'preact';

const PlaylistCard = ({ item }) => (
  <div className="playlist-item" onClick={() => console.log('ola')}>
    <figure>
      <img src={item.cover} alt={item.name}/>
      <figcaption>
        <span>{item.name}</span>
      </figcaption>
    </figure>
  </div>
);

export default PlaylistCard;
