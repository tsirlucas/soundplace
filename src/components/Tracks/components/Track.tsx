import {h} from 'preact';

import {Icon} from 'components';
import {Track} from 'models';
import {RootState} from 'src/core';

type Props = {
  track: Track;
  status: RootState['tracks']['saved']['any']['status'] | 'NOT-SAVED';
  onSave: Function;
  onDelete: Function;
  play: Function;
  pause: Function;
  playing: boolean;
};

const Track = ({track, onSave, onDelete, play, pause, playing, status}: Props) => (
  <li className="track-item">
    {playing ? (
      <span className="play-button" style="cursor:pointer" onClick={() => pause()}>
        <Icon icon="PAUSE_BUTTON" size="32" color="white" />
      </span>
    ) : (
      <span className="play-button" style="cursor:pointer" onClick={() => play(track)}>
        <Icon icon="PLAY_BUTTON" size="32" color="white" />
      </span>
    )}
    <h3 className="track-name">{track.name}</h3>
    <p className="artist-info">{`${track.channel}`}</p>
    <div className="track-actions">
      <span className="storage-button" style="cursor:pointer">
        <span onClick={() => onDelete(track)}>
          {status === 'DOWNLOADING' && (
            <span className="icon-spinner">
              <Icon icon="SYNC" size="17" color="white" />
            </span>
          )}
          {status === 'DONE' && <Icon icon="UNSTORAGE" size="17" color="white" />}
        </span>
        <span onClick={() => onSave(track)}>
          {status === 'NOT-SAVED' && <Icon icon="STORAGE" size="17" color="white" />}
        </span>
      </span>
    </div>
  </li>
);

export default Track;
