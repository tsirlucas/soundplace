import { h } from 'preact';

const Track = ({ track }) => (
  <tr>
    <td>{track.name}</td>
    <td>{track.artist}</td>
    <td>{track.album}</td>
    <td>{track.duration}</td>
  </tr>
);

export default Track;
