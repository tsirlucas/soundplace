import { h } from 'preact';

const Track = ({ track }) => (
  <div>
    <span>{track.trackName}</span>
    <span>{track.artist}</span>
  </div>
);

export default Track;
