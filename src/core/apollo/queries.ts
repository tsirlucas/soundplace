import gql from 'graphql-tag';

import {Client} from './Client';

export const GET_USER = gql`
  query {
    currentUser {
      name
      image
    }
  }
`;

export const SUBSCRIBE_USER = gql`
  subscription {
    currentUser {
      item {
        name
        image
      }
    }
  }
`;

export const GET_PLAYLISTS = gql`
  query {
    currentUserPlaylists {
      id
      name
      cover
    }
  }
`;

export const SUBSCRIBE_PLAYLISTS = gql`
  subscription {
    currentUserPlaylists {
      operation
      item {
        id
        name
        cover
      }
    }
  }
`;

export const GET_TRACKS = gql`
  query Tracks($playlistId: ID!) {
    playlistTracks(playlistId: $playlistId) {
      id
      name
      cover
      channel
    }
  }
`;

export const SUBSCRIBE_TRACKS = gql`
  subscription Tracks($playlistId: ID!) {
    playlistTracks(playlistId: $playlistId) {
      operation
      item {
        id
        name
        cover
        channel
      }
    }
  }
`;

Client.getInstance().subscribe;
