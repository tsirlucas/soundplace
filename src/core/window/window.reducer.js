import {ON_RESIZE} from './window.constants';

const WindowReducer = (state = {}, action) => {
  switch (action.type) {
    case ON_RESIZE:
      return {
        height: action.payload.window.innerHeight,
        width: action.payload.window.innerWidth,
        scrollbarWidth: action.payload.scrollbarWidth,
      };
    default:
      return state;
  }
};

export default WindowReducer;
