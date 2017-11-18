import { h } from 'preact';
import Icon from '../../Icons/Icons';

const Track = ({ track, onSave }) => (
  <li className="track-item">
    <span className="play-button">
      <Icon icon='PLAY_BUTTON' size='32' color='white' />
    </span>
    <h3 className="track-name">{track.name}</h3>
    <p className="artist-info">{`${track.artist} - ${track.album}`}</p>
    <div className="track-actions">
      <span className="storage-button" onClick={() => onSave(track)}>
        <Icon icon='STORAGE' size='17' color='white' />
      </span>
      <span className="track-duration"><strong>{track.duration}</strong></span>
    </div>
  </li>
);

export default Track;
