import { createStore, compose, applyMiddleware } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import thunk from 'redux-thunk';
import reducer from './app/reducer';

// create a makeStore function
const makeStore = () => createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : (f) => f,
  ),
);

// export an assembled wrapper
export default createWrapper(makeStore, { debug: false });
