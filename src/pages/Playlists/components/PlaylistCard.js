import { h } from 'preact';

const PlaylistCard = ({ item }) => (
  <div className="playlist-item" onClick={() => console.log('ola')}>
    <figure>
      <img src="http://via.placeholder.com/200x200" alt="http://via.placeholder.com/200x200"/>
      <figcaption>
        <span>{item.name}</span>
      </figcaption>
    </figure>
  </div>
);

export default PlaylistCard;
