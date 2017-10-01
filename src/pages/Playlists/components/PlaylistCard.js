import { h } from 'preact';

const PlaylistCard = ({ item }) => (
  <div className="playlist-item" onClick={() => console.log('ola')}>
    <figure>
      <div className="playlist-item-cover">
        <img data-src={item.cover || 'http://via.placeholder.com/200x200'} alt={item.name}/>
      </div>
      <div className="playlist-item-title">
        <figcaption>
          <span>{item.name}</span>
        </figcaption>
      </div>
    </figure>
  </div>
);

export default PlaylistCard;
