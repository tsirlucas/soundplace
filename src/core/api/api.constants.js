const getEnvURL = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'soundplace.io';
    case 'staging':
      return 'staging-soundplace.io';
    default:
      return 'https://boiling-plateau-96706.herokuapp.com';
  }
};

export const SERVER_URL = getEnvURL();

// ENDPOINTS
export const SPOTIFY_AUTH = `${SERVER_URL}/auth/spotify`;

export const NETWORK_ERROR = 'NETWORK_ERROR';
export const SESSION_ERROR = 'SESSION_ERROR';
export const PRECONDITION_REQUIRED = 'PRECONDITION_REQUIRED';

export const ERRORS_MAP = {
  0: NETWORK_ERROR,
  401: SESSION_ERROR,
  428: PRECONDITION_REQUIRED
};
