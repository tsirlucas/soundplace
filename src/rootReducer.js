import appReducer from './reducers';

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
