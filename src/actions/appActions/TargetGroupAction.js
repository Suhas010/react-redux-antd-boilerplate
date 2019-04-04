import RequestHandler from '../../components/helpers/RequestHandler';

// get list of target groups
export function getTargetGroups(filter = '') {
  return RequestHandler.get(`/target_groups${filter}`);
}

// get target group
export function getTargetGroup(id) {
  return RequestHandler.get(`/target_groups/${id}`);
}

// save new target group
export function saveTargetGroup(payload) {
  return RequestHandler.post('/target_groups', payload);
}

// save new target group
export function updateTargetGroup(targetID, payload) {
  return RequestHandler.put(`/target_groups/${targetID}`, payload);
}
