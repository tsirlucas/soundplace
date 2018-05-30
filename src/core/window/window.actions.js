import {ON_RESIZE} from './window.constants';

export const onResize = (windowData) => ({
  type: ON_RESIZE,
  payload: windowData,
});
