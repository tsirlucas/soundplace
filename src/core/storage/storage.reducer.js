import { LOAD_STORAGE_STATUS_SUCCESS, GET_CACHED_SONGS_SUCCESS } from './storage.constants';

const initialStorage = { quota: 0, usage: 0, free: 0, songs: 0, cachedSongs: [] };

const StorageReducer = (state = initialStorage, action) => {
  switch (action.type) {
    case LOAD_STORAGE_STATUS_SUCCESS:
      return {
        ...state,
        usage: action.payload.usage,
        quota: action.payload.quota,
        songs: action.payload.usage,
        free: action.payload.quota - action.payload.usage,
        appResources: state.appResources || action.payload.usage
      };
    case GET_CACHED_SONGS_SUCCESS:
      return {
        ...state,
        cachedSongs: action.payload,
        appResources: action.payload.reduce((prev, curr) => {
          return prev - curr.data.sizeValue;
        }, state.usage),
        songs: action.payload.reduce((prev, curr) => {
          return prev + curr.data.sizeValue;
        }, 0)
      };
    default:
      return state;
  }
};

export default StorageReducer;
