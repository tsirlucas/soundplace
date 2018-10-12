import React from 'react';
import {connect} from 'react-redux';
import {Tracks} from 'components/Tracks';

import {mapDispatchToProps, mapStateToProps} from './Playlist.selectors';

const ConnectedTracks = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tracks);

export const Playlist = ({match}) => (
  <ConnectedTracks entity="playlists" id={match.params.playlistId} />
);
