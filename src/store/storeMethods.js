import store from './store';

export function dispatch(action) {
  if (action.type) {
    return store.dispatch(action);
  }
  return store.dispatch(action);
}