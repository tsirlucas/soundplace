import { LOAD_STORAGE_STATUS_SUCCESS, GET_CACHED_SONGS_SUCCESS } from './storage.constants';

// Pure functions that use pure functions are still pure functions (?) :p
import { formatBytes } from '../../util/formatBytes';

const initialStorage = { quota: '0 Bytes', usage: '0 Bytes', free: '0 Bytes', cachedSongs: [] };

const StorageReducer = (state = initialStorage, action) => {
  switch (action.type) {
    case LOAD_STORAGE_STATUS_SUCCESS:
      return {
        ...state,
        appResources: state.appResources || formatBytes(action.payload.usage),
        appResourcesPercent: ((state.appResourcesValue ||
          action.payload.usage) / action.payload.quota) * 100,
        quota: formatBytes(action.payload.quota),
        quotaValue: action.payload.quota,
        usage: formatBytes(action.payload.usage),
        usageValue: action.payload.usage,
        usagePercent: (action.payload.usage / action.payload.quota) * 100,
        free: formatBytes(action.payload.quota - action.payload.usage),
        freeValue: action.payload.quota - action.payload.usage,
        freePercent: ((action.payload.quota - action.payload.usage) / action.payload.quota) * 100
      };
    case GET_CACHED_SONGS_SUCCESS:
      return {
        ...state,
        cachedSongs: action.payload,
        appResources: formatBytes(action.payload.reduce((prev, curr) => {
          return prev - curr.data.sizeValue;
        }, state.usageValue)),
        appResourcesValue: action.payload.reduce((prev, curr) => {
          return prev - curr.data.sizeValue;
        }, state.usageValue),
        appResourcesPercent: (action.payload.reduce((prev, curr) => {
          return prev - curr.data.sizeValue;
        }, state.usageValue) / state.quotaValue) * 100,
        usagePercent: state.usagePercent - ((action.payload.reduce((prev, curr) => {
          return prev - curr.data.sizeValue;
        }, state.usageValue) / state.quotaValue) * 100)
      };
    default:
      return state;
  }
};

export default StorageReducer;
