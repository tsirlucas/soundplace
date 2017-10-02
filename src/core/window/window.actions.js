import { ON_RESIZE } from './window.constants';

export const onResize = (event) => ({
  type: ON_RESIZE,
  payload: event.target
});
