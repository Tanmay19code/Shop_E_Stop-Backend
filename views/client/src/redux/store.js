/* eslint-disable import/no-import-module-exports */
import { applyMiddleware,createStore } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash.throttle';
import rootReducer from './reducers/rootReducer.js'

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const persistedState = loadState();


const store = createStore(rootReducer,persistedState, applyMiddleware(thunk));

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('./reducers/rootReducer', () => {
      store.replaceReducer(rootReducer);
    });
  }
}

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);


export default store;
