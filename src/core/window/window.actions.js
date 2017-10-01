import { WATCH_RESIZE, ON_RESIZE } from './window.constants';

export const watchResize = () => ({
  type: WATCH_RESIZE,
  payload: {}
});

export const onResize = (event) => ({
  type: ON_RESIZE,
  payload: event.target
});
