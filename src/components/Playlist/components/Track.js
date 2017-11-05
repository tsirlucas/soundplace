import { h } from 'preact';

const Track = ({ track, onSave }) => (
  <tr>
    <td>{track.name}</td>
    <td>{track.artist}</td>
    <td>{track.album}</td>
    <td>{track.duration}</td>
    <td onClick={() => onSave(track)}>Save</td>
  </tr>
);

export default Track;
