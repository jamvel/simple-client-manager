import { createStore, compose, applyMiddleware } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import thunk from 'redux-thunk';
import reducer from './app/reducer';

// create a makeStore function
const makeStore = () => createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    typeof window !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f, // eslint-disable-line no-underscore-dangle
  ),
);

// export an assembled wrapper
export default createWrapper(makeStore, { debug: false });
