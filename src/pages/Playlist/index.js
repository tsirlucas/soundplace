import { h } from 'preact';

import Songs from '../../components/Songs';

const PlaylistPage = ({match}) => (
  <Songs entity="playlists" id={match.params.playlistId}/>
);

export default PlaylistPage;
