import {environment} from 'config';

import {actions} from './api.actions';

export const SPOTIFY_AUTH = `${environment.settings.apiUrl}/auth/spotify`;

export const STREAM_SERVER_URL = `${environment.settings.apiUrl}/stream/searchAudioStream`;

export const ERRORS_MAP = {
  0: actions.networkError,
  401: actions.sessionError,
  404: actions.notFoundError,
  428: actions.preconditionRequired,
};
