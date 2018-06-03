import {h} from 'preact';

import {Track} from 'models';

import parseDuration from '../../../util/parseDuration';
import {Icon} from '../../Icons/Icons';

type Props = {
  track: Track;
  onSave: Function;
  play: Function;
  pause: Function;
  playing: boolean;
};

const Track = ({track, onSave, play, pause, playing}: Props) => (
  <li className="track-item">
    {playing ? (
      <span className="play-button" onClick={() => pause()}>
        <Icon icon="PAUSE_BUTTON" size="32" color="white" />
      </span>
    ) : (
      <span className="play-button" onClick={() => play(track)}>
        <Icon icon="PLAY_BUTTON" size="32" color="white" />
      </span>
    )}
    <h3 className="track-name">{track.name}</h3>
    <p className="artist-info">{`${track.artist.name} - ${track.album.name}`}</p>
    <div className="track-actions">
      <span className="storage-button" onClick={() => onSave(track)}>
        {track.downloading ? (
          <span className="icon-spinner">
            <Icon icon="SYNC" size="17" color="white" />
          </span>
        ) : (
          <Icon icon="STORAGE" size="17" color="white" />
        )}
      </span>
      <span className="track-duration">
        <strong>{parseDuration(track.duration)}</strong>
      </span>
    </div>
  </li>
);

export default Track;
