const getEnvURL = () => {
  switch (process.env.NODE_ENV) {
    // this is temporary
    // case 'production':
    //   return 'https://soundplace.io';
    // case 'staging':
    //   return 'https://staging-soundplace.io';
    default:
      // TODO: Put prod url on the CI
      return 'https://soundplace-api.herokuapp.com/';
  }
};

export const SERVER_URL = getEnvURL();
export const STREAM_SERVER_URL = 'https://youtube-cacheable-audio-stream.herokuapp.com/searchAudioStream/';

// ENDPOINTS
export const SPOTIFY_AUTH = `${SERVER_URL}/auth/spotify`;

export const NETWORK_ERROR = 'NETWORK_ERROR';

export const ON_ONLINE = 'ON_ONLINE';
export const ON_OFFLINE = 'ON_OFFLINE';

export const SESSION_ERROR = 'SESSION_ERROR';
export const NOT_FOUND_ERROR = 'NOT_FOUND_ERROR';
export const PRECONDITION_REQUIRED = 'PRECONDITION_REQUIRED';

export const CLEAR_ERROR = 'CLEAR_ERROR';

export const ERRORS_MAP = {
  0: NETWORK_ERROR,
  401: SESSION_ERROR,
  404: NOT_FOUND_ERROR,
  428: PRECONDITION_REQUIRED
};
