import {environment} from 'config';

import {actions} from './api.actions';

export const YOUTUBE_AUTH = `${environment.settings.apiUrl}/auth/youtube`;

export const STREAM_SERVER_URL = `${environment.settings.apiUrl}/stream/getAudioStream`;

export const ERRORS_MAP = {
  0: actions.networkError,
  401: actions.sessionError,
  404: actions.notFoundError,
  428: actions.preconditionRequired,
};
