import { createStore, combineReducers, compose } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

// create your reducer
const reducer = (state = {}, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
const reducer2 = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
// create a makeStore function
const makeStore = () => createStore(
  combineReducers({
    reducer,
    reducer2,
  }),
  {},
  compose(
    typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : (f) => f,
  ),
);

// export an assembled wrapper
export default createWrapper(makeStore, { debug: false });
