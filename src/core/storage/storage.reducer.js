import { LOAD_STORAGE_STATUS_SUCCESS, GET_CACHED_SONGS_SUCCESS } from './storage.constants';

// Pure functions that use pure functions are still pure functions (?) :p
import { formatBytes } from '../../util/formatBytes';

const initialStorage = { quota: '0 Bytes', usage: '0 Bytes', free: '0 Bytes', cachedSongs: [] };

const StorageReducer = (state = initialStorage, action) => {
  switch (action.type) {
    case LOAD_STORAGE_STATUS_SUCCESS:
      return {
        ...state,
        quota: formatBytes(action.payload.quota),
        usage: formatBytes(action.payload.usage),
        free: formatBytes(action.payload.quota - action.payload.usage)
      };
    case GET_CACHED_SONGS_SUCCESS:
      return {
        ...state,
        cachedSongs: action.payload
      };
    default:
      return state;
  }
};

export default StorageReducer;
