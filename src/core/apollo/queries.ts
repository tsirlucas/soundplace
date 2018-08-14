import gql from 'graphql-tag';

export const GET_USER = gql`
  query {
    currentUser {
      name
      image
      importing
    }
  }
`;

export const SUBSCRIBE_USER = gql`
  subscription {
    currentUser {
      item {
        name
        image
        importing
      }
    }
  }
`;

export const GET_PLAYLISTS = gql`
  query {
    currentUserPlaylists {
      id
      name
      cover {
        small
        medium
        big
      }
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
        cover {
          small
          medium
          big
        }
      }
    }
  }
`;

export const GET_TRACKS = gql`
  query Tracks($playlistId: ID!) {
    playlistTracks(playlistId: $playlistId) {
      id
      name
      channel
      cover {
        small
        medium
        big
      }
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
        channel
        cover {
          small
          medium
          big
        }
      }
    }
  }
`;

export const GET_TRACKS_BY_IDS = gql`
  query Tracks($ids: [ID!]) {
    tracks(ids: $ids) {
      id
      name
      channel
      cover {
        small
        medium
        big
      }
    }
  }
`;

export const SUBSCRIBE_TRACKS_BY_IDS = gql`
  subscription Tracks($ids: [ID!]) {
    tracks(ids: $ids) {
      operation
      item {
        id
        name
        channel
        cover {
          small
          medium
          big
        }
      }
    }
  }
`;
