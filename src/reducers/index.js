import { combineReducers } from 'redux';
import modelReducer from './modelReducer';

const rootReducer = combineReducers({
  models: modelReducer,
});

export default rootReducer;
