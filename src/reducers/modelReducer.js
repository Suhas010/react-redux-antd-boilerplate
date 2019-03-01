import { OrderedMap } from 'immutable';
import objectAssign from 'object-assign';

import {
  DELETE_ALL_INSTANCES,
  DELETE_INSTANCE,
  SAVE_ALL_INSTANCES,
  SAVE_INSTANCE,
} from '../utils/constant';

/** Used to handle model related data in the redux store. */
export default function modelReducer(state = OrderedMap({}), action) {
  switch (action.type.split('/')[0]) {
  case SAVE_INSTANCE: {
    const { instance } = action;
    const storedInstance = state.get(action.key);
    if (storedInstance) {
      instance.props = objectAssign({}, storedInstance.props, instance.props);
    }
    return state.set(action.key, instance);
  }
  case DELETE_INSTANCE:
    return state.delete(action.key);
  case SAVE_ALL_INSTANCES:
    return state.merge(action.instanceMap);
  case DELETE_ALL_INSTANCES: {
    let newState = state;
    action.instances.forEach((instanceKey) => {
      newState = newState.delete(instanceKey);
    });
    return newState;
  }
  default:
    return state;
  }
}
