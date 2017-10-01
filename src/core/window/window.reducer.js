import { ON_RESIZE } from './window.constants';

const WindowReducer = (state = {}, action) => {
  switch (action.type) {
    case ON_RESIZE:
      return { height: action.payload.innerHeight, width: action.payload.innerWidth };
    default:
      return state;
  }
};

export default WindowReducer;
