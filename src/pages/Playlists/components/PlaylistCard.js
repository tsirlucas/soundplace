import { h } from 'preact';

const PlaylistCard = ({ item }) => (
  <div className="playlist-item" onClick={() => console.log('ola')}>
    <figure>
      <div className="playlist-item-cover">
        <img src={item.cover || 'http://via.placeholder.com/200x200'} alt={item.name}/>
      </div>
      <figcaption>
        <span>{item.name}</span>
      </figcaption>
    </figure>
  </div>
);

export default PlaylistCard;
